import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useReadingProgress, formatReadingTime } from "@/hooks/useReadingProgress";

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  bookId: string;
  totalPages?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const PDFViewer = ({ 
  pdfUrl, 
  title, 
  bookId, 
  totalPages = 100,
  isOpen, 
  onClose 
}: PDFViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  
  const { 
    progress, 
    updateProgress, 
    startTimeTracking, 
    stopTimeTracking 
  } = useReadingProgress(bookId);

  // Initialize from saved progress
  useEffect(() => {
    if (progress && isOpen) {
      setCurrentPage(progress.current_page);
      setPageInput(String(progress.current_page));
    }
  }, [progress, isOpen]);

  // Start/stop time tracking
  useEffect(() => {
    if (isOpen) {
      startTimeTracking();
    }
    return () => {
      stopTimeTracking();
    };
  }, [isOpen, startTimeTracking, stopTimeTracking]);

  // Save progress on page change (debounced)
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setTimeout(() => {
      updateProgress(currentPage, totalPages);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, totalPages, isOpen, updateProgress]);

  const handleClose = useCallback(async () => {
    await stopTimeTracking();
    await updateProgress(currentPage, totalPages);
    onClose();
  }, [stopTimeTracking, updateProgress, currentPage, totalPages, onClose]);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    setPageInput(String(validPage));
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);
    if (!isNaN(page)) {
      goToPage(page);
    }
  };

  const progressPercent = (currentPage / totalPages) * 100;
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[90vw] max-w-[900px] h-[95vh] flex flex-col p-0">
        {/* Header with progress */}
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg">{title}</DialogTitle>
            {progress && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatReadingTime(progress.time_spent_seconds)}</span>
              </div>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>{progressPercent.toFixed(0)}% complete</span>
              <span>Page {currentPage} of {totalPages}</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </DialogHeader>

        {/* PDF Content */}
        <div className="flex-1 overflow-hidden relative min-h-0">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <iframe
            src={viewerUrl}
            className="w-full h-full border-0"
            title={title}
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Navigation footer */}
        <div className="px-6 py-3 border-t flex items-center justify-between bg-background flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <form onSubmit={handlePageInputSubmit} className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Page</span>
            <Input
              type="number"
              value={pageInput}
              onChange={handlePageInputChange}
              className="w-16 h-8 text-center"
              min={1}
              max={totalPages}
            />
            <span className="text-sm text-muted-foreground">of {totalPages}</span>
          </form>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
