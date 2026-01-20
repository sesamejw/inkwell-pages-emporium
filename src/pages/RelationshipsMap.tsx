import { DynamicRelationshipMap } from "@/components/DynamicRelationshipMap";
import { AllEventsRelationshipMap } from "@/components/AllEventsRelationshipMap";
import { FamilyTreeMap } from "@/components/FamilyTreeMap";
import { InteractiveWorldMap } from "@/components/InteractiveWorldMap";
import { CharacterComparison } from "@/components/CharacterComparison";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, GitBranch, MapPin, Scale } from "lucide-react";

const RelationshipsMap = () => {
  return (
    <main className="min-h-screen bg-[hsl(var(--parchment-bg))]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-[hsl(var(--parchment-brown))] mb-2">
            Relationships Map
          </h1>
          <p className="text-[hsl(var(--parchment-muted))]">
            Explore the connections between characters and events in the Thouart universe
          </p>
        </div>

        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="mb-6 bg-[hsl(var(--parchment-card))] border border-[hsl(var(--parchment-border))] flex-wrap h-auto">
            <TabsTrigger 
              value="characters" 
              className="data-[state=active]:bg-[hsl(var(--parchment-gold))] data-[state=active]:text-[hsl(var(--parchment-brown))]"
            >
              <Users className="h-4 w-4 mr-2" />
              Character Relationships
            </TabsTrigger>
            <TabsTrigger 
              value="family"
              className="data-[state=active]:bg-[hsl(var(--parchment-gold))] data-[state=active]:text-[hsl(var(--parchment-brown))]"
            >
              <GitBranch className="h-4 w-4 mr-2" />
              Family Tree
            </TabsTrigger>
            <TabsTrigger 
              value="events"
              className="data-[state=active]:bg-[hsl(var(--parchment-gold))] data-[state=active]:text-[hsl(var(--parchment-brown))]"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Event Connections
            </TabsTrigger>
            <TabsTrigger 
              value="world"
              className="data-[state=active]:bg-[hsl(var(--parchment-gold))] data-[state=active]:text-[hsl(var(--parchment-brown))]"
            >
              <MapPin className="h-4 w-4 mr-2" />
              World Map
            </TabsTrigger>
            <TabsTrigger 
              value="compare"
              className="data-[state=active]:bg-[hsl(var(--parchment-gold))] data-[state=active]:text-[hsl(var(--parchment-brown))]"
            >
              <Scale className="h-4 w-4 mr-2" />
              Compare Characters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="characters">
            <DynamicRelationshipMap />
          </TabsContent>

          <TabsContent value="family">
            <FamilyTreeMap />
          </TabsContent>

          <TabsContent value="events">
            <AllEventsRelationshipMap />
          </TabsContent>

          <TabsContent value="world">
            <InteractiveWorldMap />
          </TabsContent>

          <TabsContent value="compare">
            <CharacterComparison />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default RelationshipsMap;
