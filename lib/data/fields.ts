import type { FieldRow } from "@/lib/supabase/types";

export type Field = {
  id: string;
  name: string;
  type: "Soccer" | "Pickleball" | "Indoor" | "Outdoor";
  surface: string;
  size: string;
  capacity: number;
  pricePerHour: number;
  image: string;
  available: boolean;
  features: string[];
  description: string;
};

export function mapFieldRow(row: FieldRow): Field {
  return {
    id: row.id ?? row.name,
    name: row.name,
    type: row.field_type,
    description: row.description,
    pricePerHour: row.hourly_rate,
    available: true,
    surface: row.field_type,
    size: row.field_type,
    capacity: 0,
    image: "",
    features: [],
  };
}
