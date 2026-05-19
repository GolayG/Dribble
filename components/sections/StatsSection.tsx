"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/MotionWrapper";

const stats = [
  { value: 12, suffix: "+", label: "Fields & Courts", description: "Soccer, pickleball, indoor & outdoor" },
  { value: 50000, suffix: "+", label: "Players Served", description: "Across all programs and leagues" },
  { value: 200, suffix: "+", label: "Events Hosted", description: "Tournaments, parties, corporate" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", description: "Based on post-visit surveys" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-foreground">
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        onUpdate={(latest) => {
          if (!ref.current || !isInView) return;
          const p = (latest as { opacity: number }).opacity ?? 0;
          const n = Math.round(p * value);
          const display = n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`;
          ref.current.textContent = display + suffix;
        }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
      />
      {value >= 1000 ? `${value / 1000}k${suffix}` : `${value}${suffix}`}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">By the numbers</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-secondary-foreground">
            The Dribble Difference
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-secondary p-8 lg:p-12 flex flex-col gap-2"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-sm font-bold uppercase tracking-widest text-secondary-foreground/50 mt-2">
                {stat.label}
              </p>
              <p className="text-sm text-secondary-foreground/40">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
