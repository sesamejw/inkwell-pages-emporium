export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password_hash: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password_hash: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password_hash?: string
        }
        Relationships: []
      }
      almanac_character_images: {
        Row: {
          caption: string | null
          character_id: string
          created_at: string | null
          id: string
          image_url: string
          order_index: number | null
        }
        Insert: {
          caption?: string | null
          character_id: string
          created_at?: string | null
          id?: string
          image_url: string
          order_index?: number | null
        }
        Update: {
          caption?: string | null
          character_id?: string
          created_at?: string | null
          id?: string
          image_url?: string
          order_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "almanac_character_images_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "almanac_characters"
            referencedColumns: ["id"]
          },
        ]
      }
      almanac_characters: {
        Row: {
          abilities: string | null
          affiliation: string | null
          article: string
          created_at: string | null
          description: string
          era: string | null
          id: string
          image_url: string | null
          is_disabled: boolean | null
          name: string
          order_index: number | null
          origin_location_id: string | null
          promo_book_id: string | null
          promo_enabled: boolean | null
          promo_link: string | null
          promo_text: string | null
          relationships: string | null
          role: string | null
          slug: string
          species: string | null
          updated_at: string | null
        }
        Insert: {
          abilities?: string | null
          affiliation?: string | null
          article: string
          created_at?: string | null
          description: string
          era?: string | null
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name: string
          order_index?: number | null
          origin_location_id?: string | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          relationships?: string | null
          role?: string | null
          slug: string
          species?: string | null
          updated_at?: string | null
        }
        Update: {
          abilities?: string | null
          affiliation?: string | null
          article?: string
          created_at?: string | null
          description?: string
          era?: string | null
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name?: string
          order_index?: number | null
          origin_location_id?: string | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          relationships?: string | null
          role?: string | null
          slug?: string
          species?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "almanac_characters_origin_location_id_fkey"
            columns: ["origin_location_id"]
            isOneToOne: false
            referencedRelation: "world_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "almanac_characters_promo_book_id_fkey"
            columns: ["promo_book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      almanac_concepts: {
        Row: {
          article: string
          concept_type: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          is_disabled: boolean | null
          name: string
          order_index: number | null
          promo_book_id: string | null
          promo_enabled: boolean | null
          promo_link: string | null
          promo_text: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          article: string
          concept_type?: string | null
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name: string
          order_index?: number | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          article?: string
          concept_type?: string | null
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name?: string
          order_index?: number | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "almanac_concepts_promo_book_id_fkey"
            columns: ["promo_book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      almanac_entry_images: {
        Row: {
          caption: string | null
          category: string
          created_at: string | null
          entry_id: string
          id: string
          image_url: string
          order_index: number | null
        }
        Insert: {
          caption?: string | null
          category: string
          created_at?: string | null
          entry_id: string
          id?: string
          image_url: string
          order_index?: number | null
        }
        Update: {
          caption?: string | null
          category?: string
          created_at?: string | null
          entry_id?: string
          id?: string
          image_url?: string
          order_index?: number | null
        }
        Relationships: []
      }
      almanac_kingdoms: {
        Row: {
          article: string
          created_at: string | null
          description: string
          founded_date: string | null
          id: string
          image_url: string | null
          is_disabled: boolean | null
          name: string
          order_index: number | null
          promo_book_id: string | null
          promo_enabled: boolean | null
          promo_link: string | null
          promo_text: string | null
          slug: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          article: string
          created_at?: string | null
          description: string
          founded_date?: string | null
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name: string
          order_index?: number | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          article?: string
          created_at?: string | null
          description?: string
          founded_date?: string | null
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name?: string
          order_index?: number | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "almanac_kingdoms_promo_book_id_fkey"
            columns: ["promo_book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      almanac_locations: {
        Row: {
          article: string
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          is_disabled: boolean | null
          kingdom: string | null
          location_type: string | null
          name: string
          order_index: number | null
          promo_book_id: string | null
          promo_enabled: boolean | null
          promo_link: string | null
          promo_text: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          article: string
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          kingdom?: string | null
          location_type?: string | null
          name: string
          order_index?: number | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          article?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          kingdom?: string | null
          location_type?: string | null
          name?: string
          order_index?: number | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "almanac_locations_promo_book_id_fkey"
            columns: ["promo_book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      almanac_magic: {
        Row: {
          article: string
          created_at: string | null
          description: string
          difficulty: string | null
          id: string
          image_url: string | null
          is_disabled: boolean | null
          magic_type: string | null
          name: string
          order_index: number | null
          promo_book_id: string | null
          promo_enabled: boolean | null
          promo_link: string | null
          promo_text: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          article: string
          created_at?: string | null
          description: string
          difficulty?: string | null
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          magic_type?: string | null
          name: string
          order_index?: number | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          article?: string
          created_at?: string | null
          description?: string
          difficulty?: string | null
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          magic_type?: string | null
          name?: string
          order_index?: number | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "almanac_magic_promo_book_id_fkey"
            columns: ["promo_book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      almanac_races: {
        Row: {
          article: string
          created_at: string | null
          description: string
          homeland: string | null
          id: string
          image_url: string | null
          is_disabled: boolean | null
          name: string
          order_index: number | null
          population: string | null
          promo_book_id: string | null
          promo_enabled: boolean | null
          promo_link: string | null
          promo_text: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          article: string
          created_at?: string | null
          description: string
          homeland?: string | null
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name: string
          order_index?: number | null
          population?: string | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          article?: string
          created_at?: string | null
          description?: string
          homeland?: string | null
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name?: string
          order_index?: number | null
          population?: string | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "almanac_races_promo_book_id_fkey"
            columns: ["promo_book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      almanac_relics: {
        Row: {
          article: string
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          is_disabled: boolean | null
          name: string
          order_index: number | null
          power_level: string | null
          promo_book_id: string | null
          promo_enabled: boolean | null
          promo_link: string | null
          promo_text: string | null
          slug: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          article: string
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name: string
          order_index?: number | null
          power_level?: string | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          article?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name?: string
          order_index?: number | null
          power_level?: string | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          slug?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "almanac_relics_promo_book_id_fkey"
            columns: ["promo_book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      almanac_titles: {
        Row: {
          article: string
          authority: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          is_disabled: boolean | null
          name: string
          order_index: number | null
          promo_book_id: string | null
          promo_enabled: boolean | null
          promo_link: string | null
          promo_text: string | null
          rank: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          article: string
          authority?: string | null
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name: string
          order_index?: number | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          rank?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          article?: string
          authority?: string | null
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          is_disabled?: boolean | null
          name?: string
          order_index?: number | null
          promo_book_id?: string | null
          promo_enabled?: boolean | null
          promo_link?: string | null
          promo_text?: string | null
          rank?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "almanac_titles_promo_book_id_fkey"
            columns: ["promo_book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      badge_types: {
        Row: {
          created_at: string
          criteria: string
          description: string
          icon: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          criteria: string
          description: string
          icon: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          criteria?: string
          description?: string
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      book_club_discussions: {
        Row: {
          author_id: string
          book_id: string | null
          chapter: string | null
          club_id: string
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          book_id?: string | null
          chapter?: string | null
          club_id: string
          content: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          book_id?: string | null
          chapter?: string | null
          club_id?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_club_discussions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "book_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      book_club_members: {
        Row: {
          club_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          club_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          club_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "book_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      book_clubs: {
        Row: {
          cover_image_url: string | null
          created_at: string
          current_book_id: string | null
          description: string | null
          id: string
          is_private: boolean
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          current_book_id?: string | null
          description?: string | null
          id?: string
          is_private?: boolean
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          current_book_id?: string | null
          description?: string | null
          id?: string
          is_private?: boolean
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      book_external_links: {
        Row: {
          book_id: string
          created_at: string
          format_type: string
          id: string
          order_index: number | null
          store_name: string
          updated_at: string
          url: string
        }
        Insert: {
          book_id: string
          created_at?: string
          format_type: string
          id?: string
          order_index?: number | null
          store_name: string
          updated_at?: string
          url: string
        }
        Update: {
          book_id?: string
          created_at?: string
          format_type?: string
          id?: string
          order_index?: number | null
          store_name?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_external_links_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_highlights: {
        Row: {
          book_id: string
          color: string
          created_at: string
          end_offset: number
          id: string
          page_number: number
          start_offset: number
          text_content: string
          updated_at: string
          user_id: string
        }
        Insert: {
          book_id: string
          color?: string
          created_at?: string
          end_offset: number
          id?: string
          page_number: number
          start_offset: number
          text_content: string
          updated_at?: string
          user_id: string
        }
        Update: {
          book_id?: string
          color?: string
          created_at?: string
          end_offset?: number
          id?: string
          page_number?: number
          start_offset?: number
          text_content?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      book_notes: {
        Row: {
          book_id: string
          content: string
          created_at: string
          highlight_id: string | null
          id: string
          page_number: number
          updated_at: string
          user_id: string
        }
        Insert: {
          book_id: string
          content: string
          created_at?: string
          highlight_id?: string | null
          id?: string
          page_number: number
          updated_at?: string
          user_id: string
        }
        Update: {
          book_id?: string
          content?: string
          created_at?: string
          highlight_id?: string | null
          id?: string
          page_number?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_notes_highlight_id_fkey"
            columns: ["highlight_id"]
            isOneToOne: false
            referencedRelation: "book_highlights"
            referencedColumns: ["id"]
          },
        ]
      }
      book_versions: {
        Row: {
          available: boolean | null
          book_id: string
          created_at: string | null
          id: string
          price: number
          version_type: string
        }
        Insert: {
          available?: boolean | null
          book_id: string
          created_at?: string | null
          id?: string
          price: number
          version_type: string
        }
        Update: {
          available?: boolean | null
          book_id?: string
          created_at?: string | null
          id?: string
          price?: number
          version_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_versions_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          book_id: string
          created_at: string
          id: string
          label: string | null
          page_number: number
          user_id: string
        }
        Insert: {
          book_id: string
          created_at?: string
          id?: string
          label?: string | null
          page_number: number
          user_id: string
        }
        Update: {
          book_id?: string
          created_at?: string
          id?: string
          label?: string | null
          page_number?: number
          user_id?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          author: string
          category: string
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          ebook_pdf_url: string | null
          id: string
          isbn: string | null
          language: string | null
          pages: number | null
          preview_pdf_url: string | null
          published_date: string | null
          rating: number | null
          sales: number | null
          status: string
          stock: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          category: string
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          ebook_pdf_url?: string | null
          id?: string
          isbn?: string | null
          language?: string | null
          pages?: number | null
          preview_pdf_url?: string | null
          published_date?: string | null
          rating?: number | null
          sales?: number | null
          status?: string
          stock?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          category?: string
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          ebook_pdf_url?: string | null
          id?: string
          isbn?: string | null
          language?: string | null
          pages?: number | null
          preview_pdf_url?: string | null
          published_date?: string | null
          rating?: number | null
          sales?: number | null
          status?: string
          stock?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      character_event_links: {
        Row: {
          character_id: string
          created_at: string
          description: string | null
          event_id: string
          id: string
          role: string | null
          role_in_event: string | null
        }
        Insert: {
          character_id: string
          created_at?: string
          description?: string | null
          event_id: string
          id?: string
          role?: string | null
          role_in_event?: string | null
        }
        Update: {
          character_id?: string
          created_at?: string
          description?: string | null
          event_id?: string
          id?: string
          role?: string | null
          role_in_event?: string | null
        }
        Relationships: []
      }
      character_relationships: {
        Row: {
          character_id: string | null
          created_at: string
          description: string | null
          id: string
          related_character_id: string | null
          relationship_type: string
          source_character_id: string | null
          target_character_id: string | null
        }
        Insert: {
          character_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          related_character_id?: string | null
          relationship_type: string
          source_character_id?: string | null
          target_character_id?: string | null
        }
        Update: {
          character_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          related_character_id?: string | null
          relationship_type?: string
          source_character_id?: string | null
          target_character_id?: string | null
        }
        Relationships: []
      }
      character_stats: {
        Row: {
          agility: number | null
          character_id: string
          charisma: number | null
          created_at: string
          endurance: number | null
          id: string
          intelligence: number | null
          magic: number | null
          strength: number | null
          updated_at: string
        }
        Insert: {
          agility?: number | null
          character_id: string
          charisma?: number | null
          created_at?: string
          endurance?: number | null
          id?: string
          intelligence?: number | null
          magic?: number | null
          strength?: number | null
          updated_at?: string
        }
        Update: {
          agility?: number | null
          character_id?: string
          charisma?: number | null
          created_at?: string
          endurance?: number | null
          id?: string
          intelligence?: number | null
          magic?: number | null
          strength?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_stats_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: true
            referencedRelation: "almanac_characters"
            referencedColumns: ["id"]
          },
        ]
      }
      chronology_event_relationships: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          relationship_type: string
          source_event_id: string
          target_event_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          relationship_type: string
          source_event_id: string
          target_event_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          relationship_type?: string
          source_event_id?: string
          target_event_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chronology_event_relationships_source_event_id_fkey"
            columns: ["source_event_id"]
            isOneToOne: false
            referencedRelation: "chronology_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chronology_event_relationships_target_event_id_fkey"
            columns: ["target_event_id"]
            isOneToOne: false
            referencedRelation: "chronology_events"
            referencedColumns: ["id"]
          },
        ]
      }
      chronology_events: {
        Row: {
          article: string
          created_at: string
          date: string
          description: string
          era: string
          id: string
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          article: string
          created_at?: string
          date: string
          description: string
          era: string
          id?: string
          order_index: number
          title: string
          updated_at?: string
        }
        Update: {
          article?: string
          created_at?: string
          date?: string
          description?: string
          era?: string
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          postal_code: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
          postal_code?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          postal_code?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      discussion_replies: {
        Row: {
          author_id: string
          content: string
          created_at: string
          discussion_id: string
          id: string
          parent_reply_id: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          discussion_id: string
          id?: string
          parent_reply_id?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          discussion_id?: string
          id?: string
          parent_reply_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "book_club_discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_replies_parent_reply_id_fkey"
            columns: ["parent_reply_id"]
            isOneToOne: false
            referencedRelation: "discussion_replies"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          post_id: string | null
          reply_id: string | null
          triggered_by_user_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          post_id?: string | null
          reply_id?: string | null
          triggered_by_user_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          post_id?: string | null
          reply_id?: string | null
          triggered_by_user_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_notifications_triggered_by_user_id_fkey"
            columns: ["triggered_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_poll_options: {
        Row: {
          created_at: string
          id: string
          option_text: string
          order_index: number
          poll_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          option_text: string
          order_index?: number
          poll_id: string
        }
        Update: {
          created_at?: string
          id?: string
          option_text?: string
          order_index?: number
          poll_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_poll_options_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "forum_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_poll_votes: {
        Row: {
          created_at: string
          id: string
          option_id: string
          poll_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          option_id: string
          poll_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          option_id?: string
          poll_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_poll_votes_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "forum_poll_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_poll_votes_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "forum_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_polls: {
        Row: {
          created_at: string
          ends_at: string | null
          id: string
          post_id: string
          question: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          id?: string
          post_id: string
          question: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          id?: string
          post_id?: string
          question?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_polls_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_post_tags: {
        Row: {
          id: string
          post_id: string
          tag_id: string
        }
        Insert: {
          id?: string
          post_id: string
          tag_id: string
        }
        Update: {
          id?: string
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "post_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          id: string
          is_sticky: boolean
          likes_count: number
          parent_post_id: string | null
          replies_count: number
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category: string
          content: string
          created_at?: string
          id?: string
          is_sticky?: boolean
          likes_count?: number
          parent_post_id?: string | null
          replies_count?: number
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_sticky?: boolean
          likes_count?: number
          parent_post_id?: string | null
          replies_count?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_author_id_profiles_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_posts_parent_post_id_fkey"
            columns: ["parent_post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_replies: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          likes_count: number
          parent_reply_id: string | null
          post_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          likes_count?: number
          parent_reply_id?: string | null
          post_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          likes_count?: number
          parent_reply_id?: string | null
          post_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_author_id_profiles_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_parent_reply_id_fkey"
            columns: ["parent_reply_id"]
            isOneToOne: false
            referencedRelation: "forum_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_reply_likes: {
        Row: {
          created_at: string
          id: string
          reply_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reply_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reply_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_reply_likes_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "forum_replies"
            referencedColumns: ["id"]
          },
        ]
      }
      lore_characters: {
        Row: {
          affiliation: string | null
          age: string | null
          article: string | null
          created_at: string
          description: string | null
          era: string | null
          id: string
          image_url: string | null
          lore: string | null
          name: string
          nationality: string | null
          order_index: number | null
          physical_appearance: string | null
          quirks: string | null
          race: string | null
          role: string | null
          slug: string | null
          updated_at: string
        }
        Insert: {
          affiliation?: string | null
          age?: string | null
          article?: string | null
          created_at?: string
          description?: string | null
          era?: string | null
          id?: string
          image_url?: string | null
          lore?: string | null
          name: string
          nationality?: string | null
          order_index?: number | null
          physical_appearance?: string | null
          quirks?: string | null
          race?: string | null
          role?: string | null
          slug?: string | null
          updated_at?: string
        }
        Update: {
          affiliation?: string | null
          age?: string | null
          article?: string | null
          created_at?: string
          description?: string | null
          era?: string | null
          id?: string
          image_url?: string | null
          lore?: string | null
          name?: string
          nationality?: string | null
          order_index?: number | null
          physical_appearance?: string | null
          quirks?: string | null
          race?: string | null
          role?: string | null
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          book_id: string
          created_at: string | null
          id: string
          order_id: string
          price: number
          quantity: number
          version_type: string
        }
        Insert: {
          book_id: string
          created_at?: string | null
          id?: string
          order_id: string
          price: number
          quantity?: number
          version_type: string
        }
        Update: {
          book_id?: string
          created_at?: string | null
          id?: string
          order_id?: string
          price?: number
          quantity?: number
          version_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string
          id: string
          order_number: string
          status: string
          subtotal: number
          tax: number
          total: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: string
          order_number: string
          status?: string
          subtotal: number
          tax: number
          total: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: string
          order_number?: string
          status?: string
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      post_tags: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          slug: string
          usage_count: number
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          name: string
          slug: string
          usage_count?: number
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          slug?: string
          usage_count?: number
        }
        Relationships: []
      }
      private_conversations: {
        Row: {
          created_at: string
          id: string
          participant_one: string
          participant_two: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          participant_one: string
          participant_two: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          participant_one?: string
          participant_two?: string
          updated_at?: string
        }
        Relationships: []
      }
      private_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "private_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "private_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          last_active: string | null
          lore_contributions: number | null
          total_forum_posts: number
          total_forum_replies: number
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          last_active?: string | null
          lore_contributions?: number | null
          total_forum_posts?: number
          total_forum_replies?: number
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          last_active?: string | null
          lore_contributions?: number | null
          total_forum_posts?: number
          total_forum_replies?: number
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          book_author: string
          book_cover_url: string | null
          book_id: string
          book_title: string
          book_version: string
          id: string
          price: number
          purchased_at: string
          user_id: string
        }
        Insert: {
          book_author: string
          book_cover_url?: string | null
          book_id: string
          book_title: string
          book_version: string
          id?: string
          price: number
          purchased_at?: string
          user_id: string
        }
        Update: {
          book_author?: string
          book_cover_url?: string | null
          book_id?: string
          book_title?: string
          book_version?: string
          id?: string
          price?: number
          purchased_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reading_progress: {
        Row: {
          book_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          current_page: number
          id: string
          last_read_at: string
          progress_percentage: number
          time_spent_seconds: number
          total_pages: number
          updated_at: string
          user_id: string
        }
        Insert: {
          book_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          current_page?: number
          id?: string
          last_read_at?: string
          progress_percentage?: number
          time_spent_seconds?: number
          total_pages?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          book_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          current_page?: number
          id?: string
          last_read_at?: string
          progress_percentage?: number
          time_spent_seconds?: number
          total_pages?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reading_streaks: {
        Row: {
          created_at: string | null
          current_streak: number
          id: string
          last_read_date: string | null
          longest_streak: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number
          id?: string
          last_read_date?: string | null
          longest_streak?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number
          id?: string
          last_read_date?: string | null
          longest_streak?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          book_id: string
          comment: string
          created_at: string
          id: string
          rating: number
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          book_id: string
          comment: string
          created_at?: string
          id?: string
          rating: number
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          book_id?: string
          comment?: string
          created_at?: string
          id?: string
          rating?: number
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rp_abilities: {
        Row: {
          ability_type: string
          created_at: string
          description: string
          icon: string | null
          id: string
          name: string
          rarity: string
          stat_bonus: Json | null
          unlock_requirements: Json | null
        }
        Insert: {
          ability_type?: string
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          name: string
          rarity?: string
          stat_bonus?: Json | null
          unlock_requirements?: Json | null
        }
        Update: {
          ability_type?: string
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          name?: string
          rarity?: string
          stat_bonus?: Json | null
          unlock_requirements?: Json | null
        }
        Relationships: []
      }
      rp_campaign_npcs: {
        Row: {
          campaign_id: string
          created_at: string
          description: string | null
          expressions: Json | null
          id: string
          name: string
          portrait_url: string | null
        }
        Insert: {
          campaign_id: string
          created_at?: string
          description?: string | null
          expressions?: Json | null
          id?: string
          name: string
          portrait_url?: string | null
        }
        Update: {
          campaign_id?: string
          created_at?: string
          description?: string | null
          expressions?: Json | null
          id?: string
          name?: string
          portrait_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rp_campaign_npcs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "rp_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_campaign_reviews: {
        Row: {
          campaign_id: string
          content: string | null
          created_at: string
          id: string
          rating: number
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          campaign_id: string
          content?: string | null
          created_at?: string
          id?: string
          rating: number
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          campaign_id?: string
          content?: string | null
          created_at?: string
          id?: string
          rating?: number
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rp_campaign_reviews_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "rp_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_campaigns: {
        Row: {
          author_id: string
          average_rating: number | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          difficulty: string
          estimated_duration: number | null
          genre: string
          id: string
          is_featured: boolean
          is_published: boolean
          play_count: number
          review_count: number | null
          start_node_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          average_rating?: number | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string
          estimated_duration?: number | null
          genre?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          play_count?: number
          review_count?: number | null
          start_node_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          average_rating?: number | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string
          estimated_duration?: number | null
          genre?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          play_count?: number
          review_count?: number | null
          start_node_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rp_campaigns_start_node_fkey"
            columns: ["start_node_id"]
            isOneToOne: false
            referencedRelation: "rp_story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_character_abilities: {
        Row: {
          ability_id: string | null
          ability_name: string
          character_id: string
          description: string | null
          id: string
          source_node_id: string | null
          source_session_id: string | null
          unlocked_at: string
        }
        Insert: {
          ability_id?: string | null
          ability_name: string
          character_id: string
          description?: string | null
          id?: string
          source_node_id?: string | null
          source_session_id?: string | null
          unlocked_at?: string
        }
        Update: {
          ability_id?: string | null
          ability_name?: string
          character_id?: string
          description?: string | null
          id?: string
          source_node_id?: string | null
          source_session_id?: string | null
          unlocked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rp_character_abilities_ability_id_fkey"
            columns: ["ability_id"]
            isOneToOne: false
            referencedRelation: "rp_abilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_character_abilities_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "rp_characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_character_abilities_source_session_id_fkey"
            columns: ["source_session_id"]
            isOneToOne: false
            referencedRelation: "rp_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_character_factions: {
        Row: {
          character_id: string
          faction_id: string
          id: string
          joined_at: string | null
          rank: string | null
          reputation: number
          updated_at: string
        }
        Insert: {
          character_id: string
          faction_id: string
          id?: string
          joined_at?: string | null
          rank?: string | null
          reputation?: number
          updated_at?: string
        }
        Update: {
          character_id?: string
          faction_id?: string
          id?: string
          joined_at?: string | null
          rank?: string | null
          reputation?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rp_character_factions_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "rp_characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_character_factions_faction_id_fkey"
            columns: ["faction_id"]
            isOneToOne: false
            referencedRelation: "rp_factions"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_character_inventory: {
        Row: {
          acquired_at: string
          character_id: string
          id: string
          item_id: string
          quantity: number
          source_node_id: string | null
        }
        Insert: {
          acquired_at?: string
          character_id: string
          id?: string
          item_id: string
          quantity?: number
          source_node_id?: string | null
        }
        Update: {
          acquired_at?: string
          character_id?: string
          id?: string
          item_id?: string
          quantity?: number
          source_node_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rp_character_inventory_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "rp_characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_character_inventory_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "rp_items"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_character_progress: {
        Row: {
          character_id: string
          current_node_id: string | null
          id: string
          nodes_visited: string[] | null
          session_id: string
          stats_snapshot: Json
          story_flags: Json
          updated_at: string
          xp_earned: number
        }
        Insert: {
          character_id: string
          current_node_id?: string | null
          id?: string
          nodes_visited?: string[] | null
          session_id: string
          stats_snapshot?: Json
          story_flags?: Json
          updated_at?: string
          xp_earned?: number
        }
        Update: {
          character_id?: string
          current_node_id?: string | null
          id?: string
          nodes_visited?: string[] | null
          session_id?: string
          stats_snapshot?: Json
          story_flags?: Json
          updated_at?: string
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "rp_character_progress_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "rp_characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_character_progress_current_node_id_fkey"
            columns: ["current_node_id"]
            isOneToOne: false
            referencedRelation: "rp_story_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_character_progress_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "rp_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_characters: {
        Row: {
          ability_slots: number
          backstory: string | null
          created_at: string
          current_session_id: string | null
          id: string
          is_active: boolean
          is_public: boolean | null
          level: number
          name: string
          portrait_url: string | null
          race_id: string | null
          stats: Json
          title: string | null
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          ability_slots?: number
          backstory?: string | null
          created_at?: string
          current_session_id?: string | null
          id?: string
          is_active?: boolean
          is_public?: boolean | null
          level?: number
          name: string
          portrait_url?: string | null
          race_id?: string | null
          stats?: Json
          title?: string | null
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          ability_slots?: number
          backstory?: string | null
          created_at?: string
          current_session_id?: string | null
          id?: string
          is_active?: boolean
          is_public?: boolean | null
          level?: number
          name?: string
          portrait_url?: string | null
          race_id?: string | null
          stats?: Json
          title?: string | null
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "rp_characters_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "almanac_races"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_characters_session_fkey"
            columns: ["current_session_id"]
            isOneToOne: false
            referencedRelation: "rp_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_community_lore: {
        Row: {
          approved_at: string
          approved_by: string | null
          article: string | null
          category: string
          created_at: string
          creator_id: string
          description: string
          id: string
          image_url: string | null
          is_featured: boolean | null
          name: string
          proposal_id: string | null
          updated_at: string
          view_count: number | null
        }
        Insert: {
          approved_at?: string
          approved_by?: string | null
          article?: string | null
          category: string
          created_at?: string
          creator_id: string
          description: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name: string
          proposal_id?: string | null
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          approved_at?: string
          approved_by?: string | null
          article?: string | null
          category?: string
          created_at?: string
          creator_id?: string
          description?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name?: string
          proposal_id?: string | null
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rp_community_lore_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "rp_lore_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_factions: {
        Row: {
          color: string | null
          created_at: string
          description: string
          id: string
          image_url: string | null
          name: string
          reputation_levels: Json | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          name: string
          reputation_levels?: Json | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          name?: string
          reputation_levels?: Json | null
        }
        Relationships: []
      }
      rp_items: {
        Row: {
          created_at: string
          description: string | null
          effect: Json | null
          icon_url: string | null
          id: string
          item_type: string
          name: string
          rarity: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          effect?: Json | null
          icon_url?: string | null
          id?: string
          item_type?: string
          name: string
          rarity?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          effect?: Json | null
          icon_url?: string | null
          id?: string
          item_type?: string
          name?: string
          rarity?: string
        }
        Relationships: []
      }
      rp_level_benefits: {
        Row: {
          ability_slots_granted: number
          description: string | null
          id: string
          level: number
          stat_points_granted: number
          title: string | null
          xp_required: number
        }
        Insert: {
          ability_slots_granted?: number
          description?: string | null
          id?: string
          level: number
          stat_points_granted?: number
          title?: string | null
          xp_required: number
        }
        Update: {
          ability_slots_granted?: number
          description?: string | null
          id?: string
          level?: number
          stat_points_granted?: number
          title?: string | null
          xp_required?: number
        }
        Relationships: []
      }
      rp_lore_proposals: {
        Row: {
          category: string
          content: Json
          created_at: string
          id: string
          reviewed_at: string | null
          reviewer_id: string | null
          reviewer_notes: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          content?: Json
          created_at?: string
          id?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          content?: Json
          created_at?: string
          id?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rp_loremasters: {
        Row: {
          appointed_at: string
          appointed_by: string | null
          id: string
          user_id: string
        }
        Insert: {
          appointed_at?: string
          appointed_by?: string | null
          id?: string
          user_id: string
        }
        Update: {
          appointed_at?: string
          appointed_by?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      rp_node_choices: {
        Row: {
          choice_text: string
          created_at: string
          id: string
          item_requirement: string | null
          item_reward: string | null
          node_id: string
          order_index: number
          stat_effect: Json | null
          stat_requirement: Json | null
          target_node_id: string | null
        }
        Insert: {
          choice_text: string
          created_at?: string
          id?: string
          item_requirement?: string | null
          item_reward?: string | null
          node_id: string
          order_index?: number
          stat_effect?: Json | null
          stat_requirement?: Json | null
          target_node_id?: string | null
        }
        Update: {
          choice_text?: string
          created_at?: string
          id?: string
          item_requirement?: string | null
          item_reward?: string | null
          node_id?: string
          order_index?: number
          stat_effect?: Json | null
          stat_requirement?: Json | null
          target_node_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rp_node_choices_item_requirement_fkey"
            columns: ["item_requirement"]
            isOneToOne: false
            referencedRelation: "rp_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_node_choices_item_reward_fkey"
            columns: ["item_reward"]
            isOneToOne: false
            referencedRelation: "rp_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_node_choices_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "rp_story_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_node_choices_target_node_id_fkey"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "rp_story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_node_media: {
        Row: {
          created_at: string
          id: string
          media_type: string
          node_id: string
          position: string | null
          should_loop: boolean | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          media_type: string
          node_id: string
          position?: string | null
          should_loop?: boolean | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          media_type?: string
          node_id?: string
          position?: string | null
          should_loop?: boolean | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "rp_node_media_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "rp_story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_session_invitations: {
        Row: {
          created_at: string | null
          id: string
          invited_by: string
          invited_user_id: string
          responded_at: string | null
          session_id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          invited_by: string
          invited_user_id: string
          responded_at?: string | null
          session_id: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          invited_by?: string
          invited_user_id?: string
          responded_at?: string | null
          session_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rp_session_invitations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "rp_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_session_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          message_type: string | null
          metadata: Json | null
          session_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          message_type?: string | null
          metadata?: Json | null
          session_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          message_type?: string | null
          metadata?: Json | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rp_session_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "rp_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_session_participants: {
        Row: {
          character_id: string
          id: string
          is_active: boolean
          joined_at: string
          session_id: string
        }
        Insert: {
          character_id: string
          id?: string
          is_active?: boolean
          joined_at?: string
          session_id: string
        }
        Update: {
          character_id?: string
          id?: string
          is_active?: boolean
          joined_at?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rp_session_participants_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "rp_characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "rp_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_sessions: {
        Row: {
          campaign_id: string
          completed_at: string | null
          created_by: string
          current_node_id: string | null
          current_turn_player_id: string | null
          id: string
          last_played_at: string
          max_players: number | null
          mode: string
          session_code: string | null
          started_at: string
          status: string
          story_flags: Json
          turn_deadline: string | null
          turn_order: string[] | null
        }
        Insert: {
          campaign_id: string
          completed_at?: string | null
          created_by: string
          current_node_id?: string | null
          current_turn_player_id?: string | null
          id?: string
          last_played_at?: string
          max_players?: number | null
          mode?: string
          session_code?: string | null
          started_at?: string
          status?: string
          story_flags?: Json
          turn_deadline?: string | null
          turn_order?: string[] | null
        }
        Update: {
          campaign_id?: string
          completed_at?: string | null
          created_by?: string
          current_node_id?: string | null
          current_turn_player_id?: string | null
          id?: string
          last_played_at?: string
          max_players?: number | null
          mode?: string
          session_code?: string | null
          started_at?: string
          status?: string
          story_flags?: Json
          turn_deadline?: string | null
          turn_order?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "rp_sessions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "rp_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rp_sessions_current_node_id_fkey"
            columns: ["current_node_id"]
            isOneToOne: false
            referencedRelation: "rp_story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      rp_story_nodes: {
        Row: {
          audio_url: string | null
          campaign_id: string
          content: Json
          created_at: string
          id: string
          image_url: string | null
          node_type: string
          position_x: number
          position_y: number
          title: string | null
          updated_at: string
          xp_reward: number
        }
        Insert: {
          audio_url?: string | null
          campaign_id: string
          content?: Json
          created_at?: string
          id?: string
          image_url?: string | null
          node_type?: string
          position_x?: number
          position_y?: number
          title?: string | null
          updated_at?: string
          xp_reward?: number
        }
        Update: {
          audio_url?: string | null
          campaign_id?: string
          content?: Json
          created_at?: string
          id?: string
          image_url?: string | null
          node_type?: string
          position_x?: number
          position_y?: number
          title?: string | null
          updated_at?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "rp_story_nodes_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "rp_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      social_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          reference_id: string | null
          reference_type: string | null
          triggered_by_user_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          reference_id?: string | null
          reference_type?: string | null
          triggered_by_user_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          reference_id?: string | null
          reference_type?: string | null
          triggered_by_user_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      submission_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          submission_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          submission_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          submission_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "submission_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submission_comments_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "user_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_likes: {
        Row: {
          created_at: string
          id: string
          submission_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          submission_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          submission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_likes_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "user_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_notifications: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          submission_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          submission_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          submission_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_notifications_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "user_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_tags: {
        Row: {
          created_at: string
          id: string
          submission_id: string
          tag_id: string
          tag_name: string
          tag_type: Database["public"]["Enums"]["tag_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          submission_id: string
          tag_id: string
          tag_name: string
          tag_type: Database["public"]["Enums"]["tag_type"]
        }
        Update: {
          created_at?: string
          id?: string
          submission_id?: string
          tag_id?: string
          tag_name?: string
          tag_type?: Database["public"]["Enums"]["tag_type"]
        }
        Relationships: [
          {
            foreignKeyName: "submission_tags_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "user_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_type: string
          earned_at: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          achievement_type: string
          earned_at?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          achievement_type?: string
          earned_at?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_type: string
          created_at: string | null
          id: string
          metadata: Json | null
          reference_id: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badge_types"
            referencedColumns: ["id"]
          },
        ]
      }
      user_follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          infinite_scroll_enabled: boolean | null
          notifications_comments: boolean | null
          notifications_follows: boolean | null
          notifications_likes: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          infinite_scroll_enabled?: boolean | null
          notifications_comments?: boolean | null
          notifications_follows?: boolean | null
          notifications_likes?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          infinite_scroll_enabled?: boolean | null
          notifications_comments?: boolean | null
          notifications_follows?: boolean | null
          notifications_likes?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_reputation: {
        Row: {
          created_at: string
          id: string
          likes_received: number
          posts_count: number
          rank: string
          replies_count: number
          total_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          likes_received?: number
          posts_count?: number
          rank?: string
          replies_count?: number
          total_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          likes_received?: number
          posts_count?: number
          rank?: string
          replies_count?: number
          total_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_submissions: {
        Row: {
          admin_notes: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string
          description: string | null
          featured_at: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          rating: number | null
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string
          description?: string | null
          featured_at?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          rating?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string
          description?: string | null
          featured_at?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          rating?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          password_hash: string
          updated_at: string
        }
        Insert: {
          created_at: string
          email: string
          full_name?: string | null
          id: string
          password_hash: string
          updated_at: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          book_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          book_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          book_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      world_locations: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          type: string
          updated_at: string
          x_position: number
          y_position: number
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          type?: string
          updated_at?: string
          x_position?: number
          y_position?: number
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          type?: string
          updated_at?: string
          x_position?: number
          y_position?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_session_code: { Args: never; Returns: string }
      get_level_from_xp: { Args: { xp_amount: number }; Returns: number }
      get_submission_comments_count: {
        Args: { submission_uuid: string }
        Returns: number
      }
      get_submission_likes_count: {
        Args: { submission_uuid: string }
        Returns: number
      }
      get_xp_for_next_level: { Args: { current_xp: number }; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      user_has_liked: {
        Args: { checking_user_id: string; submission_uuid: string }
        Returns: boolean
      }
      verify_password: {
        Args: { input_password: string; stored_hash: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      content_status: "pending" | "approved" | "rejected"
      content_type: "art" | "discussion" | "review"
      tag_type: "almanac" | "character" | "event" | "book"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      content_status: ["pending", "approved", "rejected"],
      content_type: ["art", "discussion", "review"],
      tag_type: ["almanac", "character", "event", "book"],
    },
  },
} as const
