import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { mapFieldRow } from "@/lib/data/fields";
import { createServerClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pickleball Courts",
  description: "Book pickleball courts and join leagues at Dribble Soccer Complex.",
};

const schedule = [
  { day: "Monday", slots: ["7:00 AM – 9:00 AM (Open Play)", "12:00 PM – 2:00 PM (Open Play)", "6:00 PM – 9:00 PM (League)"] },
  { day: "Tuesday", slots: ["6:00 AM – 8:00 AM (Early Bird)", "5:00 PM – 8:00 PM (Open Play)"] },
  { day: "Wednesday", slots: ["12:00 PM – 2:00 PM (Open Play)", "6:00 PM – 9:00 PM (Beginner Clinic)"] },
  { day: "Thursday", slots: ["6:00 AM – 8:00 AM (Early Bird)", "5:00 PM – 8:00 PM (Open Play)"] },
  { day: "Friday", slots: ["7:00 AM – 10:00 AM (Open Play)", "6:00 PM – 9:00 PM (League)"] },
  { day: "Saturday", slots: ["8:00 AM – 12:00 PM (Tournament)", "2:00 PM – 6:00 PM (Open Play)"] },
  { day: "Sunday", slots: ["9:00 AM – 1:00 PM (Open Play)", "3:00 PM – 6:00 PM (Family Play)"] },
];

const benefits = [
  "6 regulation-size courts",
  "Indoor & outdoor options",
  "Paddle & ball rentals available",
  "Weekly clinics for all levels",
  "Competitive leagues (all ratings)",
  "Ball machines for solo drilling",
  "Open play — no reservation needed",
  "Tournament hosting capabilities",
];

export default async function PickleballPage() {
  const db = createServerClient();
  const { data } = await db.from("fields").select("*").eq("field_type", "Pickleball");
  const pickleballCourts = (data ?? []).map(mapFieldRow);

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        {/* Hero */}
        <section className="bg-primary text-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp>
              <Badge className="bg-white/20 text-white border-0 mb-4">Pickleball</Badge>
              <h1 className="font-display text-[clamp(3rem,7vw,7rem)] leading-tight">
                The Fastest-Growing<br />Sport in America.
              </h1>
              <p className="text-white/70 mt-4 text-xl max-w-2xl">
                Whether you&apos;re brand new or a seasoned competitor, our courts and programs are built for you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#book-a-court">
                  <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-white/90 border-0">
                    Reserve a Court
                  </Button>
                </a>
                <a href="#schedule">
                  <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary">
                    View Schedule
                  </Button>
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Courts */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp className="mb-12">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">Our Courts</h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pickleballCourts.map((court) => (
                <div key={court.id} className="border border-border p-6 hover:border-primary transition-colors">
                  <div className="h-32 bg-muted mb-4 flex items-center justify-center text-4xl">🏓</div>
                  <Badge variant={court.available ? "success" : "default"} className="mb-3">
                    {court.available ? "Available" : "In Use"}
                  </Badge>
                  <h3 className="font-bold text-lg mb-1">{court.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{court.surface}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="font-display text-2xl text-primary">{formatCurrency(court.pricePerHour)}<span className="text-sm font-sans text-muted-foreground">/hr</span></span>
                    <a href="#book-a-court">
                      <Button variant="primary" size="sm">Book Now</Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits + Schedule side by side */}
        <section id="schedule" className="py-20 bg-muted">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
            <FadeUp>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-8">Everything Included</h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm font-semibold">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-8">Weekly Schedule</h2>
              <div className="space-y-4">
                {schedule.map((s) => (
                  <div key={s.day} className="bg-background border border-border p-4">
                    <p className="font-bold text-sm uppercase tracking-wider mb-2">{s.day}</p>
                    <ul className="space-y-1">
                      {s.slots.map((slot) => (
                        <li key={slot} className="text-sm text-muted-foreground">• {slot}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
        {/* Booking */}
        <section id="book-a-court" className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp className="mb-10 border-b border-border pb-8">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">Book a Court</h2>
              <p className="text-muted-foreground mt-2 text-lg max-w-xl">
                Pick your court, choose a date & time, and confirm in minutes.
              </p>
            </FadeUp>
            <BookingFlow onlyType="Pickleball" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
