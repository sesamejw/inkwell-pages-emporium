import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock,
  ThumbsUp,
  MessageCircle,
  Plus,
  Search,
  Filter
} from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  replies: number;
  likes: number;
  isSticky?: boolean;
}

const samplePosts: ForumPost[] = [
  {
    id: "1",
    title: "What are your thoughts on 'The Midnight Library'?",
    content: "Just finished reading this amazing book and I'm blown away by the concept. The idea of exploring different life paths through a magical library is so intriguing...",
    author: "BookLover23",
    category: "Book Discussion",
    createdAt: "2024-01-15",
    replies: 42,
    likes: 156,
    isSticky: true
  },
  {
    id: "2", 
    title: "Looking for similar books to Atomic Habits",
    content: "I recently read Atomic Habits and found it incredibly helpful. Can anyone recommend similar books about productivity and habit formation?",
    author: "ProductivityGuru",
    category: "Recommendations",
    createdAt: "2024-01-14",
    replies: 23,
    likes: 89
  },
  {
    id: "3",
    title: "Monthly Reading Challenge - January 2024",
    content: "Welcome to our January reading challenge! This month's theme is 'New Beginnings'. Share what books you're planning to read...",
    author: "Moderator",
    category: "Challenges",
    createdAt: "2024-01-01",
    replies: 78,
    likes: 234,
    isSticky: true
  },
  {
    id: "4",
    title: "Best mystery novels of 2023?",
    content: "I'm looking to catch up on some great mystery novels from last year. What were your favorites?",
    author: "MysteryFan",
    category: "Recommendations",
    createdAt: "2024-01-13",
    replies: 31,
    likes: 67
  }
];

const categories = [
  "All",
  "Book Discussion", 
  "Recommendations",
  "Challenges",
  "Author Spotlight",
  "Reading Tips",
  "General"
];

export const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);

  const filteredPosts = samplePosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
                Community Forum
              </h1>
              <p className="text-muted-foreground">
                Connect with fellow book lovers and share your reading experiences
              </p>
            </div>
            <Button 
              className="btn-professional"
              onClick={() => setShowNewPost(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              New Discussion
            </Button>
          </div>

          {/* Forum Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">2,847</p>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-muted-foreground">Members</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Active Today</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-muted-foreground">New This Week</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Search */}
            <Card className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </Card>

            {/* Categories */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted/50 ${
                      selectedCategory === category
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Card>

            {/* Forum Rules */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Forum Guidelines</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Be respectful and kind to all members</li>
                <li>• No spoilers without proper warnings</li>
                <li>• Stay on topic in discussions</li>
                <li>• Use appropriate categories for posts</li>
                <li>• No spam or self-promotion</li>
              </ul>
            </Card>
          </div>

          {/* Posts List */}
          <div className="lg:w-3/4 space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-accent">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      {post.isSticky && (
                        <Badge variant="secondary" className="text-xs">
                          Pinned
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 hover:text-accent cursor-pointer">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span>by {post.author}</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-playfair font-bold">Start New Discussion</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowNewPost(false)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input placeholder="What would you like to discuss?" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full border border-input bg-background px-3 py-2">
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <Textarea
                    placeholder="Share your thoughts, ask questions, or start a discussion..."
                    rows={8}
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                  <Button className="btn-professional">
                    Post Discussion
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

export default Forum;