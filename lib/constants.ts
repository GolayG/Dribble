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
  { label: "About", href: "/about" },
];

export const SPORT_TYPES = ["Soccer", "Pickleball", "Indoor", "Outdoor"] as const;

// 9 AM – 9 PM only; last slot is 20:30 (ends 21:00 with 1-hr minimum)
export const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
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
