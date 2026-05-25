"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category))).sort()];
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      {/* Category filters */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(cat)}
            className={cn(
              "px-4 py-2 text-sm font-bold border-2 uppercase tracking-wide transition-all",
              active === cat
                ? "bg-primary text-white border-primary"
                : "border-border text-foreground hover:border-primary"
            )}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-border hover:border-primary transition-colors group overflow-hidden"
          >
            <div className="h-52 bg-muted flex items-center justify-center relative">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg, transparent, transparent 10px, #e5e5e5 10px, #e5e5e5 11px
                  )`,
                }}
              />
              <span className="text-6xl select-none">{product.emoji ?? "🛍️"}</span>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <Badge variant="default" className="mb-1.5 text-xs">{product.category}</Badge>
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
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p className="text-muted-foreground text-sm col-span-full">No products in this category.</p>
        )}
      </div>
    </div>
  );
}
