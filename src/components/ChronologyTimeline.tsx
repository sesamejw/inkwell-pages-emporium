import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { timelineEvents, almanacCategories } from "@/data/chronologyData";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Castle, Sparkles, Users, Crown, MapPin, Wand2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import worldMap from "@/assets/world-map.jpg";

const iconMap = {
  Castle,
  Sparkles,
  Users,
  Crown,
  MapPin,
  Wand2,
  BookOpen
};

export const ChronologyTimeline = () => {
  const navigate = useNavigate();
  const [activeEra, setActiveEra] = useState<string | null>(null);

  const handleEventClick = (eventId: string) => {
    navigate(`/chronology/${eventId}`);
  };

  const handleAlmanacClick = (categoryId: string) => {
    navigate(`/almanac/${categoryId}`);
  };

  const getEraColor = (era: string) => {
    switch (era) {
      case "BGD":
        return "from-amber-900/20 to-orange-900/20 border-amber-700/50";
      case "GD":
        return "from-purple-900/20 to-indigo-900/20 border-purple-700/50";
      case "AGD":
        return "from-blue-900/20 to-cyan-900/20 border-blue-700/50";
      default:
        return "from-muted to-muted/50 border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner with World Map */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img 
          src={worldMap} 
          alt="World Map of the Realms" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white drop-shadow-2xl">
              Chronology of the Realms
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg font-medium">
              Journey Through the Ages
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Timeline Section */}
          <div className="flex-1 lg:pr-8">
            <div className="mb-6">
              <h2 className="text-3xl font-heading font-bold mb-2 text-foreground">The Chronology</h2>
              <p className="text-sm text-muted-foreground">A complete timeline of world history</p>
            </div>

            <div className="relative pl-8 space-y-6">
              {/* Timeline line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50" />

              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative">
                  {/* Era marker */}
                  {(index === 0 || timelineEvents[index - 1].era !== event.era) && (
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg" />
                  )}

                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <div
                        onClick={() => handleEventClick(event.id)}
                        onMouseEnter={() => setActiveEra(event.era)}
                        onMouseLeave={() => setActiveEra(null)}
                        className={cn(
                          "cursor-pointer transition-all duration-300 p-4 rounded-lg border-l-4",
                          "hover:scale-[1.02] hover:shadow-lg",
                          "bg-gradient-to-r",
                          getEraColor(event.era),
                          activeEra === event.era && "ring-2 ring-primary/50"
                        )}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                          <span className="text-sm font-mono text-muted-foreground bg-background/50 px-2 py-1 rounded">
                            {event.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent 
                      side="right" 
                      className="w-80 bg-popover/95 backdrop-blur-sm border-primary/20 shadow-xl"
                    >
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">{event.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                        <Separator className="my-2" />
                        <p className="text-xs text-muted-foreground italic">
                          Click to read the full chronicle
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </div>
          </div>

          {/* Witnesses Almanac Sidebar */}
          <div className="lg:w-80 lg:border-l lg:border-border lg:pl-8 lg:sticky lg:top-4 lg:self-start">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-bold mb-2 text-foreground">
                Witnesses Almanac
              </h3>
              <p className="text-sm text-muted-foreground">Explore the world's lore</p>
            </div>

            <div className="space-y-2">
              {almanacCategories.map((category) => {
                const Icon = iconMap[category.icon as keyof typeof iconMap];
                return (
                  <button
                    key={category.id}
                    onClick={() => handleAlmanacClick(category.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-4 rounded-lg",
                      "bg-card hover:bg-accent transition-colors duration-200",
                      "border border-border hover:border-primary/50",
                      "text-left group"
                    )}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
