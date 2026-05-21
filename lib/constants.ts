export const SITE_NAME = "Dribble Soccer Complex";
export const SITE_TAGLINE = "WHERE THE GAME BEGINS.";
export const SITE_DESCRIPTION =
  "Premier soccer & pickleball facility. Book fields, reserve training, build your game.";

export const NAV_LINKS = [
  { label: "Fields", href: "/booking" },
  { label: "Pickleball", href: "/pickleball" },
  { label: "Training", href: "/training" },
  { label: "Leagues", href: "/leagues" },
  { label: "Events", href: "/events" },
  { label: "Merchandise", href: "/merchandise" },
  { label: "About", href: "/about" },
];

export const SPORT_TYPES = ["Soccer", "Pickleball", "Indoor", "Outdoor"] as const;

// 24-hour availability, hourly slots
export const TIME_SLOTS = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];

export const BOOKING_ADDONS = [
  { id: "equipment", label: "Equipment Rental", price: 15 },
  { id: "lights", label: "Field Lights", price: 10 },
  { id: "referee", label: "Referee", price: 45 },
  { id: "scoreboard", label: "Scoreboard", price: 20 },
];

export const COLORS = {
  primary: "#e63946",
  background: "#ffffff",
  foreground: "#1a1a1a",
  muted: "#f5f5f5",
  mutedForeground: "#6b7280",
  border: "#e5e5e5",
} as const;
