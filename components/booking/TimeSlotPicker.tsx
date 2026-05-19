"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";
import { TIME_SLOTS } from "@/lib/constants";

const BOOKED_SLOTS = ["09:00", "09:30", "14:00", "14:30", "15:00", "19:30"];

interface TimeSlotPickerProps {
  selected: string[];
  onToggle: (slot: string) => void;
  date: Date | null;
}

export function TimeSlotPicker({ selected, onToggle, date }: TimeSlotPickerProps) {
  if (!date) {
    return (
      <div className="flex items-center justify-center h-48 border border-dashed border-border text-muted-foreground text-sm">
        Select a date first to see available time slots
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-muted border border-border rounded-sm" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-primary rounded-sm" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-muted-foreground/30 rounded-sm" /> Booked
        </span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
        {TIME_SLOTS.map((slot, i) => {
          const isBooked = BOOKED_SLOTS.includes(slot);
          const isSelected = selected.includes(slot);

          return (
            <motion.button
              key={slot}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.015, type: "spring", stiffness: 300, damping: 25 }}
              onClick={() => !isBooked && onToggle(slot)}
              disabled={isBooked}
              className={cn(
                "py-2 text-xs font-semibold border transition-all duration-150 text-center",
                isBooked
                  ? "bg-muted text-muted-foreground/40 border-border cursor-not-allowed line-through"
                  : isSelected
                  ? "bg-primary text-white border-primary"
                  : "bg-background text-foreground border-border hover:border-primary hover:text-primary cursor-pointer"
              )}
              whileHover={!isBooked ? { scale: 1.05 } : {}}
              whileTap={!isBooked ? { scale: 0.95 } : {}}
            >
              {formatTime(slot)}
            </motion.button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-primary/5 border border-primary/20 text-sm"
        >
          <span className="font-bold text-primary">{selected.length} slot{selected.length > 1 ? "s" : ""} selected</span>
          <span className="text-muted-foreground ml-2">
            ({formatTime(selected[0])} – {formatTime(selected[selected.length - 1].split(":").map((p, i) => i === 1 ? String(parseInt(p) + 30).padStart(2, "0") : p).join(":") ?? selected[selected.length - 1])})
          </span>
        </motion.div>
      )}
    </div>
  );
}
