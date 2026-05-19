"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { WaveBackground } from "@/components/WaveBackground";
import { Button } from "@/components/ui/button";
import { SITE_DESCRIPTION } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const WORDS = "WHERE THE GAME BEGINS.".split(" ");


export function HeroSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      <WaveBackground strokeColor="#e63946" opacity={0.18} />

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

      <div className="relative z-20 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── LEFT: logo + animation ───────────────────────────────── */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex justify-center lg:justify-start"
            >
              <motion.div
                animate={shouldReduce ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full"
                style={{ maxWidth: 620 }}
              >
                {/* ── 1. Original logo PNG — exact final state, always visible ── */}
                <Image
                  src="/logo.png"
                  alt="Dribble Soccer Complex"
                  width={700}
                  height={268}
                  priority
                  className="w-full h-auto"
                />

                {!shouldReduce && (
                  <>
                    {/* Animation overlay — fades out at t=2.3s to reveal the original PNG */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ delay: 2.3, duration: 0.45 }}
                    >
                      {/* White circle covers the static ball in the base PNG */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 700 268"
                        aria-hidden
                      >
                        <circle cx="175" cy="134" r="115" fill="white" />
                      </svg>

                      {/* Ball rolls in from the left.
                          Outer div: clips to ball circle + translates left→right.
                          Inner div: rotates the logo around the ball centre (25% 50%)
                          so the ball spins clockwise as it travels — rolling physics. */}
                      <motion.div
                        className="absolute inset-0"
                        style={{ clipPath: "circle(20.5% at 25% 50%)" }}
                        initial={{ x: -430 }}
                        animate={{ x: 0 }}
                        transition={{
                          duration: 1.5,
                          ease: [0.08, 0.88, 0.32, 1] as [number, number, number, number],
                          delay: 0.45,
                        }}
                      >
                        <motion.div
                          initial={{ rotate: -220 }}
                          animate={{ rotate: 0 }}
                          transition={{
                            duration: 1.5,
                            ease: [0.08, 0.88, 0.32, 1] as [number, number, number, number],
                            delay: 0.45,
                          }}
                          style={{ transformOrigin: "25% 50%" }}
                        >
                          <Image
                            src="/logo.png"
                            width={700}
                            height={268}
                            alt=""
                            aria-hidden
                            className="w-full h-auto"
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>

                  </>
                )}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Headline + CTAs ───────────────────────────────── */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
                className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-muted border border-border text-sm font-semibold text-muted-foreground"
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                12 fields available right now
              </motion.div>

              <h1 className="font-display text-[clamp(4rem,10vw,8.5rem)] leading-[0.88] tracking-tight mb-6 text-balance">
                {WORDS.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block mr-[0.15em]">
                    <motion.span
                      className={`inline-block ${word === "GAME" ? "text-primary" : "text-foreground"}`}
                      initial={shouldReduce ? {} : { y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: EASE }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6, ease: EASE }}
                className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                {SITE_DESCRIPTION}
              </motion.p>

              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease: EASE }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/booking">
                  <Button variant="primary" size="xl" className="w-full sm:w-auto">
                    Book a Field
                    <motion.span
                      className="ml-1"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </Button>
                </Link>
                <Link href="/training">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Reserve Training
                  </Button>
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      <motion.div
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="relative z-20 flex flex-col items-center gap-1 pb-8 text-muted-foreground"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
