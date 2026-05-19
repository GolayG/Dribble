import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp, StaggerContainer } from "@/components/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leagues & Tournaments",
  description: "Join soccer and pickleball leagues at Dribble Soccer Complex.",
};

const leagues = [
  { name: "Adult Soccer League — Spring 2026", sport: "Soccer", format: "11v11", teams: 12, remaining: 3, day: "Saturdays", price: "$850/team", status: "Enrolling" },
  { name: "Co-Ed 7v7 League", sport: "Soccer", format: "7v7", teams: 16, remaining: 6, day: "Sundays", price: "$550/team", status: "Enrolling" },
  { name: "5-a-Side Indoor League", sport: "Soccer", format: "5v5", teams: 20, remaining: 0, day: "Weeknights", price: "$350/team", status: "Full" },
  { name: "Pickleball Mixed Doubles League", sport: "Pickleball", format: "Doubles", teams: 24, remaining: 8, day: "Thursdays", price: "$80/pair", status: "Enrolling" },
  { name: "Pickleball Singles League", sport: "Pickleball", format: "Singles", teams: 16, remaining: 4, day: "Tuesdays", price: "$45/person", status: "Enrolling" },
];

const standings = [
  { pos: 1, team: "FC Dribble Elite", w: 8, d: 1, l: 0, gd: "+22", pts: 25 },
  { pos: 2, team: "Red Devils SC", w: 6, d: 2, l: 1, gd: "+14", pts: 20 },
  { pos: 3, team: "City United", w: 5, d: 3, l: 1, gd: "+9", pts: 18 },
  { pos: 4, team: "Riverside FC", w: 4, d: 2, l: 3, gd: "+2", pts: 14 },
  { pos: 5, team: "Athletic Club", w: 3, d: 2, l: 4, gd: "-3", pts: 11 },
  { pos: 6, team: "Sunday Strikers", w: 2, d: 1, l: 6, gd: "-15", pts: 7 },
];

export default function LeaguesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <section className="bg-secondary text-secondary-foreground py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp>
              <Badge variant="primary" className="mb-4">Leagues & Tournaments</Badge>
              <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-tight">
                Compete. Win. Repeat.
              </h1>
              <p className="text-secondary-foreground/60 mt-4 text-xl max-w-2xl">
                Organized leagues for soccer and pickleball players at every competitive level.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-primary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/20">
              {[
                { icon: Trophy, value: "5", label: "Active Leagues" },
                { icon: Users, value: "200+", label: "Registered Teams" },
                { icon: Calendar, value: "52", label: "Game Days/Year" },
                { icon: TrendingUp, value: "$15k+", label: "Prizes Awarded" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-primary p-8 text-white">
                  <Icon className="h-6 w-6 mb-3 text-white/60" />
                  <p className="font-display text-4xl">{value}</p>
                  <p className="text-white/60 text-sm mt-1 font-semibold uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leagues table */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp className="mb-10">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">Open Enrollment</h2>
            </FadeUp>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">League</th>
                    <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">Sport</th>
                    <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">Format</th>
                    <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">Day</th>
                    <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">Spots Left</th>
                    <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">Price</th>
                    <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">Status</th>
                    <th className="p-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leagues.map((l) => (
                    <tr key={l.name} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-semibold">{l.name}</td>
                      <td className="p-4"><Badge variant={l.sport === "Soccer" ? "primary" : "default"}>{l.sport}</Badge></td>
                      <td className="p-4 text-muted-foreground">{l.format}</td>
                      <td className="p-4 text-muted-foreground">{l.day}</td>
                      <td className="p-4">
                        <span className={l.remaining === 0 ? "text-red-500 font-bold" : l.remaining <= 3 ? "text-orange-500 font-bold" : "text-foreground"}>
                          {l.remaining === 0 ? "Full" : `${l.remaining} spots`}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-primary">{l.price}</td>
                      <td className="p-4">
                        <Badge variant={l.status === "Full" ? "warning" : "success"}>{l.status}</Badge>
                      </td>
                      <td className="p-4">
                        {l.status !== "Full" && (
                          <Link href="/contact">
                            <Button variant="primary" size="sm">Register</Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Standings */}
        <section className="py-20 bg-muted">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp className="mb-10">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">Current Standings</h2>
              <p className="text-muted-foreground mt-2">Adult Soccer League — Spring 2026</p>
            </FadeUp>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border text-sm bg-background">
                <thead>
                  <tr className="bg-muted">
                    {["#", "Team", "W", "D", "L", "GD", "Pts"].map((h) => (
                      <th key={h} className="p-4 text-left font-bold uppercase tracking-wider text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {standings.map((s) => (
                    <tr key={s.team} className={s.pos === 1 ? "bg-primary/5" : "hover:bg-muted/50"}>
                      <td className="p-4 font-bold text-muted-foreground">{s.pos}</td>
                      <td className="p-4 font-bold">{s.pos === 1 && <Trophy className="inline h-4 w-4 text-primary mr-2" />}{s.team}</td>
                      <td className="p-4 text-green-600 font-semibold">{s.w}</td>
                      <td className="p-4 text-muted-foreground">{s.d}</td>
                      <td className="p-4 text-red-500 font-semibold">{s.l}</td>
                      <td className="p-4 font-semibold">{s.gd}</td>
                      <td className="p-4 font-bold text-primary text-base">{s.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
