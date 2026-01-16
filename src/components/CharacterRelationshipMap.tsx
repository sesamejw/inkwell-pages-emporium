import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Character {
  id: string;
  name: string;
  role?: string;
  affiliation?: string;
  image_url?: string;
}

interface Relationship {
  id: string;
  source_character_id: string;
  target_character_id: string;
  relationship_type: string;
  description?: string;
}

interface NodePosition {
  x: number;
  y: number;
}

const relationshipColors: Record<string, string> = {
  ally: "hsl(142, 76%, 36%)",
  enemy: "hsl(0, 84%, 60%)",
  family: "hsl(262, 83%, 58%)",
  mentor: "hsl(45, 93%, 47%)",
  student: "hsl(199, 89%, 48%)",
  rival: "hsl(25, 95%, 53%)",
  friend: "hsl(173, 80%, 40%)",
  default: "hsl(var(--muted-foreground))",
};

export const CharacterRelationshipMap = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch characters from almanac_characters
    const { data: charactersData } = await supabase
      .from("almanac_characters" as any)
      .select("id, name, role, affiliation, image_url")
      .order("order_index", { ascending: true });

    // Fetch relationships
    const { data: relationshipsData } = await supabase
      .from("character_relationships" as any)
      .select("*");

    if (charactersData) {
      setCharacters(charactersData as unknown as Character[]);
    }
    if (relationshipsData) {
      setRelationships(relationshipsData as unknown as Relationship[]);
    }
    
    setLoading(false);
  };

  // Calculate node positions in a circular layout
  const nodePositions = useMemo(() => {
    const positions: Record<string, NodePosition> = {};
    const centerX = 400;
    const centerY = 300;
    const radius = 220;

    characters.forEach((char, index) => {
      const angle = (2 * Math.PI * index) / characters.length - Math.PI / 2;
      positions[char.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    return positions;
  }, [characters]);

  // Get relationships for selected character
  const filteredRelationships = useMemo(() => {
    if (!selectedCharacter) return relationships;
    return relationships.filter(
      (r) => r.source_character_id === selectedCharacter || r.target_character_id === selectedCharacter
    );
  }, [relationships, selectedCharacter]);

  // Get connected characters
  const connectedCharacters = useMemo(() => {
    if (!selectedCharacter) return new Set(characters.map((c) => c.id));
    const connected = new Set<string>([selectedCharacter]);
    filteredRelationships.forEach((r) => {
      connected.add(r.source_character_id);
      connected.add(r.target_character_id);
    });
    return connected;
  }, [filteredRelationships, selectedCharacter, characters]);

  const handleCharacterClick = (characterId: string) => {
    if (selectedCharacter === characterId) {
      setSelectedCharacter(null);
    } else {
      setSelectedCharacter(characterId);
    }
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedCharacter(null);
  };

  const getRelationshipColor = (type: string) => {
    return relationshipColors[type.toLowerCase()] || relationshipColors.default;
  };

  if (loading) {
    return (
      <Card className="bg-[hsl(var(--parchment-card))] border-[hsl(var(--parchment-border))]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[hsl(var(--parchment-brown))]">
            <Users className="h-5 w-5" />
            Character Relationships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[500px]" />
        </CardContent>
      </Card>
    );
  }

  if (characters.length === 0) {
    return (
      <Card className="bg-[hsl(var(--parchment-card))] border-[hsl(var(--parchment-border))]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[hsl(var(--parchment-brown))]">
            <Users className="h-5 w-5" />
            Character Relationships
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Users className="h-16 w-16 mx-auto mb-4 text-[hsl(var(--parchment-muted))]" />
          <p className="text-[hsl(var(--parchment-muted))]">
            No characters found. Add characters to the almanac to see the relationship map.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[hsl(var(--parchment-card))] border-[hsl(var(--parchment-border))]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-[hsl(var(--parchment-brown))]">
          <Users className="h-5 w-5" />
          Character Relationships
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(relationshipColors).filter(([key]) => key !== 'default').map(([type, color]) => (
            <Badge
              key={type}
              variant="outline"
              className="capitalize"
              style={{ borderColor: color, color: color }}
            >
              {type}
            </Badge>
          ))}
        </div>

        {/* SVG Graph */}
        <div className="relative overflow-hidden rounded-lg bg-[hsl(var(--parchment-bg))] border border-[hsl(var(--parchment-border))]">
          <svg
            width="100%"
            height="600"
            viewBox="0 0 800 600"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: "center center",
            }}
          >
            {/* Relationship lines */}
            {filteredRelationships.map((rel) => {
              const source = nodePositions[rel.source_character_id];
              const target = nodePositions[rel.target_character_id];
              if (!source || !target) return null;

              return (
                <g key={rel.id}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={getRelationshipColor(rel.relationship_type)}
                    strokeWidth={selectedCharacter ? 3 : 2}
                    strokeOpacity={selectedCharacter ? 0.8 : 0.5}
                    markerEnd="url(#arrowhead)"
                  />
                  {/* Relationship label */}
                  <text
                    x={(source.x + target.x) / 2}
                    y={(source.y + target.y) / 2}
                    fill={getRelationshipColor(rel.relationship_type)}
                    fontSize="10"
                    textAnchor="middle"
                    dy="-5"
                    className="capitalize pointer-events-none"
                  >
                    {rel.relationship_type}
                  </text>
                </g>
              );
            })}

            {/* Character nodes */}
            {characters.map((char) => {
              const pos = nodePositions[char.id];
              if (!pos) return null;
              const isConnected = connectedCharacters.has(char.id);
              const isSelected = selectedCharacter === char.id;

              return (
                <g
                  key={char.id}
                  onClick={() => handleCharacterClick(char.id)}
                  className="cursor-pointer"
                  opacity={isConnected ? 1 : 0.3}
                >
                  {/* Node circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 35 : 30}
                    fill={isSelected ? "hsl(var(--parchment-gold))" : "hsl(var(--parchment-card))"}
                    stroke={isSelected ? "hsl(var(--parchment-brown))" : "hsl(var(--parchment-border))"}
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-all duration-200"
                  />
                  {/* Character image or initial */}
                  {char.image_url ? (
                    <clipPath id={`clip-${char.id}`}>
                      <circle cx={pos.x} cy={pos.y} r={isSelected ? 32 : 27} />
                    </clipPath>
                  ) : (
                    <text
                      x={pos.x}
                      y={pos.y}
                      fill="hsl(var(--parchment-brown))"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {char.name.charAt(0)}
                    </text>
                  )}
                  {/* Character name */}
                  <text
                    x={pos.x}
                    y={pos.y + 45}
                    fill="hsl(var(--parchment-brown))"
                    fontSize="12"
                    fontWeight={isSelected ? "bold" : "normal"}
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {char.name.length > 15 ? char.name.slice(0, 15) + "..." : char.name}
                  </text>
                </g>
              );
            })}

            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="hsl(var(--parchment-muted))"
                />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Selected character info */}
        {selectedCharacter && (
          <div className="mt-4 p-4 rounded-lg bg-[hsl(var(--parchment-bg))] border border-[hsl(var(--parchment-border))]">
            {(() => {
              const char = characters.find((c) => c.id === selectedCharacter);
              if (!char) return null;
              const charRelationships = relationships.filter(
                (r) => r.source_character_id === char.id || r.target_character_id === char.id
              );
              return (
                <div>
                  <h4 className="font-heading font-bold text-lg text-[hsl(var(--parchment-brown))]">
                    {char.name}
                  </h4>
                  {char.role && (
                    <Badge variant="outline" className="mt-1">
                      {char.role}
                    </Badge>
                  )}
                  <p className="text-sm text-[hsl(var(--parchment-muted))] mt-2">
                    {charRelationships.length} relationship{charRelationships.length !== 1 ? "s" : ""}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto mt-2"
                    onClick={() => navigate("/almanac/characters")}
                  >
                    View in Almanac →
                  </Button>
                </div>
              );
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
