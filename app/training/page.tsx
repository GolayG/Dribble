import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp, StaggerContainer, staggerItem } from "@/components/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { coaches } from "@/lib/data/coaches";
import { Star, Clock, Users, Award } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Training & Coaching",
  description: "Work with certified coaches at Dribble Soccer Complex.",
};

const programs = [
  { title: "1-on-1 Private Session", duration: "60 min", price: "$85", tag: "Most Popular", description: "Personalized coaching focused on your individual game — technical skills, tactical awareness, or goalkeeping." },
  { title: "Small Group Training", duration: "75 min", price: "$35/player", tag: "", description: "Groups of 4–8 players. Great for friends or teammates looking to train together under expert guidance." },
  { title: "Youth Development Camp", duration: "5 days", price: "$299", tag: "Ages 7–14", description: "Week-long intensive camp covering ball control, passing, shooting, and game IQ." },
  { title: "Goalkeeper Clinic", duration: "90 min", price: "$65", tag: "", description: "Specialized shot-stopping, distribution, and mental focus sessions with former professional goalkeeper Isabella Santos." },
  { title: "Fitness & Conditioning", duration: "60 min", price: "$55", tag: "Physical", description: "Sport-specific strength, speed, and agility training designed to make you a better athlete on the pitch." },
  { title: "Team Tactical Session", duration: "2 hours", price: "$250/team", tag: "Teams", description: "Full-team session analyzing and drilling tactical patterns, set pieces, and defensive shape." },
];

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

        {/* Programs */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp className="mb-12">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">Training Programs</h2>
            </FadeUp>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p) => (
                <div key={p.title} className="border border-border p-7 hover:border-primary transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{p.title}</h3>
                    {p.tag && <Badge variant="primary">{p.tag}</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{p.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" /> {p.duration}
                    </span>
                    <span className="font-bold text-primary text-lg">{p.price}</span>
                  </div>
                </div>
              ))}
            </StaggerContainer>
            <FadeUp delay={0.3} className="mt-10 text-center">
              <Link href="/booking">
                <Button variant="primary" size="xl">Reserve a Session</Button>
              </Link>
            </FadeUp>
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
