import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp, StaggerContainer } from "@/components/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Merchandise",
  description: "Official Dribble Soccer Complex gear and apparel.",
};

const categories = ["All", "Apparel", "Equipment", "Accessories"] as const;

const products = [
  {
    id: 1,
    name: "Dribble FC Jersey",
    category: "Apparel",
    price: 65,
    description: "Official club jersey. Moisture-wicking fabric, relaxed fit. Available in S–XXL.",
    tag: "Best Seller",
    emoji: "👕",
  },
  {
    id: 2,
    name: "Training Soccer Ball",
    category: "Equipment",
    price: 35,
    description: "Match-quality size 5 ball with Dribble branding. Durable for turf & grass.",
    tag: "",
    emoji: "⚽",
  },
  {
    id: 3,
    name: "Dribble Hoodie",
    category: "Apparel",
    price: 75,
    description: "Heavyweight fleece hoodie with embroidered logo. Perfect for sideline warmth.",
    tag: "New",
    emoji: "🧥",
  },
  {
    id: 4,
    name: "Goalkeeper Gloves",
    category: "Equipment",
    price: 45,
    description: "Pro-grade grip palms, adjustable wrist strap. Sizes 6–11.",
    tag: "",
    emoji: "🧤",
  },
  {
    id: 5,
    name: "Dribble Cap",
    category: "Accessories",
    price: 28,
    description: "Structured snapback with embroidered Dribble logo. One size fits most.",
    tag: "",
    emoji: "🧢",
  },
  {
    id: 6,
    name: "Shin Guards",
    category: "Equipment",
    price: 22,
    description: "Lightweight EVA foam guards with ankle sleeve. Sizes XS–XL.",
    tag: "",
    emoji: "🦵",
  },
  {
    id: 7,
    name: "Water Bottle",
    category: "Accessories",
    price: 18,
    description: "32oz insulated stainless steel bottle. Keeps drinks cold for 24 hours.",
    tag: "",
    emoji: "🫙",
  },
  {
    id: 8,
    name: "Training Shorts",
    category: "Apparel",
    price: 38,
    description: "Lightweight performance shorts with side pockets. Available in S–XXL.",
    tag: "",
    emoji: "🩳",
  },
  {
    id: 9,
    name: "Dribble Duffle Bag",
    category: "Accessories",
    price: 55,
    description: "Large-capacity gear bag with separate shoe compartment and Dribble branding.",
    tag: "New",
    emoji: "👜",
  },
];

export default function MerchandisePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeUp>
              <Badge variant="primary" className="mb-4">Official Gear</Badge>
              <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-secondary-foreground leading-tight">
                Dribble Merch.
              </h1>
              <p className="text-secondary-foreground/60 mt-4 text-xl max-w-2xl">
                Official apparel, equipment, and accessories. Gear up and represent the complex.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Products */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            {/* Category filters — static for now */}
            <FadeUp className="mb-10 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`px-4 py-2 text-sm font-bold border-2 uppercase tracking-wide cursor-pointer transition-all ${
                    cat === "All"
                      ? "bg-primary text-white border-primary"
                      : "border-border text-foreground hover:border-primary"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-border hover:border-primary transition-colors group overflow-hidden"
                >
                  {/* Product image placeholder */}
                  <div className="h-52 bg-muted flex items-center justify-center relative">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg, transparent, transparent 10px, #e5e5e5 10px, #e5e5e5 11px
                        )`,
                      }}
                    />
                    <span className="text-6xl select-none">{product.emoji}</span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <Badge variant="default" className="mb-1.5 text-xs">
                          {product.category}
                        </Badge>
                        <h3 className="font-bold text-base group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      {product.tag && (
                        <Badge variant="primary" className="shrink-0">{product.tag}</Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="font-display text-2xl text-primary">${product.price}</span>
                      <Button variant="primary" size="md" className="gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
