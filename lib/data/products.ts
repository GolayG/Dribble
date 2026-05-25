import type { ProductRow } from "@/lib/supabase/types";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tag: string | null;
  emoji: string | null;
};

export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id ?? row.name,
    name: row.name,
    description: row.description,
    price: row.price,
    category: row.category,
    tag: row.tag ?? null,
    emoji: row.emoji ?? null,
  };
}
