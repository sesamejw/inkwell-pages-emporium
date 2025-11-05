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
      almanac_concepts: {
        Row: {
          article: string
          concept_type: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          name: string
          order_index: number | null
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
          name: string
          order_index?: number | null
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
          name?: string
          order_index?: number | null
          slug?: string
          updated_at?: string | null
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
          name: string
          order_index: number | null
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
          name: string
          order_index?: number | null
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
          name?: string
          order_index?: number | null
          slug?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      almanac_locations: {
        Row: {
          article: string
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          kingdom: string | null
          location_type: string | null
          name: string
          order_index: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          article: string
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          kingdom?: string | null
          location_type?: string | null
          name: string
          order_index?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          article?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          kingdom?: string | null
          location_type?: string | null
          name?: string
          order_index?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      almanac_magic: {
        Row: {
          article: string
          created_at: string | null
          description: string
          difficulty: string | null
          id: string
          image_url: string | null
          magic_type: string | null
          name: string
          order_index: number | null
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
          magic_type?: string | null
          name: string
          order_index?: number | null
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
          magic_type?: string | null
          name?: string
          order_index?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      almanac_races: {
        Row: {
          article: string
          created_at: string | null
          description: string
          homeland: string | null
          id: string
          image_url: string | null
          name: string
          order_index: number | null
          population: string | null
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
          name: string
          order_index?: number | null
          population?: string | null
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
          name?: string
          order_index?: number | null
          population?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      almanac_relics: {
        Row: {
          article: string
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          name: string
          order_index: number | null
          power_level: string | null
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
          name: string
          order_index?: number | null
          power_level?: string | null
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
          name?: string
          order_index?: number | null
          power_level?: string | null
          slug?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      almanac_titles: {
        Row: {
          article: string
          authority: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          name: string
          order_index: number | null
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
          name: string
          order_index?: number | null
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
          name?: string
          order_index?: number | null
          rank?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
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
      books: {
        Row: {
          author: string
          category: string
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          id: string
          isbn: string | null
          language: string | null
          pages: number | null
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
          id?: string
          isbn?: string | null
          language?: string | null
          pages?: number | null
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
          id?: string
          isbn?: string | null
          language?: string | null
          pages?: number | null
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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    },
  },
} as const
