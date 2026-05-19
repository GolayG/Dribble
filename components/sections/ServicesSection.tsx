"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wind, Trophy, Dumbbell, Calendar, Users, Sparkles } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { StaggerContainer, staggerItem } from "@/components/MotionWrapper";
import { FadeUp } from "@/components/MotionWrapper";

const services = [
  {
    icon: Wind,
    title: "Field Booking",
    description: "Full-size grass pitches, artificial turf, and mini 5-a-side — book by the hour with real-time availability.",
    href: "/booking",
    accent: "text-primary",
  },
  {
    icon: Trophy,
    title: "Pickleball Courts",
    description: "Six regulation courts — indoor and outdoor. Open play, clinics, and competitive leagues for all levels.",
    href: "/pickleball",
    accent: "text-primary",
  },
  {
    icon: Dumbbell,
    title: "Training Programs",
    description: "Work with certified coaches. Youth development, goalkeeper camps, fitness & conditioning.",
    href: "/training",
    accent: "text-primary",
  },
  {
    icon: Calendar,
    title: "Leagues & Tournaments",
    description: "Adult and youth leagues, weekend tournaments, and a custom bracket system to track standings.",
    href: "/leagues",
    accent: "text-primary",
  },
  {
    icon: Users,
    title: "Events & Parties",
    description: "Birthday parties, corporate team-building, and summer camps — we handle everything end-to-end.",
    href: "/events",
    accent: "text-primary",
  },
  {
    icon: Sparkles,
    title: "Memberships",
    description: "Season passes, monthly memberships, and gift cards. Save more the more you play.",
    href: "/booking",
    accent: "text-primary",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeUp className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">What we offer</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-foreground leading-tight">
            Everything You Need to Play
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            One facility, every sport, all the gear — just show up and play.
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              className="bg-background"
            >
              <Link href={service.href} className="block group h-full">
                <Card hover className="h-full border-0 rounded-none">
                  <CardBody className="p-8 flex flex-col gap-4 h-full">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-bold text-primary group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
