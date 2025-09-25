import { useState } from "react";
import { BookDisplay } from "@/components/BookDisplay";
import { BookGallery } from "@/components/BookGallery";

const Index = () => {
  const [selectedBook, setSelectedBook] = useState<any>(undefined);

  return (
    <div className="min-h-screen bg-background">
      {/* Featured Book Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <BookDisplay book={selectedBook} />
        </div>
      </section>

      {/* Book Gallery Section */}
      <BookGallery onBookSelect={setSelectedBook} />
    </div>
  );
};

export default Index;
