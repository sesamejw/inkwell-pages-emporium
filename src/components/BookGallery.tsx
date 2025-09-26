import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import bookCollection from "@/assets/book-collection.jpg";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  category: string;
  cover: string;
}

const sampleBooks: Book[] = [
  {
    id: "2",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 16.99,
    rating: 4.5,
    category: "Romance",
    cover: bookCollection
  },
  {
    id: "3", 
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    rating: 4.8,
    category: "Self-Help",
    cover: bookCollection
  },
  {
    id: "4",
    title: "The Silent Patient",
    author: "Alex Michaelides", 
    price: 15.99,
    rating: 4.1,
    category: "Thriller",
    cover: bookCollection
  },
  {
    id: "5",
    title: "Educated",
    author: "Tara Westover",
    price: 17.99,
    rating: 4.6,
    category: "Memoir",
    cover: bookCollection
  },
  {
    id: "6",
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    price: 19.99,
    rating: 4.3,
    category: "Fantasy",
    cover: bookCollection
  },
  {
    id: "7",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 22.99,
    rating: 4.4,
    category: "History",
    cover: bookCollection
  }
];

interface BookGalleryProps {
  onBookSelect: (book: any) => void;
}

export const BookGallery = ({ onBookSelect }: BookGalleryProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? "fill-accent text-accent" 
            : i < rating 
            ? "fill-accent/50 text-accent" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  const handleBookClick = (book: Book) => {
    // Transform the book data to match the BookDisplay interface
    const transformedBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      description: `A captivating ${book.category.toLowerCase()} that will keep you engaged from start to finish. This highly-rated book has garnered critical acclaim and reader praise alike.`,
      rating: book.rating,
      reviewCount: Math.floor(Math.random() * 2000) + 500,
      category: book.category,
      isbn: `978-${Math.floor(Math.random() * 1000000000)}`,
      publishedDate: "2023-01-01",
      pages: Math.floor(Math.random() * 400) + 200,
      language: "English",
      versions: [
        { type: "ebook" as const, price: book.price - 3, available: true },
        { type: "paperback" as const, price: book.price, available: true },
        { type: "hardcover" as const, price: book.price + 8, available: true }
      ]
    };
    
    onBookSelect(transformedBook);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-playfair font-bold text-primary mb-2">
            More Books You'll Love
          </h2>
          <p className="text-muted-foreground">
            Discover our curated selection of bestsellers and hidden gems
          </p>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 w-max">
            {sampleBooks.map((book) => (
              <Card
                key={book.id}
                className="flex-shrink-0 w-72 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 bg-card"
                onClick={() => handleBookClick(book)}
              >
                <div className="p-6">
                  {/* Book Cover */}
                  <div className="relative mb-4 group">
                    <div 
                      className="w-full h-40 bg-muted bg-cover bg-center book-shadow"
                      style={{ 
                        backgroundImage: `url(${book.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button size="sm" variant="secondary" className="bg-background/90 backdrop-blur">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Quick Add
                      </Button>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {book.category}
                    </Badge>
                    
                    <h3 className="font-playfair font-semibold text-lg leading-tight line-clamp-2">
                      {book.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground">
                      by {book.author}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {renderStars(book.rating)}
                      </div>
                      <span className="text-sm font-medium">{book.rating}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-accent">
                        ${book.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        from ${(book.price - 3).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button variant="outline" className="btn-outline-professional">
            View All Books
          </Button>
        </div>
      </div>
    </section>
  );
};