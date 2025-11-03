import { useParams, useNavigate } from "react-router-dom";
import { timelineEvents } from "@/data/chronologyData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = timelineEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Event Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The chronicle you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getEraName = (era: string) => {
    switch (era) {
      case "BGD":
        return "Before the Great Darkening";
      case "GD":
        return "The Great Darkening";
      case "AGD":
        return "After the Great Darkening";
      default:
        return era;
    }
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
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="font-mono">{event.date}</span>
              <Separator orientation="vertical" className="h-4" />
              <Clock className="h-4 w-4" />
              <span>{getEraName(event.era)}</span>
            </div>
            
            <CardTitle className="text-4xl font-heading text-foreground">
              {event.title}
            </CardTitle>
            
            <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4">
              {event.description}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator />
            
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-heading mb-4">Chronicle</h2>
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {event.fullArticle}
              </p>
            </div>

            <Separator />

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Historical Context
              </h3>
              <p className="text-sm text-foreground">
                This event occurred during the era known as {getEraName(event.era)}, 
                a period that shaped the course of world history and left lasting impacts 
                on civilization, magic, and the very fabric of reality itself.
              </p>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline"
                onClick={() => {
                  const currentIndex = timelineEvents.findIndex((e) => e.id === eventId);
                  if (currentIndex > 0) {
                    navigate(`/chronology/${timelineEvents[currentIndex - 1].id}`);
                  }
                }}
                disabled={timelineEvents.findIndex((e) => e.id === eventId) === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Event
              </Button>

              <Button 
                variant="outline"
                onClick={() => {
                  const currentIndex = timelineEvents.findIndex((e) => e.id === eventId);
                  if (currentIndex < timelineEvents.length - 1) {
                    navigate(`/chronology/${timelineEvents[currentIndex + 1].id}`);
                  }
                }}
                disabled={timelineEvents.findIndex((e) => e.id === eventId) === timelineEvents.length - 1}
              >
                Next Event
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDetail;
