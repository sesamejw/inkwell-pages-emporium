import { useState, useEffect, useCallback, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  BookOpen,
  List,
  X,
  RotateCw,
} from "lucide-react";
import { useReadingProgress, formatReadingTime } from "@/hooks/useReadingProgress";
import { cn } from "@/lib/utils";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface EbookReaderProps {
  pdfUrl: string;
  title: string;
  bookId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EbookReader = ({
  pdfUrl,
  title,
  bookId,
  isOpen,
  onClose,
}: EbookReaderProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const {
    progress,
    updateProgress,
    startTimeTracking,
    stopTimeTracking,
  } = useReadingProgress(bookId);

  // Initialize from saved progress
  useEffect(() => {
    if (progress && isOpen && numPages > 0) {
      const savedPage = Math.min(progress.current_page, numPages);
      setCurrentPage(savedPage);
      setPageInput(String(savedPage));
    }
  }, [progress, isOpen, numPages]);

  // Start/stop time tracking
  useEffect(() => {
    if (isOpen) {
      startTimeTracking();
    }
    return () => {
      stopTimeTracking();
    };
  }, [isOpen, startTimeTracking, stopTimeTracking]);

  // Save progress on page change
  useEffect(() => {
    if (!isOpen || numPages === 0) return;

    const timer = setTimeout(() => {
      updateProgress(currentPage, numPages);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, numPages, isOpen, updateProgress]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          goToPage(currentPage - 1);
          break;
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          e.preventDefault();
          goToPage(currentPage + 1);
          break;
        case "Home":
          e.preventDefault();
          goToPage(1);
          break;
        case "End":
          e.preventDefault();
          goToPage(numPages);
          break;
        case "+":
        case "=":
          e.preventDefault();
          handleZoom(Math.min(scale + 0.25, 3));
          break;
        case "-":
          e.preventDefault();
          handleZoom(Math.max(scale - 0.25, 0.5));
          break;
        case "Escape":
          if (isFullscreen) {
            toggleFullscreen();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPage, numPages, scale, isFullscreen]);

  const handleClose = useCallback(async () => {
    await stopTimeTracking();
    if (numPages > 0) {
      await updateProgress(currentPage, numPages);
    }
    onClose();
  }, [stopTimeTracking, updateProgress, currentPage, numPages, onClose]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    setError("Failed to load the PDF. Please try again.");
    setIsLoading(false);
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, numPages));
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

  const handleZoom = (newScale: number) => {
    setScale(Math.max(0.5, Math.min(3, newScale)));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const progressPercent = numPages > 0 ? (currentPage / numPages) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        ref={containerRef}
        className={cn(
          "flex flex-col p-0 gap-0 bg-background",
          isFullscreen
            ? "w-screen h-screen max-w-none max-h-none rounded-none"
            : "w-[95vw] max-w-[1200px] h-[95vh]"
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b bg-card shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="hidden md:flex"
            >
              <List className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="font-semibold text-sm md:text-base line-clamp-1">{title}</h2>
              {progress && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatReadingTime(progress.time_spent_seconds)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <div className="hidden md:flex items-center gap-1 border rounded-md px-2 py-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => handleZoom(scale - 0.25)}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => handleZoom(scale + 0.25)}
                disabled={scale >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="hidden md:flex"
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Progress bar */}
        <div className="px-4 py-2 border-b bg-muted/30 shrink-0">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{progressPercent.toFixed(0)}% complete</span>
            <span>
              Page {currentPage} of {numPages || "..."}
            </span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>

        {/* Main content area */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Thumbnails sidebar */}
          {showThumbnails && (
            <aside className="w-32 border-r bg-muted/20 shrink-0 hidden md:block">
              <ScrollArea className="h-full">
                <div className="p-2 space-y-2">
                  {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={cn(
                        "w-full aspect-[3/4] border-2 rounded overflow-hidden transition-all",
                        currentPage === pageNum
                          ? "border-accent ring-2 ring-accent/20"
                          : "border-border hover:border-accent/50"
                      )}
                    >
                      <Document file={pdfUrl} loading={null}>
                        <Page
                          pageNumber={pageNum}
                          width={100}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </aside>
          )}

          {/* PDF viewer */}
          <main className="flex-1 overflow-auto bg-muted/10" ref={pageRef}>
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <RotateCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Loading book...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-destructive">{error}</p>
                  <Button onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-center p-4 min-h-full">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                className="max-w-full"
              >
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  className="shadow-lg"
                  loading={
                    <Skeleton className="w-[600px] h-[800px]" />
                  }
                />
              </Document>
            </div>
          </main>
        </div>

        {/* Footer navigation */}
        <footer className="flex items-center justify-between px-4 py-3 border-t bg-card shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center gap-2">
            {/* Mobile zoom */}
            <div className="flex md:hidden items-center gap-2">
              <Slider
                value={[scale]}
                onValueChange={([val]) => handleZoom(val)}
                min={0.5}
                max={2}
                step={0.1}
                className="w-20"
              />
            </div>

            <form onSubmit={handlePageInputSubmit} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">Page</span>
              <Input
                type="number"
                value={pageInput}
                onChange={handlePageInputChange}
                className="w-14 h-8 text-center text-sm"
                min={1}
                max={numPages}
              />
              <span className="text-sm text-muted-foreground">/ {numPages || "..."}</span>
            </form>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= numPages}
            className="gap-1"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
};
