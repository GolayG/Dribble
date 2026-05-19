"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/MotionWrapper";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-primary">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <FadeUp>
          <Mail className="h-10 w-10 text-white/60 mx-auto mb-4" />
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-tight">
            Stay in the Game
          </h2>
          <p className="text-white/70 mt-4 text-lg">
            Field alerts, new programs, tournament signups, and exclusive member offers — straight to your inbox.
          </p>
        </FadeUp>

        <FadeUp delay={0.15} className="mt-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle2 className="h-14 w-14" />
                </motion.div>
                <p className="text-xl font-bold">You&apos;re in!</p>
                <p className="text-white/70">Welcome to the Dribble community.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-4 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors text-sm"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  loading={loading}
                  className="bg-white text-primary hover:bg-white/90 border-0"
                >
                  Subscribe
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
          <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </FadeUp>
      </div>
    </section>
  );
}
