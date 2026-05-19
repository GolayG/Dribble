export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  sport: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Alex Thompson",
    role: "League Player",
    avatar: "/avatars/alex.jpg",
    content: "Dribble is hands down the best facility in the city. The turf quality is exceptional, the staff is incredibly professional, and the online booking makes scheduling a breeze. We've been running our corporate league here for two years.",
    rating: 5,
    sport: "Soccer",
  },
  {
    id: "t-2",
    name: "Maria Gonzalez",
    role: "Pickleball Enthusiast",
    avatar: "/avatars/maria.jpg",
    content: "The pickleball courts are immaculate. Sofia's beginner clinics got me addicted to the sport in just two sessions. The community here is so welcoming — I've made lifelong friends.",
    rating: 5,
    sport: "Pickleball",
  },
  {
    id: "t-3",
    name: "David Kim",
    role: "Youth Coach",
    avatar: "/avatars/david.jpg",
    content: "I've coached youth soccer for 10 years and this is the most organized, well-maintained facility I've worked with. Parents love it, kids love it. The field lights for evening sessions are game-changing.",
    rating: 5,
    sport: "Soccer",
  },
  {
    id: "t-4",
    name: "Sarah Williams",
    role: "Personal Training Client",
    avatar: "/avatars/sarah.jpg",
    content: "Training with Coach James completely transformed my game. In 3 months my sprint speed and endurance improved dramatically. Worth every penny — I'm now playing at a level I didn't think was possible.",
    rating: 5,
    sport: "Training",
  },
  {
    id: "t-5",
    name: "Michael Park",
    role: "Tournament Organizer",
    avatar: "/avatars/michael.jpg",
    content: "We hosted our annual invitational tournament here last spring. The staff was absolutely amazing from setup to cleanup. 200+ players and everything ran like clockwork. Already booked for next year.",
    rating: 5,
    sport: "Soccer",
  },
  {
    id: "t-6",
    name: "Emma Davis",
    role: "Parent",
    avatar: "/avatars/emma.jpg",
    content: "My daughter's birthday party at Dribble was the best decision. The events team handled everything. Kids had a blast on the field and the facility was spotless. Highly recommend for any event.",
    rating: 5,
    sport: "Events",
  },
];
