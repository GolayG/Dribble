import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { coaches } from "@/lib/data/coaches";
import { Star, Users, Award } from "lucide-react";
import { TrainingBookingFlow } from "@/components/booking/TrainingBookingFlow";

export const metadata: Metadata = {
  title: "Training & Coaching",
  description: "Work with certified coaches at Dribble Soccer Complex.",
};

export default function TrainingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp>
              <Badge variant="primary" className="mb-4">Training & Reservations</Badge>
              <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-secondary-foreground leading-tight">
                Train Like a Pro.
              </h1>
              <p className="text-secondary-foreground/60 mt-4 text-xl max-w-2xl">
                Our certified coaches work with players at every level — from first-timers to aspiring professionals.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Booking flow */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 border-b border-border pb-8">
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)]">Book a Training Session</h1>
              <p className="text-muted-foreground mt-2 text-lg max-w-xl">
                Pick your program, choose a date and time, and confirm — all in a few steps.
              </p>
            </div>
            <TrainingBookingFlow />
          </div>
        </section>

        {/* Coaches */}
        <section className="py-20 bg-muted">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp className="mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Meet the staff</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">World-Class Coaching Team</h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coaches.map((c) => (
                <div key={c.id} className="bg-background border border-border p-6 group hover:border-primary transition-colors">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display text-2xl mb-4">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-bold text-lg">{c.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{c.title}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{c.bio}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-4">
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-primary fill-primary" /> {c.rating}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {c.sessions}+ sessions</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {c.certifications.slice(0, 2).map((cert) => (
                      <span key={cert} className="text-[10px] bg-muted border border-border px-2 py-0.5 flex items-center gap-1">
                        <Award className="h-2.5 w-2.5 text-primary" /> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
