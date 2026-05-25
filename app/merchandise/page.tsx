import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { createServerClient } from "@/lib/supabase/server";
import { mapProductRow } from "@/lib/data/products";
import { ProductGrid } from "@/components/merchandise/ProductGrid";

export const metadata: Metadata = {
  title: "Merchandise",
  description: "Official Dribble Soccer Complex gear and apparel.",
};

export default async function MerchandisePage() {
  const db = createServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (db as any).from("products").select("*").order("category");
  const products = (data ?? []).map(mapProductRow);

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
            {products.length === 0 ? (
              <p className="text-muted-foreground">No products available yet.</p>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
