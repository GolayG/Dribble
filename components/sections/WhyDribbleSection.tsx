"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { FadeUp } from "@/components/MotionWrapper";

const features = [
  {
    number: "01",
    title: "Certified World-Class Coaches",
    body: "Every trainer holds UEFA, US Soccer, or IPTPA certifications. Our coaching staff brings combined decades of professional playing and coaching experience — so you get elite instruction at every level.",
    checks: ["UEFA & US Soccer certified", "Former professional players", "Specialized youth curriculum"],
  },
  {
    number: "02",
    title: "Facilities Built to Perform",
    body: "FIFA-certified artificial turf, professional drainage, stadium-grade LED floodlights rated to 2500 lux. Every surface is maintained daily. You'll always arrive to a pitch that's ready.",
    checks: ["FIFA-certified turf & grass", "2500 lux LED floodlights", "Daily maintenance & inspection"],
  },
  {
    number: "03",
    title: "Seamless Digital Booking",
    body: "Book any field or court in under 60 seconds. Real-time availability, saved payment methods, automated reminders, and one-click cancellation. No phone calls, no waiting lists.",
    checks: ["Real-time availability", "Stripe secure payments", "Automated SMS & email reminders"],
  },
];

export function WhyDribbleSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-32 bg-muted overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeUp className="max-w-xl mb-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Why Dribble</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-tight">
            Built for Players Who Take Their Game Seriously
          </h2>
        </FadeUp>

        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden lg:block">
            <motion.div className="absolute top-0 left-0 w-full bg-primary" style={{ height: lineHeight }} />
          </div>

          <div className="space-y-24 lg:pl-24">
            {features.map((f, i) => (
              <motion.div
                key={f.number}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className="grid lg:grid-cols-2 gap-12 items-start"
              >
                <div>
                  <span className="font-display text-[5rem] leading-none text-border">{f.number}</span>
                  <h3 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-tight mt-2 mb-4">
                    {f.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
                <div className="bg-background border border-border p-8 space-y-4">
                  {f.checks.map((check) => (
                    <div key={check} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-semibold">{check}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
