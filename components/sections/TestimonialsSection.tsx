"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { FadeUp } from "@/components/MotionWrapper";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-primary fill-primary" : "text-border"}`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Testimonials</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)]">What Players Say</h2>
          </FadeUp>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 border border-border hover:border-primary hover:text-primary transition-colors rounded-none"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 border border-border hover:border-primary hover:text-primary transition-colors rounded-none"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <motion.div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          drag="x"
          dragConstraints={scrollRef}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
          whileTap={{ cursor: "grabbing" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex-none w-[340px] md:w-[380px] bg-muted border border-border p-8 select-none"
            >
              <StarRating rating={t.rating} />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/80 line-clamp-5">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-primary">
                  {t.sport}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
