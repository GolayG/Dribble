import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp, StaggerContainer, staggerItem } from "@/components/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { coaches } from "@/lib/data/coaches";
import { Star, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn the story behind Dribble Soccer Complex.",
};

const timeline = [
  { year: "2016", title: "Founded", body: "Dribble Soccer Complex opens its doors with 3 fields and a mission: make world-class soccer accessible to everyone in the community." },
  { year: "2018", title: "Expanded to 8 Fields", body: "Added 5 more pitches including our first indoor arena, meeting overwhelming demand from youth leagues and corporate clients." },
  { year: "2020", title: "Pickleball Arrives", body: "We saw the wave coming. Converted two outdoor courts to regulation pickleball and launched our first clinic series." },
  { year: "2022", title: "1,000 Teams Milestone", body: "Celebrated our 1,000th registered team. The community we'd built was real — and growing faster than ever." },
  { year: "2024", title: "Elite Training Center", body: "Opened a dedicated training facility with video analysis, agility equipment, and our world-class coaching staff." },
  { year: "2026", title: "Today", body: "12+ fields & courts, 50,000+ players served, and a waiting list for every league. We're just getting started." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        {/* Hero */}
        <section className="py-24 bg-secondary text-secondary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <Badge variant="primary" className="mb-4">Our Story</Badge>
              <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-tight">
                Built by Players,<br />for Players.
              </h1>
              <p className="text-secondary-foreground/60 mt-6 text-lg leading-relaxed">
                Dribble started as a dream to give our city a sports home worthy of the talent already here. Ten years in, we&apos;ve become the region&apos;s most trusted facility — and we&apos;re still just getting started.
              </p>
            </FadeUp>
            <FadeUp delay={0.15} className="grid grid-cols-2 gap-4">
              {[
                { label: "Founded", value: "2016" },
                { label: "Fields & Courts", value: "12+" },
                { label: "Players Served", value: "50K+" },
                { label: "Coaching Staff", value: "18" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 p-6">
                  <p className="font-display text-4xl text-primary">{s.value}</p>
                  <p className="text-secondary-foreground/50 text-sm uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </FadeUp>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <FadeUp className="mb-16 text-center">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">Our Journey</h2>
            </FadeUp>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <FadeUp key={item.year} delay={i * 0.07}>
                    <div className={`flex gap-8 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                        <span className="font-display text-5xl text-border">{item.year}</span>
                        <h3 className="font-bold text-xl mt-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{item.body}</p>
                      </div>
                      <div className="relative z-10 w-4 h-4 rounded-full bg-primary border-4 border-background mt-4 flex-shrink-0 hidden md:block" />
                      <div className="flex-1 hidden md:block" />
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-muted">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp className="mb-12">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">The Coaching Team</h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coaches.map((c) => (
                <FadeUp key={c.id}>
                  <div className="bg-background border border-border p-6 group hover:border-primary transition-colors">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display text-3xl mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <h3 className="font-bold">{c.name}</h3>
                    <p className="text-sm text-primary font-semibold mb-2">{c.title}</p>
                    <p className="text-xs text-muted-foreground mb-3">{c.experience} years experience</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 text-primary fill-primary" /> {c.rating}
                      <span>·</span>
                      <Users className="h-3 w-3" /> {c.sessions}+ sessions
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
