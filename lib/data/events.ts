export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
  price: number | null;
  spots: number;
  spotsLeft: number;
  image: string;
  tag: string;
};

export const upcomingEvents: Event[] = [
  {
    id: "evt-1",
    title: "Summer 5v5 Tournament",
    date: "2026-06-14",
    time: "8:00 AM",
    type: "Tournament",
    description: "Our biggest 5-a-side tournament of the summer. 32 teams compete for the Dribble Cup. All skill levels welcome.",
    price: 150,
    spots: 32,
    spotsLeft: 8,
    image: "/events/tournament.jpg",
    tag: "Soccer",
  },
  {
    id: "evt-2",
    title: "Pickleball Open Play Day",
    date: "2026-05-25",
    time: "10:00 AM",
    type: "Open Play",
    description: "Free open-play pickleball morning. All courts open. Bring your paddle or rent one from us. Beginners welcome!",
    price: null,
    spots: 60,
    spotsLeft: 24,
    image: "/events/pickleball-open.jpg",
    tag: "Pickleball",
  },
  {
    id: "evt-3",
    title: "Youth Soccer Camp — Week 1",
    date: "2026-06-22",
    time: "9:00 AM",
    type: "Camp",
    description: "Full-week soccer camp for ages 7–14. Morning training sessions, skill challenges, and mini matches. Includes meals.",
    price: 299,
    spots: 40,
    spotsLeft: 12,
    image: "/events/youth-camp.jpg",
    tag: "Soccer",
  },
  {
    id: "evt-4",
    title: "Corporate Team Building",
    date: "2026-05-30",
    time: "5:00 PM",
    type: "Corporate",
    description: "Evening soccer & pickleball corporate event package. Includes both fields, catering, and custom team kits.",
    price: 1200,
    spots: 50,
    spotsLeft: 30,
    image: "/events/corporate.jpg",
    tag: "Events",
  },
];

export const formatEventDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
