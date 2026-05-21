"use client";

import { motion } from "framer-motion";
import { Clock, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type TrainingProgram } from "@/lib/data/training-programs";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProgramCardProps {
  program: TrainingProgram;
  selected?: boolean;
  onSelect: (program: TrainingProgram) => void;
}

export function ProgramCard({ program, selected, onSelect }: ProgramCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(program)}
      className={cn(
        "relative border-2 transition-all cursor-pointer overflow-hidden",
        selected
          ? "border-primary shadow-lg"
          : "border-border hover:border-primary/50"
      )}
    >
      {selected && (
        <motion.div
          layoutId="program-selected"
          className="absolute top-3 left-3 z-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Check className="h-3.5 w-3.5 text-white" />
        </motion.div>
      )}

      {/* Header band */}
      <div className="h-24 bg-muted flex items-center justify-center relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg, transparent, transparent 10px, #e5e5e5 10px, #e5e5e5 11px
            )`,
          }}
        />
        <span className="text-3xl font-display text-muted-foreground/20 select-none">⚽</span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <Badge variant="primary" className="mb-1.5">Training</Badge>
            <h3 className="font-bold text-base leading-tight">{program.name}</h3>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display text-2xl text-primary">{formatCurrency(program.price)}</p>
            <p className="text-xs text-muted-foreground">per session</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{program.description}</p>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Clock className="h-3.5 w-3.5 text-primary" />
          {program.duration}
        </div>

        <Button
          variant={selected ? "secondary" : "primary"}
          size="md"
          className="w-full"
          onClick={(e) => { e.stopPropagation(); onSelect(program); }}
        >
          {selected ? "Selected ✓" : "Select Program"}
        </Button>
      </div>
    </motion.div>
  );
}
