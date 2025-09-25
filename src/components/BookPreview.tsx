import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
}

interface BookPreviewProps {
  book: Book;
  onClose: () => void;
}

export const BookPreview = ({ book, onClose }: BookPreviewProps) => {
  const flipBookRef = useRef<HTMLDivElement>(null);

  // Sample book pages content
  const pages = [
    {
      content: `<div class="p-8 h-full flex flex-col justify-center">
        <h1 class="text-4xl font-playfair font-bold mb-4">${book.title}</h1>
        <h2 class="text-2xl text-accent mb-8">by ${book.author}</h2>
        <div class="text-center mt-auto">
          <p class="text-sm text-muted-foreground">Chapter One</p>
        </div>
      </div>`
    },
    {
      content: `<div class="p-8 h-full">
        <h2 class="text-2xl font-playfair font-bold mb-6">Chapter 1</h2>
        <p class="mb-4 leading-relaxed">
          Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.
        </p>
        <p class="mb-4 leading-relaxed">
          To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?
        </p>
        <p class="leading-relaxed">
          This is the story of Nora Seed, who finds herself faced with this decision...
        </p>
      </div>`
    },
    {
      content: `<div class="p-8 h-full">
        <p class="mb-4 leading-relaxed">
          The Midnight Library appeared to be a place unstuck from time and space, somewhere between the life she had lived and the lives she could have lived.
        </p>
        <p class="mb-4 leading-relaxed">
          In this ethereal space, Nora discovered that each book represented a different version of her life - a life where she had made different choices, taken different paths.
        </p>
        <p class="leading-relaxed">
          Some books glowed brighter than others, indicating lives where she might have found more satisfaction, more joy, more meaning.
        </p>
      </div>`
    },
    {
      content: `<div class="p-8 h-full">
        <p class="mb-4 leading-relaxed">
          The librarian, Mrs. Elm, appeared just as she had when Nora was in school - kind, understanding, and somehow timeless.
        </p>
        <p class="mb-4 leading-relaxed">
          "Welcome to the Midnight Library, Nora," she said with a warm smile. "Here, you have the opportunity to experience the lives you might have lived."
        </p>
        <p class="leading-relaxed">
          Nora looked around at the endless shelves, each book a doorway to a different existence...
        </p>
      </div>`
    },
  ];

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-full max-h-[80vh] mx-4">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur hover:bg-background"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Book Preview Container */}
        <div className="h-full flex items-center justify-center">
          <div className="relative">
            {/* Flipbook Container */}
            <div 
              ref={flipBookRef}
              className="book-preview-shadow bg-background border"
              style={{
                width: "800px",
                height: "600px",
                perspective: "2000px"
              }}
            >
              {/* Simple page display - in a real implementation, you'd integrate with turn.js or similar */}
              <FlipBookPages pages={pages} />
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <Button variant="secondary" size="sm" id="prev-btn">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button variant="secondary" size="sm" id="next-btn">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Book Info */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur p-4 max-w-sm">
          <h3 className="font-playfair font-bold text-lg">{book.title}</h3>
          <p className="text-muted-foreground">by {book.author}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Interactive preview - Click or use arrow keys to navigate
          </p>
        </div>
      </div>
    </div>
  );
};

// Simple flipbook component - this would be replaced with a proper flipbook library
const FlipBookPages = ({ pages }: { pages: Array<{ content: string }> }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentPage(prev => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentPage(prev => Math.min(pages.length - 1, prev + 1));
      }
    };

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    const handlePrev = () => setCurrentPage(prev => Math.max(0, prev - 1));
    const handleNext = () => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1));

    document.addEventListener("keydown", handleKeyDown);
    prevBtn?.addEventListener("click", handlePrev);
    nextBtn?.addEventListener("click", handleNext);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      prevBtn?.removeEventListener("click", handlePrev);
      nextBtn?.removeEventListener("click", handleNext);
    };
  }, [pages.length]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-background">
      {/* Page Display */}
      <div className="flex h-full">
        {/* Left Page */}
        <div className="w-1/2 h-full border-r">
          {currentPage > 0 && (
            <div
              className="w-full h-full text-sm"
              dangerouslySetInnerHTML={{ 
                __html: pages[currentPage - 1]?.content || "" 
              }}
            />
          )}
        </div>
        
        {/* Right Page */}
        <div className="w-1/2 h-full">
          <div
            className="w-full h-full text-sm"
            dangerouslySetInnerHTML={{ 
              __html: pages[currentPage]?.content || "" 
            }}
          />
        </div>
      </div>
      
      {/* Page indicator */}
      <div className="absolute top-4 right-4 bg-muted/80 backdrop-blur px-2 py-1 text-xs">
        Page {currentPage + 1} of {pages.length}
      </div>
    </div>
  );
};