import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { createServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Book a Field",
  description: "Reserve soccer fields at Dribble Soccer Complex.",
};

export default async function BookingPage() {
  const db = createServerClient();
  const { count } = await db
    .from("fields")
    .select("*", { count: "exact", head: true })
    .neq("field_type", "Pickleball");
  const availableCount = count ?? 0;

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10 border-b border-border pb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-muted-foreground">
                {availableCount} fields available now
              </span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)]">Book a Field</h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-xl">
              Select your field, pick a date & time, add extras, and confirm — all in under 60 seconds.
            </p>
          </div>

          <BookingFlow excludeType="Pickleball" />
        </div>
      </main>
      <Footer />
    </>
  );
}
