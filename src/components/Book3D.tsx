import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Import page images
import page1 from "@/assets/page-1.jpg";
import page2 from "@/assets/page-2.jpg";
import page3 from "@/assets/page-3.jpg";
import page4 from "@/assets/page-4.jpg";
import page5 from "@/assets/page-5.jpg";
import page6 from "@/assets/page-6.jpg";

interface Book3DProps {
  book: {
    id: string;
    title: string;
    author: string;
  };
  onClose: () => void;
}

const pageImages = [page1, page2, page3, page4, page5, page6];

export const Book3D = ({ book, onClose }: Book3DProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [previewPDF, setPreviewPDF] = useState<string | null>(null);
  const totalPages = pageImages.length;

  useEffect(() => {
    const fetchPreviewPDF = async () => {
      const { data } = await supabase
        .from("books")
        .select("preview_pdf_url")
        .eq("id", book.id)
        .maybeSingle();
      
      if (data?.preview_pdf_url) {
        setPreviewPDF(data.preview_pdf_url);
      }
    };

    fetchPreviewPDF();
  }, [book.id]);

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Handle arrow keys
    const handleArrows = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleArrows);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleArrows);
      document.body.style.overflow = "unset";
    };
  }, [onClose, currentPage, totalPages]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 z-10 bg-background/80 backdrop-blur hover:bg-background text-foreground"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Vertical Page Slider */}
      <div className="w-full max-w-2xl h-full flex flex-col items-center justify-center p-8">
        {/* Book Header */}
        <div className="text-center mb-6 bg-background/80 backdrop-blur p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-primary">{book.title}</h3>
          <p className="text-muted-foreground">by {book.author}</p>
        </div>

        {/* Page Display */}
        <div className="relative w-full max-w-lg flex-1 flex items-center justify-center">
          {previewPDF ? (
            <div className="w-full h-[600px] bg-background rounded-lg shadow-2xl overflow-hidden">
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(previewPDF)}&embedded=true`}
                className="w-full h-full border-0"
                title={`${book.title} Preview`}
              />
            </div>
          ) : (
            <div className="w-full h-[600px] bg-background rounded-lg shadow-2xl overflow-hidden">
              <img
                src={pageImages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Navigation Controls - Only show for image preview */}
        {!previewPDF && (
          <div className="flex items-center space-x-4 bg-background/80 backdrop-blur px-6 py-3 rounded-lg mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <span className="text-sm font-medium px-4">
              Page {currentPage + 1} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Instructions */}
        <p className="text-xs text-muted-foreground mt-4 text-center">
          {previewPDF ? "Scroll to view pages • " : "Use arrow keys or buttons to navigate • "}Press ESC to close
        </p>
      </div>
    </div>
  );
};