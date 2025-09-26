import { useState } from "react";
import { BookDisplay } from "@/components/BookDisplay";
import { BookGallery } from "@/components/BookGallery";
import { CartSidebar, CartItem } from "@/components/CartSidebar";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Index = () => {
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
