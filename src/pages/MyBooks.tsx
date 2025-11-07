import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@/components/PDFViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Purchase {
  id: string;
  book_id: string;
  book_title: string;
  book_author: string;
  book_cover_url: string | null;
  book_version: string;
  price: number;
  purchased_at: string;
  ebook_pdf_url?: string | null;
}

export const MyBooks = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [selectedPDF, setSelectedPDF] = useState<{url: string, title: string} | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return;

      const { data: purchaseData, error: purchaseError } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", user.id)
        .order("purchased_at", { ascending: false });

      if (!purchaseError && purchaseData) {
        // Fetch book PDF URLs
        const bookIds = [...new Set(purchaseData.map(p => p.book_id))];
        const { data: booksData } = await supabase
          .from("books")
          .select("id, ebook_pdf_url")
          .in("id", bookIds);

        const booksMap = new Map(booksData?.map(b => [b.id, b.ebook_pdf_url]) || []);
        
        const enrichedPurchases = purchaseData.map(p => ({
          ...p,
          ebook_pdf_url: booksMap.get(p.book_id)
        }));

        setPurchases(enrichedPurchases);
      }
      setLoadingPurchases(false);
    };

    if (user) {
      fetchPurchases();
    }
  }, [user]);

  if (loading || loadingPurchases) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading your books...</p>
      </div>
    );
  }

  const ebooks = purchases.filter(p => p.book_version === "ebook");
  const paperbacks = purchases.filter(p => p.book_version === "paperback");
  const hardcovers = purchases.filter(p => p.book_version === "hardcover");

  const renderBookCard = (purchase: Purchase) => {
    const isEbook = purchase.book_version === "ebook" && purchase.ebook_pdf_url;
    
    return (
      <Card 
        key={purchase.id} 
        className={`overflow-hidden hover:shadow-lg transition-shadow ${isEbook ? 'cursor-pointer' : ''}`}
        onClick={() => isEbook && setSelectedPDF({ url: purchase.ebook_pdf_url!, title: purchase.book_title })}
      >
        <div className="aspect-[2/3] relative bg-muted">
          {purchase.book_cover_url ? (
            <img
              src={purchase.book_cover_url}
              alt={purchase.book_title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
          {isEbook && (
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <Button
                variant="secondary"
                size="sm"
                className="bg-background/90 backdrop-blur pointer-events-none"
              >
                <FileText className="h-4 w-4 mr-2" />
                Read Now
              </Button>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2">{purchase.book_title}</CardTitle>
          <CardDescription>{purchase.book_author}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Version: {purchase.book_version}</p>
            <p>Purchased: {new Date(purchase.purchased_at).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold mb-2">My Books</h1>
            <p className="text-muted-foreground">Access all your purchased books</p>
          </div>

          {purchases.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground mb-2">No books purchased yet</p>
                <p className="text-sm text-muted-foreground">
                  Browse our collection and start your reading journey
                </p>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({purchases.length})</TabsTrigger>
                <TabsTrigger value="ebooks">E-books ({ebooks.length})</TabsTrigger>
                <TabsTrigger value="paperback">Paperback ({paperbacks.length})</TabsTrigger>
                <TabsTrigger value="hardcover">Hardcover ({hardcovers.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {purchases.map(renderBookCard)}
                </div>
              </TabsContent>
              
              <TabsContent value="ebooks" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ebooks.length > 0 ? ebooks.map(renderBookCard) : (
                    <p className="text-muted-foreground col-span-3 text-center py-8">No e-books purchased</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="paperback" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paperbacks.length > 0 ? paperbacks.map(renderBookCard) : (
                    <p className="text-muted-foreground col-span-3 text-center py-8">No paperback books purchased</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="hardcover" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hardcovers.length > 0 ? hardcovers.map(renderBookCard) : (
                    <p className="text-muted-foreground col-span-3 text-center py-8">No hardcover books purchased</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      {selectedPDF && (
        <PDFViewer
          pdfUrl={selectedPDF.url}
          title={selectedPDF.title}
          isOpen={true}
          onClose={() => setSelectedPDF(null)}
        />
      )}
    </div>
  );
};