"use client";

import { motion } from "framer-motion";
import { Check, X, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Field } from "@/lib/data/fields";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface FieldCardProps {
  field: Field;
  selected?: boolean;
  onSelect: (field: Field) => void;
}

export function FieldCard({ field, selected, onSelect }: FieldCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => field.available && onSelect(field)}
      className={cn(
        "relative border-2 transition-all cursor-pointer overflow-hidden",
        selected
          ? "border-primary shadow-lg"
          : field.available
          ? "border-border hover:border-primary/50"
          : "border-border opacity-60 cursor-not-allowed"
      )}
    >
      {/* Availability indicator */}
      <div
        className={cn(
          "absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
          field.available
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        )}
      >
        {field.available ? (
          <><Check className="h-3 w-3" /> Available</>
        ) : (
          <><X className="h-3 w-3" /> Booked</>
        )}
      </div>

      {/* Selected indicator */}
      {selected && (
        <motion.div
          layoutId="field-selected"
          className="absolute top-3 left-3 z-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Check className="h-3.5 w-3.5 text-white" />
        </motion.div>
      )}

      {/* Image placeholder */}
      <div className="h-44 bg-muted flex items-center justify-center relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg, transparent, transparent 24px, #e5e5e5 24px, #e5e5e5 25px
            ), repeating-linear-gradient(
              90deg, transparent, transparent 24px, #e5e5e5 24px, #e5e5e5 25px
            )`,
          }}
        />
        <span className="text-4xl font-display text-muted-foreground/20 select-none">
          {field.type === "Pickleball" ? "🏓" : "⚽"}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <Badge variant={field.type === "Pickleball" ? "primary" : "default"} className="mb-1.5">
              {field.type}
            </Badge>
            <h3 className="font-bold text-base leading-tight">{field.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{field.surface} · {field.size}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display text-2xl text-primary">{formatCurrency(field.pricePerHour)}</p>
            <p className="text-xs text-muted-foreground">per hour</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{field.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {field.features.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-0.5 border border-border"
            >
              <Zap className="h-2.5 w-2.5 text-primary" /> {f}
            </span>
          ))}
        </div>

        {field.available ? (
          <Button
            variant={selected ? "secondary" : "primary"}
            size="md"
            className="w-full"
            onClick={(e) => { e.stopPropagation(); onSelect(field); }}
          >
            {selected ? "Selected ✓" : "Select Field"}
          </Button>
        ) : (
          <Button variant="ghost" size="md" className="w-full" disabled>
            Unavailable
          </Button>
        )}
      </div>
    </motion.div>
  );
}
