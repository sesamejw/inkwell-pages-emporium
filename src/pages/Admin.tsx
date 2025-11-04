import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBooks } from "@/contexts/BooksContext";
import { 
  Upload,
  Trash2,
  Edit,
  BookOpen,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { ChronologyManager } from "@/components/ChronologyManager";

export const Admin = () => {
  const { books, deleteBook } = useBooks();
  const [showAddBook, setShowAddBook] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteBook = (bookId: string) => {
    deleteBook(bookId);
  };

  const getStatusBadge = (status: "active" | "draft" | "discontinued") => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "discontinued":
        return <Badge variant="destructive">Discontinued</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your bookstore inventory and sales
              </p>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-3xl font-bold">{books.length}</p>
                  <p className="text-sm text-muted-foreground">Total Books</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-success" />
                <div>
                  <p className="text-3xl font-bold">$24,567</p>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-3xl font-bold">4,273</p>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-3xl font-bold">1,234</p>
                  <p className="text-sm text-muted-foreground">Customers</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="books" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="books">Book Management</TabsTrigger>
            <TabsTrigger value="chronology">Chronology</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-6">
            {/* Book Management Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-input bg-background px-3 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
              
              <Button 
                className="btn-professional"
                onClick={() => setShowAddBook(true)}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Book
              </Button>
            </div>

            {/* Books Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Book</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Stock</th>
                      <th className="text-left p-4">Sales</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-sm text-muted-foreground">by {book.author}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{book.category}</Badge>
                        </td>
                        <td className="p-4 font-medium">${book.price}</td>
                        <td className="p-4">
                          <span className={book.stock === 0 ? "text-destructive" : ""}>
                            {book.stock}
                          </span>
                        </td>
                        <td className="p-4">{book.sales.toLocaleString()}</td>
                        <td className="p-4">{getStatusBadge(book.status)}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteBook(book.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="chronology" className="space-y-6">
            <ChronologyManager />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Order Management</h3>
              <p className="text-muted-foreground mb-4">
                View and manage customer orders, process shipments, and handle returns.
              </p>
              <Button variant="outline">Coming Soon</Button>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Customer Management</h3>
              <p className="text-muted-foreground mb-4">
                View customer profiles, purchase history, and manage customer relationships.
              </p>
              <Button variant="outline">Coming Soon</Button>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Sales Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Detailed reports on sales performance, customer behavior, and inventory insights.
              </p>
              <Button variant="outline">Coming Soon</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Book Modal */}
      {showAddBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-playfair font-bold">Add New Book</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAddBook(false)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input placeholder="Book title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Author</label>
                    <Input placeholder="Author name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select className="w-full border border-input bg-background px-3 py-2">
                      <option value="">Select category</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-Fiction">Non-Fiction</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Romance">Romance</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Self-Help">Self-Help</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <Input type="number" placeholder="0.00" step="0.01" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stock</label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    placeholder="Book description"
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Cover Image</label>
                  <div className="border-2 border-dashed border-muted-foreground/25 p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowAddBook(false)}>
                    Cancel
                  </Button>
                  <Button className="btn-professional">
                    Add Book
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Admin;