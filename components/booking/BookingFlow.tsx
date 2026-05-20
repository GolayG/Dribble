"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2, CalendarDays, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FieldCard } from "@/components/booking/FieldCard";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import { formatCurrency } from "@/lib/utils";
import type { Field } from "@/lib/data/fields";
import { mapFieldRow } from "@/lib/data/fields";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const STEPS = ["Choose Field", "Date & Time", "Your Details", "Confirm"];

function buildDateTime(date: Date, time: string): string {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

function addThirtyMin(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + 30;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [filter, setFilter] = useState<string>("All");
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldsLoading, setFieldsLoading] = useState(true);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("fields")
      .select("*")
      .then(({ data }) => {
        if (data) setFields(data.map(mapFieldRow));
        setFieldsLoading(false);
      });
  }, []);

  const filteredFields = fields.filter((f) =>
    filter === "All" ? true : f.type === filter
  );

  async function handleConfirm() {
    if (!selectedField || !selectedDate || selectedSlots.length === 0) return;
    setSubmitting(true);
    setSubmitError(null);

    const startTime = buildDateTime(selectedDate, selectedSlots[0]);
    const endTime = buildDateTime(selectedDate, addThirtyMin(selectedSlots[selectedSlots.length - 1]));
    const customerId = crypto.randomUUID();
    const bookingId = crypto.randomUUID();

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
    const { error: bookingError } = await (supabase as any)
      .from("bookings")
      .insert({
        id: bookingId,
        field_id: selectedField.id,
        customer_id: customerId,
        start_time: startTime,
        end_time: endTime,
        status: "confirmed",
        total_price: total,
      });

    if (bookingError) {
      setSubmitError("Could not save your booking. Please try again.");
      setSubmitting(false);
      return;
    }

    setConfirmed(true);
    setSubmitting(false);
  }

  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot].sort()
    );
  };

  const total = selectedField ? selectedField.pricePerHour * (selectedSlots.length * 0.5) : 0;

  const canNext = [
    !!selectedField,
    !!selectedDate && selectedSlots.length >= 2,
    !!name.trim() && !!email.trim(),
    true,
  ][step];

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-20 gap-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
          className="w-24 h-24 bg-primary rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="h-12 w-12 text-white" />
        </motion.div>
        <h2 className="font-display text-5xl">Booking Confirmed!</h2>
        <p className="text-muted-foreground max-w-md">
          Thanks, {name}! Your {selectedField?.name} booking is confirmed. A confirmation email is on its way to {email}.
        </p>
        <div className="bg-muted border border-border p-6 text-left w-full max-w-sm space-y-2">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Field</span><span className="font-semibold">{selectedField?.name}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Date</span><span className="font-semibold">{selectedDate?.toLocaleDateString()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Time</span><span className="font-semibold">{selectedSlots[0]} – {selectedSlots[selectedSlots.length - 1]}</span></div>
          <div className="flex justify-between text-sm font-bold border-t border-border pt-2 mt-2"><span>Total Paid</span><span className="text-primary">{formatCurrency(total)}</span></div>
        </div>
        <Button variant="primary" size="lg" onClick={() => { setStep(0); setConfirmed(false); setSelectedField(null); setSelectedSlots([]); setSelectedDate(null); setName(""); setEmail(""); setPhone(""); setSubmitError(null); }}>
          Book Another Field
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                    i < step
                      ? "bg-primary border-primary text-white"
                      : i === step
                      ? "border-primary text-primary bg-background"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={cn("text-xs mt-1 font-semibold hidden sm:block", i === step ? "text-primary" : "text-muted-foreground")}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-2 relative">
                  <div className="absolute inset-0 bg-border" />
                  <motion.div
                    className="absolute inset-0 bg-primary origin-left"
                    animate={{ scaleX: i < step ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {step === 0 && (
            <div>
              <div className="flex flex-wrap gap-2 mb-8">
                {["All", ...Array.from(new Set(fields.map((f) => f.type)))].map((t) => (
                  <motion.button
                    key={t}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(t)}
                    className={cn(
                      "px-4 py-2 text-sm font-bold border-2 uppercase tracking-wide transition-all",
                      filter === t ? "bg-primary text-white border-primary" : "border-border text-foreground hover:border-primary"
                    )}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
              {fieldsLoading ? (
                <p className="text-muted-foreground text-sm">Loading fields...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredFields.map((f) => (
                    <FieldCard key={f.id} field={f} selected={selectedField?.id === f.id} onSelect={setSelectedField} />
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" /> Pick a Date
                </h3>
                <div className="border border-border p-4">
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                    className="w-full px-3 py-3 border border-border text-foreground bg-background focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" /> Select Time Slots
                </h3>
                <p className="text-xs text-muted-foreground mb-4">Minimum 1 hour (2 slots). Office hours 9 AM – 9 PM.</p>
                <TimeSlotPicker selected={selectedSlots} onToggle={toggleSlot} date={selectedDate} />
                {selectedSlots.length === 1 && (
                  <p className="mt-3 text-xs text-orange-600 border border-orange-200 bg-orange-50 px-3 py-2">
                    Select at least one more slot — minimum booking is 1 hour.
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-md">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Your Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Full Name <span className="text-primary">*</span></label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full px-3 py-3 border border-border text-foreground bg-background focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Email <span className="text-primary">*</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-3 py-3 border border-border text-foreground bg-background focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Phone <span className="text-muted-foreground text-xs font-normal">(optional)</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-3 border border-border text-foreground bg-background focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-lg">
              <h3 className="font-bold text-lg mb-6">Booking Summary</h3>
              <div className="border border-border divide-y divide-border">
                <div className="p-4 flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-semibold">{name}</span></div>
                <div className="p-4 flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-semibold">{email}</span></div>
                {phone && <div className="p-4 flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-semibold">{phone}</span></div>}
                <div className="p-4 flex justify-between"><span className="text-muted-foreground">Field</span><span className="font-semibold">{selectedField?.name}</span></div>
                <div className="p-4 flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold">{selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span></div>
                <div className="p-4 flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-semibold">{selectedSlots[0]} – {addThirtyMin(selectedSlots[selectedSlots.length - 1])} ({selectedSlots.length * 0.5}h)</span></div>
                <div className="p-4 flex justify-between font-bold text-lg"><span>Total</span><span className="text-primary">{formatCurrency(total)}</span></div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">By confirming, you agree to our booking terms. Payment processed securely via Stripe.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {submitError && (
        <p className="mt-6 text-sm text-red-600 border border-red-200 bg-red-50 px-4 py-3">{submitError}</p>
      )}
      <div className="flex justify-between mt-6 pt-6 border-t border-border">
        <Button
          variant="ghost"
          size="md"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0 || submitting}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => step < STEPS.length - 1 ? setStep((s) => s + 1) : handleConfirm()}
          disabled={!canNext || submitting}
          className="gap-1"
        >
          {submitting ? "Saving..." : step === STEPS.length - 1 ? "Confirm & Pay" : "Continue"}
          {!submitting && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
