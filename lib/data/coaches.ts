export type Coach = {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  bio: string;
  image: string;
  experience: number;
  certifications: string[];
  rating: number;
  sessions: number;
};

export const coaches: Coach[] = [
  {
    id: "coach-1",
    name: "Marcus Rivera",
    title: "Head Soccer Coach",
    specialties: ["Technical Skills", "Youth Development", "Goalkeeper Training"],
    bio: "Former MLS professional with 12 years of elite coaching experience. Marcus has developed over 200 players who went on to play at collegiate and professional levels.",
    image: "/coaches/marcus.jpg",
    experience: 12,
    certifications: ["UEFA B License", "US Soccer A License", "NSCAA Advanced"],
    rating: 4.9,
    sessions: 1840,
  },
  {
    id: "coach-2",
    name: "Sofia Chen",
    title: "Pickleball Director",
    specialties: ["Strategy", "Doubles Play", "Beginner Programs"],
    bio: "3x national pickleball champion turned coach. Sofia leads all our pickleball programming from open-play to competitive leagues.",
    image: "/coaches/sofia.jpg",
    experience: 8,
    certifications: ["IPTPA Certified Professional", "PPR Certified"],
    rating: 4.8,
    sessions: 1200,
  },
  {
    id: "coach-3",
    name: "James Okonkwo",
    title: "Fitness & Conditioning",
    specialties: ["Speed & Agility", "Strength Training", "Injury Prevention"],
    bio: "Sports science degree from USC. James designs athlete-specific programs for players of all ages looking to improve their physical performance on the pitch.",
    image: "/coaches/james.jpg",
    experience: 9,
    certifications: ["NSCA-CSCS", "FMS Certified", "FIFA Fitness Coach"],
    rating: 4.7,
    sessions: 980,
  },
  {
    id: "coach-4",
    name: "Isabella Santos",
    title: "Goalkeeper Coach",
    specialties: ["Shot Stopping", "Distribution", "Mental Coaching"],
    bio: "Former national team goalkeeper with 200+ professional appearances. Isabella specializes in elite goalkeeper development at all ages.",
    image: "/coaches/isabella.jpg",
    experience: 7,
    certifications: ["US Soccer GK License", "UEFA GK License B"],
    rating: 4.9,
    sessions: 720,
  },
];
