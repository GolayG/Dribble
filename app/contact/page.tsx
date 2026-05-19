import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Dribble Soccer Complex.",
};

const hours = [
  { day: "Monday – Friday", hours: "6:00 AM – 11:00 PM" },
  { day: "Saturday", hours: "7:00 AM – 11:00 PM" },
  { day: "Sunday", hours: "8:00 AM – 10:00 PM" },
];

const faqs = [
  { q: "How far in advance can I book a field?", a: "You can book up to 60 days in advance. Members get 72-hour priority booking windows." },
  { q: "What's your cancellation policy?", a: "Free cancellation up to 24 hours before your booking. Within 24 hours, a 50% fee applies." },
  { q: "Do you offer equipment rentals?", a: "Yes — soccer balls, bibs, cones, and pickleball paddles & balls are all available to rent at the front desk." },
  { q: "Can I host a private tournament?", a: "Absolutely. Contact our events team to discuss field availability, bracket systems, and catering packages." },
  { q: "Is there parking available?", a: "Yes, we have a free 120-space parking lot on-site. EV charging stations are available." },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <section className="py-20 bg-muted">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp className="mb-12">
              <Badge variant="primary" className="mb-4">Get in Touch</Badge>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)]">Contact Us</h1>
              <p className="text-muted-foreground mt-3 text-lg">
                Questions, private event inquiries, or partnership opportunities — we respond within 2 hours.
              </p>
            </FadeUp>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Contact info */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">Find Us</h3>
                  <div className="space-y-4">
                    {[
                      { icon: MapPin, text: "1234 Soccer Blvd\nYour City, ST 12345" },
                      { icon: Phone, text: "(555) 123-4567" },
                      { icon: Mail, text: "info@dribblesoccer.com" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-start gap-3">
                        <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm whitespace-pre-line">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">Hours</h3>
                  <div className="space-y-2">
                    {hours.map((h) => (
                      <div key={h.day} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{h.day}</span>
                        <span className="font-semibold">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="h-48 bg-secondary rounded-none flex items-center justify-center text-secondary-foreground/20">
                  <MapPin className="h-12 w-12" />
                </div>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-2 bg-background border border-border p-8">
                <h2 className="font-bold text-xl mb-6">Send a Message</h2>
                <ContactForm />
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-20">
              <FadeUp className="mb-8">
                <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">Frequently Asked Questions</h2>
              </FadeUp>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq) => (
                  <FadeUp key={faq.q}>
                    <div className="bg-background border border-border p-6">
                      <h3 className="font-bold mb-2">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
