import { useParams, useNavigate } from "react-router-dom";
import { almanacCategories } from "@/data/chronologyData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AlmanacCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const category = almanacCategories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Category Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The almanac category you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Timeline
        </Button>

        <Card className="border-primary/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-4xl font-heading text-foreground">
              {category.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="bg-muted/50 p-8 rounded-lg text-center">
              <p className="text-muted-foreground">
                Content for {category.title} will be added soon. This section will contain 
                detailed information about the various {category.title.toLowerCase()} that 
                exist in this world.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlmanacCategory;
