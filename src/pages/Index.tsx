import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookDisplay } from "@/components/BookDisplay";
import { BookGallery } from "@/components/BookGallery";
import { CartSidebar, CartItem } from "@/components/CartSidebar";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import authorPhoto from "@/assets/author-photo.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<any>(undefined);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        cartItem => cartItem.id === item.id && cartItem.version === item.version
      );
      
      if (existingItemIndex >= 0) {
        const updated = [...prev];
        updated[existingItemIndex].quantity += item.quantity;
        return updated;
      } else {
        return [...prev, { ...item, id: `${item.id}-${item.version}` }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Chronology Button - Left Side */}
      <div className="fixed top-24 left-4 z-50">
        <Button 
          onClick={() => navigate('/chronology')}
          variant="default"
          className="bg-primary/90 backdrop-blur hover:bg-primary shadow-lg px-6 py-3 h-auto text-base font-semibold"
        >
          Explore the Realms
        </Button>
      </div>

      {/* Header with Cart Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          size="icon"
          className="bg-background/80 backdrop-blur"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Featured Book Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <BookDisplay book={selectedBook} onAddToCart={handleAddToCart} />
        </div>
      </section>

      {/* Book Gallery Section */}
      <BookGallery onBookSelect={setSelectedBook} />

      {/* About Author Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center mb-12">About the Author</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-heading font-semibold mb-4">Jane Mitchell</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Jane Mitchell is an acclaimed author with over a decade of experience crafting compelling narratives 
                  that captivate readers worldwide. Her unique storytelling approach blends literary excellence with 
                  profound emotional depth.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  With numerous bestsellers and literary awards to her name, Jane continues to push the boundaries 
                  of contemporary fiction, exploring themes of identity, connection, and the human experience.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When she's not writing, Jane enjoys reading in her personal library, traveling to gather inspiration, 
                  and engaging with her passionate community of readers.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src={authorPhoto} 
                  alt="Jane Mitchell - Author" 
                  className="w-full rounded-lg shadow-lg object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Index;
