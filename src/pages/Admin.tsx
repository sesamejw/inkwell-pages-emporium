import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBooks } from "@/contexts/BooksContext";
import {
  BookOpen,
  DollarSign,
  Users,
  TrendingUp
} from "lucide-react";
import { ChronologyManager } from "@/components/ChronologyManager";
import { BookManager } from "@/components/admin/BookManager";
import { AlmanacManager } from "@/components/admin/AlmanacManager";

export const Admin = () => {
  const { books } = useBooks();

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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="books">Book Management</TabsTrigger>
            <TabsTrigger value="chronology">Chronology</TabsTrigger>
            <TabsTrigger value="almanac">Almanac</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-6">
            <BookManager />
          </TabsContent>

          <TabsContent value="almanac" className="space-y-6">
            <AlmanacManager />
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
    </div>
  );
};

export default Admin;