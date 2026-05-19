"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { upcomingEvents, formatEventDate } from "@/lib/data/events";
import { formatCurrency } from "@/lib/utils";
import { FadeUp, StaggerContainer, staggerItem } from "@/components/MotionWrapper";

export function EventsSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">On the calendar</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)]">Upcoming Events</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link href="/events">
              <Button variant="outline" size="md">
                View all events <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </FadeUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((evt) => {
            const urgency = evt.spotsLeft / evt.spots;
            return (
              <motion.div
                key={evt.id}
                variants={staggerItem}
                className="bg-background border border-border hover:border-primary group transition-colors cursor-pointer"
              >
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge
                        variant={evt.tag === "Soccer" ? "primary" : "default"}
                        className="mb-3"
                      >
                        {evt.tag}
                      </Badge>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {evt.title}
                      </h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {evt.price === null ? (
                        <span className="font-bold text-green-600 text-lg">Free</span>
                      ) : (
                        <span className="font-bold text-foreground text-lg">{formatCurrency(evt.price)}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{evt.description}</p>

                  <div className="flex items-center gap-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatEventDate(evt.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {evt.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span
                        className={
                          urgency < 0.25
                            ? "text-red-500 font-semibold"
                            : urgency < 0.5
                            ? "text-orange-500 font-semibold"
                            : "text-muted-foreground"
                        }
                      >
                        {evt.spotsLeft} spots left
                      </span>
                    </div>
                    <Link href={`/events`}>
                      <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Register <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
