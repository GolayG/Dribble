export interface Database {
  public: {
    Tables: {
      fields: {
        Row: {
          id: string | null;
          name: string;
          field_type: string;
          description: string;
          hourly_rate: number;
          open_time: string | null;
          close_time: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["fields"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["fields"]["Insert"]>;
      };
      customers: {
        Row: {
          id: string | null;
          name: string | null;
          email: string | null;
          phone: string | null;
          created_at: string | null;
        };
        Insert: { id?: string; name: string; email: string; phone?: string | null };
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string | null;
          field_id: string | null;
          customer_id: string | null;
          start_time: string | null;
          end_time: string | null;
          status: string | null;
          total_price: number | null;
          stripe_payment_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          field_id: string;
          customer_id: string;
          start_time: string;
          end_time: string;
          status: string;
          total_price: number;
          stripe_payment_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience row types
export type FieldRow    = Database["public"]["Tables"]["fields"]["Row"];
export type CustomerRow = Database["public"]["Tables"]["customers"]["Row"];
export type BookingRow  = Database["public"]["Tables"]["bookings"]["Row"];
