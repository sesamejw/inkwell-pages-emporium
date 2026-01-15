import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { almanacCategories } from "@/data/chronologyData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageGallery } from "@/components/ImageGallery";

interface AlmanacEntry {
  id: string;
  name: string;
  slug: string;
  description: string;
  article: string;
  image_url: string | null;
  // Character-specific fields
  role?: string;
  affiliation?: string;
  era?: string;
  species?: string;
  abilities?: string;
  relationships?: string;
}

interface GalleryImage {
  id: string;
  image_url: string;
  caption?: string;
}

const categoryTableMap: Record<string, string> = {
  kingdoms: "almanac_kingdoms",
  relics: "almanac_relics",
  races: "almanac_races",
  titles: "almanac_titles",
  locations: "almanac_locations",
  magic: "almanac_magic",
  concepts: "almanac_concepts",
  characters: "almanac_characters",
};

const AlmanacCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<AlmanacEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<AlmanacEntry | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const category = almanacCategories.find((c) => c.id === categoryId);
  const tableName = categoryId ? categoryTableMap[categoryId] : null;
  const isCharacterCategory = categoryId === "characters";

  useEffect(() => {
    if (tableName) {
      fetchEntries();
    }
  }, [tableName]);

  useEffect(() => {
    if (selectedEntry && isCharacterCategory) {
      fetchGalleryImages(selectedEntry.id);
    } else {
      setGalleryImages([]);
    }
  }, [selectedEntry, isCharacterCategory]);

  const fetchEntries = async () => {
    if (!tableName) return;

    const { data, error } = await supabase
      .from(tableName as any)
      .select("*")
      .order("order_index", { ascending: true });

    if (!error && data) {
      setEntries(data as any);
    }
    setLoading(false);
  };

  const fetchGalleryImages = async (characterId: string) => {
    const { data, error } = await supabase
      .from("almanac_character_images" as any)
      .select("id, image_url, caption")
      .eq("character_id", characterId)
      .order("order_index", { ascending: true });

    if (!error && data) {
      setGalleryImages(data as unknown as GalleryImage[]);
    }
  };

  if (!category || !tableName) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#e8dcc8' }}>
        <div className="container mx-auto px-4 py-8 max-w-4xl flex items-center justify-center min-h-screen">
          <Card style={{ backgroundColor: '#f5f0e8', borderColor: '#d4a574' }}>
            <CardHeader>
              <CardTitle style={{ color: '#2c1810' }}>Category Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4" style={{ color: '#5a4a3a' }}>
                The almanac category you're looking for doesn't exist.
              </p>
              <Button onClick={() => navigate("/chronology")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Chronology
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedEntry) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#e8dcc8' }}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => setSelectedEntry(null)}
            className="mb-6"
            style={{ color: '#2c1810' }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {category.title}
          </Button>

          <Card style={{ backgroundColor: '#f5f0e8', borderColor: '#d4a574' }} className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-4xl font-heading" style={{ color: '#2c1810' }}>
                {selectedEntry.name}
              </CardTitle>
              <CardDescription style={{ color: '#8a7a6a' }}>
                {selectedEntry.description}
              </CardDescription>
              
              {/* Character-specific metadata */}
              {isCharacterCategory && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedEntry.role && (
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#d4a574', color: '#2c1810' }}>
                      {selectedEntry.role}
                    </span>
                  )}
                  {selectedEntry.affiliation && (
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#e8dcc8', color: '#2c1810' }}>
                      {selectedEntry.affiliation}
                    </span>
                  )}
                  {selectedEntry.era && (
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#c9a57a', color: '#fff' }}>
                      {selectedEntry.era}
                    </span>
                  )}
                  {selectedEntry.species && (
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#8a7a6a', color: '#fff' }}>
                      {selectedEntry.species}
                    </span>
                  )}
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Image Gallery for Characters, Single Image for Others */}
              {isCharacterCategory ? (
                <ImageGallery 
                  images={galleryImages} 
                  mainImage={selectedEntry.image_url}
                  altText={selectedEntry.name}
                />
              ) : selectedEntry.image_url ? (
                <div className="w-full">
                  <img
                    src={selectedEntry.image_url}
                    alt={selectedEntry.name}
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
              ) : null}

              <Separator style={{ backgroundColor: '#d4a574' }} />

              <div className="prose max-w-none">
                <p className="leading-relaxed whitespace-pre-line" style={{ color: '#2c1810' }}>
                  {selectedEntry.article}
                </p>
              </div>

              {/* Character-specific sections */}
              {isCharacterCategory && (
                <>
                  {selectedEntry.abilities && (
                    <>
                      <Separator style={{ backgroundColor: '#d4a574' }} />
                      <div>
                        <h3 className="text-xl font-heading font-semibold mb-3" style={{ color: '#2c1810' }}>
                          Abilities
                        </h3>
                        <p className="whitespace-pre-line" style={{ color: '#5a4a3a' }}>
                          {selectedEntry.abilities}
                        </p>
                      </div>
                    </>
                  )}

                  {selectedEntry.relationships && (
                    <>
                      <Separator style={{ backgroundColor: '#d4a574' }} />
                      <div>
                        <h3 className="text-xl font-heading font-semibold mb-3" style={{ color: '#2c1810' }}>
                          Relationships
                        </h3>
                        <p className="whitespace-pre-line" style={{ color: '#5a4a3a' }}>
                          {selectedEntry.relationships}
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8dcc8' }}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/chronology")}
          className="mb-6"
          style={{ color: '#2c1810' }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chronology
        </Button>

        <Card style={{ backgroundColor: '#f5f0e8', borderColor: '#d4a574' }} className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-4xl font-heading" style={{ color: '#2c1810' }}>
              {category.title}
            </CardTitle>
            <CardDescription style={{ color: '#8a7a6a' }}>
              Explore the {category.title.toLowerCase()} of the Realms
            </CardDescription>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <p style={{ color: '#5a4a3a' }}>Loading entries...</p>
          </div>
        ) : entries.length === 0 ? (
          <Card style={{ backgroundColor: '#f5f0e8', borderColor: '#d4a574' }}>
            <CardContent className="p-12 text-center">
              <p style={{ color: '#5a4a3a' }}>
                No entries yet for {category.title}. Check back later!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <Card
                key={entry.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-xl"
                style={{ backgroundColor: '#f5f0e8', borderColor: '#d4a574' }}
                onClick={() => setSelectedEntry(entry)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {entry.image_url && (
                  <div className="w-full h-80 overflow-hidden">
                    <img
                      src={entry.image_url}
                      alt={entry.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl" style={{ color: '#2c1810' }}>
                    {entry.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-3" style={{ color: '#5a4a3a' }}>
                    {entry.description}
                  </CardDescription>
                  {/* Show character role/era badges in list */}
                  {isCharacterCategory && (entry.role || entry.era) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.role && (
                        <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#d4a574', color: '#2c1810' }}>
                          {entry.role}
                        </span>
                      )}
                      {entry.era && (
                        <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#c9a57a', color: '#fff' }}>
                          {entry.era}
                        </span>
                      )}
                    </div>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlmanacCategory;
