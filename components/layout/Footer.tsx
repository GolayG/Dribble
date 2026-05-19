import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Camera, Globe, X, Play } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

const footerLinks = {
  Facility: [
    { label: "Soccer Fields", href: "/booking" },
    { label: "Pickleball Courts", href: "/pickleball" },
    { label: "Indoor Arena", href: "/booking" },
    { label: "Virtual Tour", href: "/about" },
  ],
  Programs: [
    { label: "Youth Training", href: "/training" },
    { label: "Adult Leagues", href: "/leagues" },
    { label: "Tournaments", href: "/leagues" },
    { label: "Summer Camps", href: "/events" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Coaches", href: "/training" },
    { label: "Events & Parties", href: "/events" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/logo.png"
              alt={SITE_NAME}
              width={180}
              height={68}
              className="h-12 w-auto object-contain brightness-0 invert mb-6"
            />
            <p className="text-sm text-secondary-foreground/60 max-w-xs leading-relaxed">
              Premier soccer & pickleball facility — where every player from beginner
              to elite comes to level up.
            </p>
            <div className="mt-6 flex gap-4">
              {[Camera, Globe, X, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground/40 mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: MapPin, text: "1234 Soccer Blvd, Your City, ST 12345" },
            { icon: Phone, text: "(555) 123-4567" },
            { icon: Mail, text: "info@dribblesoccer.com" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm text-secondary-foreground/60">
              <Icon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary-foreground/40">
          <span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
