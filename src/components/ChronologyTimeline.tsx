import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { almanacCategories } from "@/data/chronologyData";
import { supabase } from "@/integrations/supabase/client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Castle, Sparkles, Users, Crown, MapPin, Wand2, BookOpen, UserCircle, Clock, Library } from "lucide-react";
import { cn } from "@/lib/utils";
import worldMap from "@/assets/world-map.jpg";

const iconMap = {
  Castle,
  Sparkles,
  Users,
  Crown,
  MapPin,
  Wand2,
  BookOpen,
  UserCircle
};

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  era: string;
  description: string;
}

interface Character {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  era: string;
  role: string;
  affiliation: string;
}

export const ChronologyTimeline = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("timeline");
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetchEvents();
    fetchCharacters();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("chronology_events")
      .select("id, title, date, era, description")
      .order("order_index", { ascending: true });

    if (data) {
      setTimelineEvents(data);
    }
  };

  const fetchCharacters = async () => {
    const { data, error } = await supabase
      .from("lore_characters")
      .select("*")
      .order("order_index", { ascending: true });

    if (data) {
      setCharacters(data);
    }
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/chronology/${eventId}`);
  };

  const handleAlmanacClick = (categoryId: string) => {
    navigate(`/almanac/${categoryId}`);
  };

  const handleCharacterClick = (characterId: string) => {
    navigate(`/almanac/characters`);
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

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Hero":
        return { bg: '#d4edda', color: '#155724' };
      case "Villain":
        return { bg: '#f8d7da', color: '#721c24' };
      case "Deity":
        return { bg: '#e7d8f7', color: '#4a2c6a' };
      default:
        return { bg: '#e2e3e5', color: '#383d41' };
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf6f0' }}>
      {/* Hero Banner with World Map */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img 
          src={worldMap} 
          alt="World Map of the Realms" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#faf6f0]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white drop-shadow-2xl">
              World of the Realms
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg font-medium">
              Discover the Legends, History & Secrets
            </p>
          </div>
        </div>
      </div>

      {/* Tabbed Navigation */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8" style={{ backgroundColor: '#efe9de' }}>
            <TabsTrigger 
              value="timeline" 
              className="flex items-center gap-2 data-[state=active]:bg-[#d4af37] data-[state=active]:text-white"
            >
              <Clock className="w-4 h-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger 
              value="almanac" 
              className="flex items-center gap-2 data-[state=active]:bg-[#d4af37] data-[state=active]:text-white"
            >
              <Library className="w-4 h-4" />
              Almanac
            </TabsTrigger>
            <TabsTrigger 
              value="characters" 
              className="flex items-center gap-2 data-[state=active]:bg-[#d4af37] data-[state=active]:text-white"
            >
              <UserCircle className="w-4 h-4" />
              Characters
            </TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Timeline Section - Centered */}
              <div className="flex-1">
                <div className="relative max-w-5xl mx-auto">
                  {/* Central Timeline line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5" style={{ backgroundColor: '#d4af37' }} />

                  <div className="space-y-24">
                    {timelineEvents.map((event, index) => {
                      const isLeft = index % 2 === 0;
                      const showMarker = index === 0 || timelineEvents[index - 1].era !== event.era;

                      return (
                        <div key={event.id} className="relative min-h-[120px] flex items-center">
                          {/* Era marker on timeline */}
                          {showMarker && (
                            <div 
                              className="absolute left-1/2 -ml-4 w-8 h-8 rounded-full border-4 z-10"
                              style={{ backgroundColor: '#d4af37', borderColor: '#faf6f0' }}
                            />
                          )}

                          <HoverCard openDelay={200}>
                            <HoverCardTrigger asChild>
                              <div
                                onClick={() => handleEventClick(event.id)}
                                className={cn(
                                  "cursor-pointer transition-all duration-300",
                                  "w-[45%]",
                                  isLeft ? "mr-auto pr-8 text-right" : "ml-auto pl-8 text-left"
                                )}
                              >
                                {/* Era label */}
                                {showMarker && (
                                  <p className="text-sm mb-2 font-medium" style={{ color: '#b8860b' }}>
                                    {event.era === 'BGD' ? 'The Age of Beasts' : 
                                     event.era === 'GD' ? 'The Great Darkening' : 
                                     'After Great Darkening'}
                                  </p>
                                )}
                                
                                {/* Event title */}
                                <h3 
                                  className="text-2xl font-heading font-bold mb-2 hover:opacity-80 transition-opacity"
                                  style={{ color: '#3d2817' }}
                                >
                                  {event.title}
                                </h3>
                                
                                {/* Date */}
                                <p className="text-lg font-semibold" style={{ color: '#d4af37' }}>
                                  {event.date}
                                </p>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent 
                              side={isLeft ? "left" : "right"}
                              className="w-96 bg-[#fffef8] border-[#d4af37] shadow-xl"
                            >
                              <div className="space-y-2">
                                <h4 className="font-semibold text-lg" style={{ color: '#3d2817' }}>
                                  {event.title}
                                </h4>
                                <p className="text-sm leading-relaxed" style={{ color: '#5a4a3a' }}>
                                  {event.description}
                                </p>
                                <Separator className="my-2" style={{ backgroundColor: '#d4af37' }} />
                                <p className="text-xs italic" style={{ color: '#8a7a6a' }}>
                                  Click to read the full chronicle
                                </p>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Witnesses Almanac Sidebar */}
              <div className="lg:w-80 lg:border-l lg:pl-8 lg:sticky lg:top-4 lg:self-start" style={{ borderColor: '#d4af37' }}>
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold mb-2" style={{ color: '#3d2817' }}>
                    Witnesses Almanac
                  </h3>
                  <p className="text-sm" style={{ color: '#5a4a3a' }}>Explore the world's lore</p>
                </div>

                <div className="space-y-2">
                  {almanacCategories.map((category) => {
                    const Icon = iconMap[category.icon as keyof typeof iconMap];
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleAlmanacClick(category.id)}
                        className="w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 text-left group border"
                        style={{ 
                          backgroundColor: '#fffef8',
                          borderColor: '#d4af37'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f5ecd0';
                          e.currentTarget.style.borderColor = '#b8860b';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fffef8';
                          e.currentTarget.style.borderColor = '#d4af37';
                        }}
                      >
                        {Icon && <Icon className="w-5 h-5 transition-colors" style={{ color: '#8a7a6a' }} />}
                        <span className="font-medium" style={{ color: '#3d2817' }}>
                          {category.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Almanac Tab */}
          <TabsContent value="almanac" className="mt-0">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold mb-2" style={{ color: '#3d2817' }}>
                  Witnesses Almanac
                </h2>
                <p style={{ color: '#5a4a3a' }}>
                  A comprehensive guide to the lore, creatures, and mysteries of the Realms
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {almanacCategories.map((category) => {
                  const Icon = iconMap[category.icon as keyof typeof iconMap];
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleAlmanacClick(category.id)}
                      className="p-6 rounded-xl border-2 transition-all duration-300 text-center group hover:shadow-xl"
                      style={{ 
                        backgroundColor: '#fffef8',
                        borderColor: '#d4af37'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f5ecd0';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fffef8';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {Icon && (
                        <Icon 
                          className="w-12 h-12 mx-auto mb-4 transition-colors" 
                          style={{ color: '#d4af37' }} 
                        />
                      )}
                      <h3 className="text-xl font-heading font-bold" style={{ color: '#3d2817' }}>
                        {category.title}
                      </h3>
                    </button>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Characters Tab */}
          <TabsContent value="characters" className="mt-0">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold mb-2" style={{ color: '#3d2817' }}>
                  Characters of the Realms
                </h2>
                <p style={{ color: '#5a4a3a' }}>
                  Meet the heroes, villains, and legends who shaped history
                </p>
              </div>

              {characters.length === 0 ? (
                <div 
                  className="text-center py-16 rounded-xl border-2"
                  style={{ backgroundColor: '#fffef8', borderColor: '#d4af37' }}
                >
                  <UserCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#d4af37' }} />
                  <p className="text-lg" style={{ color: '#5a4a3a' }}>
                    No characters have been added yet.
                  </p>
                  <p className="text-sm mt-2" style={{ color: '#8a7a6a' }}>
                    Check back later as the chronicles are being written...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {characters.map((character) => {
                    const badgeColors = getRoleBadgeColor(character.role);
                    return (
                      <div
                        key={character.id}
                        onClick={() => handleCharacterClick(character.id)}
                        className="rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl group"
                        style={{ 
                          backgroundColor: '#fffef8',
                          borderColor: '#d4af37'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {character.image_url ? (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={character.image_url}
                              alt={character.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div 
                            className="h-48 flex items-center justify-center"
                            style={{ backgroundColor: '#efe9de' }}
                          >
                            <UserCircle className="w-20 h-20" style={{ color: '#d4af37' }} />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-xl font-heading font-bold" style={{ color: '#3d2817' }}>
                              {character.name}
                            </h3>
                            {character.role && (
                              <span 
                                className="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                                style={{ backgroundColor: badgeColors.bg, color: badgeColors.color }}
                              >
                                {character.role}
                              </span>
                            )}
                          </div>
                          {character.era && (
                            <p className="text-xs font-medium mb-2" style={{ color: '#b8860b' }}>
                              {character.era === 'BGD' ? 'Before Great Darkening' : 
                               character.era === 'GD' ? 'The Great Darkening' : 
                               'After Great Darkening'}
                            </p>
                          )}
                          {character.affiliation && (
                            <p className="text-sm mb-2" style={{ color: '#8a7a6a' }}>
                              {character.affiliation}
                            </p>
                          )}
                          <p className="text-sm line-clamp-3" style={{ color: '#5a4a3a' }}>
                            {character.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
