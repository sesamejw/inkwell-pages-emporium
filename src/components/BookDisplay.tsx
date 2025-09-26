import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  Heart, 
  Share2, 
  Eye,
  ShoppingCart,
  Plus,
  Minus
} from "lucide-react";
import bookCoverDefault from "@/assets/book-cover-default.jpg";
import { Book3D } from "./Book3D";

interface BookVersion {
  type: "ebook" | "paperback" | "hardcover";
  price: number;
  available: boolean;
}

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  reviewCount: number;
  category: string;
  isbn: string;
  publishedDate: string;
  pages: number;
  language: string;
  versions: BookVersion[];
}

const defaultBook: Book = {
  id: "1",
  title: "The Midnight Library",
  author: "Matt Haig",
  description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
  rating: 4.2,
  reviewCount: 1284,
  category: "Fiction",
  isbn: "978-0525559474",
  publishedDate: "2020-08-13",
  pages: 288,
  language: "English",
  versions: [
    { type: "ebook", price: 12.99, available: true },
    { type: "paperback", price: 15.99, available: true },
    { type: "hardcover", price: 24.99, available: true }
  ]
};

interface BookDisplayProps {
  book?: Book & { cover?: string };
  onAddToCart?: (item: any) => void;
}

export const BookDisplay = ({ book = defaultBook, onAddToCart }: BookDisplayProps) => {
  const [selectedVersion, setSelectedVersion] = useState<BookVersion["type"]>("paperback");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const selectedPrice = book.versions.find(v => v.type === selectedVersion)?.price || 0;
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? "fill-accent text-accent" 
            : i < rating 
            ? "fill-accent/50 text-accent" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  const formatVersionName = (type: BookVersion["type"]) => {
    return type === "ebook" ? "E-book" : type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleAddToCart = () => {
    const selectedVersionData = book.versions.find(v => v.type === selectedVersion);
    if (selectedVersionData && onAddToCart) {
      onAddToCart({
        id: book.id,
        title: book.title,
        author: book.author,
        price: selectedVersionData.price,
        quantity: quantity,
        version: selectedVersion,
        cover: book.cover || bookCoverDefault
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-6">
      {/* Book Cover */}
      <div className="flex justify-center lg:justify-end">
        <div className="relative group">
          <img
            src={book.cover || bookCoverDefault}
            alt={book.title}
            className="w-64 h-auto book-shadow transition-book book-hover cursor-pointer"
            onClick={() => setShowPreview(true)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="sm"
              className="bg-background/90 backdrop-blur"
              onClick={() => setShowPreview(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Book Information */}
      <div className="space-y-6">
        {/* Title and Author */}
        <div>
          <Badge variant="secondary" className="mb-2">
            {book.category}
          </Badge>
          <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
            {book.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            by <span className="text-accent font-medium">{book.author}</span>
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {renderStars(book.rating)}
          </div>
          <span className="text-lg font-medium">{book.rating}</span>
          <span className="text-muted-foreground">
            ({book.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {book.description}
          </p>
        </div>

        <Separator />

        {/* Version Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Choose Format</h3>
          <div className="grid grid-cols-3 gap-3">
            {book.versions.map((version) => (
              <Card
                key={version.type}
                className={`p-4 cursor-pointer transition-all hover:border-accent ${
                  selectedVersion === version.type
                    ? "border-accent bg-accent/5"
                    : "border-border"
                } ${!version.available ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => version.available && setSelectedVersion(version.type)}
              >
                <div className="text-center">
                  <p className="font-medium">{formatVersionName(version.type)}</p>
                  <p className="text-lg font-bold text-accent">
                    ${version.price.toFixed(2)}
                  </p>
                  {!version.available && (
                    <p className="text-xs text-destructive mt-1">Out of Stock</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center border">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-2xl font-bold text-accent">
            ${(selectedPrice * quantity).toFixed(2)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            className="flex-1 btn-professional"
            disabled={!book.versions.find(v => v.type === selectedVersion)?.available}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className={isFavorite ? "text-destructive border-destructive" : ""}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          
          <Button variant="outline" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Book Details */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Book Details</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">ISBN:</span>
              <span className="ml-2">{book.isbn}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Pages:</span>
              <span className="ml-2">{book.pages}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Published:</span>
              <span className="ml-2">{new Date(book.publishedDate).getFullYear()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Language:</span>
              <span className="ml-2">{book.language}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Book Preview Modal */}
      {showPreview && (
        <Book3D 
          book={book} 
          onClose={() => setShowPreview(false)} 
        />
      )}
    </div>
  );
};