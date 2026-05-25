"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight, ChevronLeft, CheckCircle2, CalendarDays, User, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type TrainingProgram } from "@/lib/data/training-programs";
import { formatCurrency } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const STEPS = ["Date & Time", "Your Details", "Confirm"];
const EASE = [0.22, 1, 0.36, 1] as const;

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00",
];

function fmt12(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

interface TrainingProgramsSectionProps {
  programs: TrainingProgram[];
}

export function TrainingProgramsSection({ programs }: TrainingProgramsSectionProps) {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function openBooking(program: TrainingProgram) {
    setSelectedProgram(program);
    setStep(0);
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setEmail("");
    setPhone("");
    setConfirmed(false);
    setSubmitError(null);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  function closeBooking() {
    setSelectedProgram(null);
    setConfirmed(false);
  }

  async function handleConfirm() {
    if (!selectedProgram || !selectedDate || !selectedTime) return;
    setSubmitting(true);
    setSubmitError(null);

    const customerId = crypto.randomUUID();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: customerError } = await (supabase as any)
      .from("customers")
      .insert({ id: customerId, name, email, phone: phone || null });

    if (customerError) {
      setSubmitError("Could not save your details. Please try again.");
      setSubmitting(false);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: enrollmentError } = await (supabase as any)
      .from("training_enrollments")
      .insert({
        id: crypto.randomUUID(),
        program_id: selectedProgram.id,
        customer_id: customerId,
        scheduled_date: selectedDate,
        start_time: selectedTime,
        status: "confirmed",
        total_price: selectedProgram.price,
      });

    if (enrollmentError) {
      setSubmitError("Could not save your enrollment. Please try again.");
      setSubmitting(false);
      return;
    }

    setConfirmed(true);
    setSubmitting(false);
  }

  const canNext = [
    !!selectedDate && !!selectedTime,
    !!name.trim() && !!email.trim(),
    true,
  ][step];

  return (
    <div>
      {/* Program grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className={cn(
              "border-2 transition-colors group p-7",
              selectedProgram?.id === program.id
                ? "border-primary"
                : "border-border hover:border-primary/50"
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                {program.name}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {program.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" /> {program.duration}
                </span>
                <span className="font-display text-2xl text-primary">
                  {formatCurrency(program.price)}
                </span>
              </div>
              <Button
                variant={selectedProgram?.id === program.id ? "secondary" : "primary"}
                size="md"
                onClick={() => openBooking(program)}
              >
                {selectedProgram?.id === program.id ? "Selected ✓" : "Book Now"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Inline booking form */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-12 border border-border p-8 bg-background"
          >
            {confirmed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10 gap-5"
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
                <h2 className="font-display text-4xl">Enrollment Confirmed!</h2>
                <p className="text-muted-foreground max-w-md">
                  Thanks, {name}! Your spot in <strong>{selectedProgram.name}</strong> is confirmed. A confirmation is on its way to {email}.
                </p>
                <div className="bg-muted border border-border p-5 text-left w-full max-w-sm space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Program</span><span className="font-semibold">{selectedProgram.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold">{new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-semibold">{fmt12(selectedTime)}</span></div>
                  <div className="flex justify-between font-bold border-t border-border pt-2"><span>Total</span><span className="text-primary">{formatCurrency(selectedProgram.price)}</span></div>
                </div>
                <Button variant="primary" size="lg" onClick={closeBooking}>Book Another Session</Button>
              </motion.div>
            ) : (
              <>
                {/* Form header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                  <div>
                    <Badge variant="primary" className="mb-2">Booking</Badge>
                    <h2 className="font-display text-3xl">{selectedProgram.name}</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      <Clock className="inline h-3.5 w-3.5 mr-1" />
                      {selectedProgram.duration} · {formatCurrency(selectedProgram.price)}
                    </p>
                  </div>
                  <button onClick={closeBooking} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Step progress */}
                <div className="flex items-center gap-0 mb-8">
                  {STEPS.map((s, i) => (
                    <div key={s} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                          i < step ? "bg-primary border-primary text-white"
                            : i === step ? "border-primary text-primary bg-background"
                            : "border-border text-muted-foreground"
                        )}>
                          {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                        </div>
                        <span className={cn("text-xs mt-1 font-semibold hidden sm:block", i === step ? "text-primary" : "text-muted-foreground")}>
                          {s}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="flex-1 h-px mx-2 relative">
                          <div className="absolute inset-0 bg-border" />
                          <motion.div className="absolute inset-0 bg-primary origin-left" animate={{ scaleX: i < step ? 1 : 0 }} transition={{ duration: 0.4 }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {step === 0 && (
                      <div className="grid lg:grid-cols-2 gap-10">
                        <div>
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <CalendarDays className="h-5 w-5 text-primary" /> Pick a Date
                          </h3>
                          <div className="border border-border p-4">
                            <input
                              type="date"
                              value={selectedDate}
                              min={new Date().toISOString().split("T")[0]}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              className="w-full px-3 py-3 border border-border text-foreground bg-background focus:outline-none focus:border-primary text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" /> Pick a Start Time
                          </h3>
                          <p className="text-xs text-muted-foreground mb-4">Session duration: {selectedProgram.duration}</p>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {TIME_SLOTS.map((slot) => (
                              <motion.button
                                key={slot}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedTime(slot)}
                                className={cn(
                                  "px-3 py-2 text-sm font-semibold border-2 transition-all",
                                  selectedTime === slot
                                    ? "bg-primary text-white border-primary"
                                    : "border-border hover:border-primary text-foreground"
                                )}
                              >
                                {fmt12(slot)}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="max-w-md">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" /> Your Details
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-1">Full Name <span className="text-primary">*</span></label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith"
                              className="w-full px-3 py-3 border border-border text-foreground bg-background focus:outline-none focus:border-primary text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-1">Email <span className="text-primary">*</span></label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com"
                              className="w-full px-3 py-3 border border-border text-foreground bg-background focus:outline-none focus:border-primary text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-1">Phone <span className="text-muted-foreground text-xs font-normal">(optional)</span></label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567"
                              className="w-full px-3 py-3 border border-border text-foreground bg-background focus:outline-none focus:border-primary text-sm" />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="max-w-lg">
                        <h3 className="font-bold text-lg mb-6">Enrollment Summary</h3>
                        <div className="border border-border divide-y divide-border text-sm">
                          <div className="p-4 flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-semibold">{name}</span></div>
                          <div className="p-4 flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-semibold">{email}</span></div>
                          {phone && <div className="p-4 flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-semibold">{phone}</span></div>}
                          <div className="p-4 flex justify-between"><span className="text-muted-foreground">Program</span><span className="font-semibold">{selectedProgram.name}</span></div>
                          <div className="p-4 flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-semibold">{selectedProgram.duration}</span></div>
                          <div className="p-4 flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold">{new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span></div>
                          <div className="p-4 flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-semibold">{fmt12(selectedTime)}</span></div>
                          <div className="p-4 flex justify-between font-bold text-base"><span>Total</span><span className="text-primary">{formatCurrency(selectedProgram.price)}</span></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">By confirming, you agree to our booking terms.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                {submitError && (
                  <p className="mt-6 text-sm text-red-600 border border-red-200 bg-red-50 px-4 py-3">{submitError}</p>
                )}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button variant="ghost" size="md" onClick={() => setStep((s) => s - 1)} disabled={step === 0 || submitting} className="gap-1">
                    <ChevronLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button variant="primary" size="lg"
                    onClick={() => step < STEPS.length - 1 ? setStep((s) => s + 1) : handleConfirm()}
                    disabled={!canNext || submitting} className="gap-1"
                  >
                    {submitting ? "Saving..." : step === STEPS.length - 1 ? "Confirm Enrollment" : "Continue"}
                    {!submitting && <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
