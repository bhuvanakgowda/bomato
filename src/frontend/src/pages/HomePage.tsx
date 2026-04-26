import { Input } from "@/components/ui/input";
import { ChefHat, Loader2, Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Restaurant } from "../backend.d";
import { RestaurantCard } from "../components/RestaurantCard";
import { RestaurantCardSkeleton } from "../components/RestaurantCardSkeleton";
import { SAMPLE_RESTAURANTS } from "../data/sampleData";
import { useGetAllRestaurants } from "../hooks/useQueries";

function EmptySearchState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center gap-4 py-20 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
        <ChefHat className="w-8 h-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-display font-semibold text-foreground text-lg">
          No restaurants found
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          No results for "{query}". Try searching for a cuisine or name.
        </p>
      </div>
    </motion.div>
  );
}

export function HomePage() {
  const [search, setSearch] = useState("");
  const { data: restaurants, isLoading, isError } = useGetAllRestaurants();

  // Merge backend data with sample data, preferring backend if available
  const allRestaurants: Restaurant[] = useMemo(() => {
    if (restaurants && restaurants.length > 0) return restaurants;
    return SAMPLE_RESTAURANTS;
  }, [restaurants]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allRestaurants;
    return allRestaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisineTags.some((t) => t.toLowerCase().includes(q)) ||
        r.description.toLowerCase().includes(q),
    );
  }, [allRestaurants, search]);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-bg noise-overlay">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
              🍽️ 6 restaurants near you
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight">
              Great food, <span className="text-primary">delivered fast.</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Discover the best restaurants around you. From sushi to tacos,
              find your next favorite meal.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 relative max-w-lg"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, cuisine, or dish..."
                className="pl-12 pr-4 h-12 text-base rounded-xl border-border bg-card shadow-card focus-visible:ring-primary/40"
                autoComplete="off"
              />
            </motion.div>
          </motion.div>

          {/* Decorative blob */}
          <div
            aria-hidden
            className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, oklch(0.52 0.18 30 / 0.15) 0%, transparent 70%)",
            }}
          />
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display font-bold text-xl sm:text-2xl text-foreground"
          >
            {search ? `Results for "${search}"` : "Popular Restaurants"}
          </motion.h2>
          {!isLoading && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-sm text-muted-foreground"
            >
              {filtered.length}{" "}
              {filtered.length === 1 ? "restaurant" : "restaurants"}
            </motion.span>
          )}
        </div>

        {isError && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center text-sm text-destructive">
            Could not load restaurants. Showing sample data.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {isLoading ? (
            (["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((key) => (
              <RestaurantCardSkeleton key={key} />
            ))
          ) : filtered.length === 0 && search ? (
            <EmptySearchState query={search} />
          ) : (
            filtered.map((restaurant, i) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                index={i}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
