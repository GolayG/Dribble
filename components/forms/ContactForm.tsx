"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SUBJECTS = ["General Inquiry", "Field Booking", "Private Event", "League Registration", "Training Program", "Partnership"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center py-12 gap-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-primary rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="font-bold text-xl">Message Sent!</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Thanks for reaching out. We&apos;ll get back to you within 2 hours during business hours.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
            className="text-sm text-primary font-semibold underline mt-2"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FloatingInput label="Full Name" name="name" value={form.name} onChange={handleChange} required />
            <FloatingInput label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FloatingInput label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={handleChange} />
            <div className="relative">
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-3 pt-5 pb-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none peer"
              >
                <option value="" disabled>Select subject</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <label className="absolute left-3 top-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground pointer-events-none">
                Subject
              </label>
            </div>
          </div>
          <div className="relative">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder=" "
              className="w-full px-3 pt-5 pb-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none peer"
            />
            <label className="absolute left-3 top-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground pointer-events-none">
              Message
            </label>
          </div>
          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            Send Message
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function FloatingInput({
  label, name, type = "text", value, onChange, required,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type={type} name={name} value={value} onChange={onChange}
        required={required} placeholder=" "
        className="w-full px-3 pt-5 pb-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors peer"
      />
      <label className="absolute left-3 top-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground peer-focus:text-primary transition-colors pointer-events-none">
        {label}
      </label>
    </div>
  );
}
