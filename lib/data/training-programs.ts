import type { TrainingProgramRow } from "@/lib/supabase/types";

export type TrainingProgram = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
};

export function mapProgramRow(row: TrainingProgramRow): TrainingProgram {
  return {
    id: row.id ?? row.name,
    name: row.name,
    description: row.description,
    price: row.price,
    duration: row.duration,
  };
}
