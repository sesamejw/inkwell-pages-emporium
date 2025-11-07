import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PDFViewer = ({ pdfUrl, title, isOpen, onClose }: PDFViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-4 sm:p-6">
        <DialogHeader className="pb-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mx-auto" style={{ width: 'min(45vh, 90vw)' }}>
          <AspectRatio ratio={1 / 2}>
            <div className="relative w-full h-full rounded-md overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                  <Skeleton className="w-full h-full" />
                </div>
              )}
              <iframe
                src={viewerUrl}
                className="absolute inset-0 w-full h-full border-0"
                title={title}
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
};
