import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp, StaggerContainer, staggerItem } from "@/components/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { upcomingEvents, formatEventDate } from "@/lib/data/events";
import { formatCurrency } from "@/lib/utils";
import { Calendar, Clock, Users, Gift, Building2, Tent } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events & Parties",
  description: "Host events, tournaments, and birthday parties at Dribble Soccer Complex.",
};

const packages = [
  {
    icon: Gift,
    title: "Birthday Party",
    description: "2-hour field rental, setup & teardown, dedicated event host, custom team photos. Perfect for ages 6–16.",
    price: "From $299",
    includes: ["2hr exclusive field use", "Party setup & teardown", "Event host", "10 players included"],
  },
  {
    icon: Building2,
    title: "Corporate Event",
    description: "Team-building soccer & pickleball experience for 20–100 employees. Catering and branded kit available.",
    price: "From $899",
    includes: ["Up to 3 fields", "Custom branding", "Catering options", "Trophy ceremony"],
  },
  {
    icon: Tent,
    title: "Soccer Camp",
    description: "Week-long or weekend camps for youth players. Structured curriculum, certified coaches, and tons of fun.",
    price: "From $149",
    includes: ["5-day or weekend format", "3 certified coaches", "Skill assessments", "Camp kit included"],
  },
];

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        {/* Hero */}
        <section className="bg-primary text-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp>
              <Badge className="bg-white/20 text-white border-0 mb-4">Events & Parties</Badge>
              <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-tight">
                Make It an<br />Unforgettable Day.
              </h1>
              <p className="text-white/70 mt-4 text-xl max-w-2xl">
                Birthday parties, corporate team-building, summer camps, and tournaments — all handled end-to-end by our events team.
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button size="xl" className="bg-white text-primary hover:bg-white/90 border-0">
                    Inquire About an Event →
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp className="mb-12">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">Event Packages</h2>
            </FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.title} className="border border-border hover:border-primary transition-colors p-8 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                    <pkg.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pkg.description}</p>
                  <ul className="space-y-2 mb-8">
                    {pkg.includes.map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-bold text-primary text-xl">{pkg.price}</span>
                    <Link href="/contact">
                      <Button variant="primary" size="sm">Book Now</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming events */}
        <section className="py-20 bg-muted">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp className="mb-10">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">Upcoming Events</h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="bg-background border border-border p-6 hover:border-primary transition-colors">
                  <Badge variant={evt.tag === "Soccer" ? "primary" : "default"} className="mb-3">{evt.tag}</Badge>
                  <h3 className="font-bold text-lg mb-2">{evt.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{evt.description}</p>
                  <div className="flex items-center gap-5 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatEventDate(evt.date)}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {evt.time}</span>
                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {evt.spotsLeft} spots</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-xl">
                      {evt.price === null ? "Free" : formatCurrency(evt.price)}
                    </span>
                    <Button variant="primary" size="sm">Register</Button>
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
