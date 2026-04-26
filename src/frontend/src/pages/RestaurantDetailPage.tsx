import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, DollarSign, Star, UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import type { MenuItem, Restaurant } from "../backend.d";
import { MenuItemRow } from "../components/MenuItemRow";
import { SAMPLE_MENU_ITEMS, SAMPLE_RESTAURANTS } from "../data/sampleData";
import { useGetMenuItems, useGetRestaurantById } from "../hooks/useQueries";

function PriceLevel({ level }: { level: bigint }) {
  const num = Number(level);
  return (
    <span className="flex items-center gap-0.5">
      {(["1", "2", "3", "4"] as const).map((slot, i) => (
        <DollarSign
          key={slot}
          className={`h-4 w-4 ${i < num ? "text-primary" : "text-muted-foreground/25"}`}
          strokeWidth={2.5}
        />
      ))}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <span className="flex items-center gap-1.5">
      <span className="flex gap-0.5">
        {(["1", "2", "3", "4", "5"] as const).map((slot, i) => (
          <Star
            key={slot}
            className={`h-4 w-4 ${i < full ? "fill-accent text-accent" : "text-muted-foreground/25"}`}
            strokeWidth={0}
          />
        ))}
      </span>
      <span className="font-bold text-foreground">{rating.toFixed(1)}</span>
    </span>
  );
}

function BannerSkeleton() {
  return (
    <div className="w-full h-56 sm:h-72 lg:h-80">
      <Skeleton className="w-full h-full" />
    </div>
  );
}

function MenuSkeleton() {
  return (
    <div className="space-y-3">
      {(["m1", "m2", "m3", "m4"] as const).map((key) => (
        <div key={key} className="flex items-start gap-4 p-4 rounded-xl">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function CategorySection({
  category,
  items,
}: {
  category: string;
  items: MenuItem[];
}) {
  return (
    <section>
      <h3 className="font-display font-bold text-base sm:text-lg text-foreground mb-2 px-1">
        {category}
      </h3>
      <div className="space-y-1">
        {items.map((item) => (
          <MenuItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export function RestaurantDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };

  const { data: backendRestaurant, isLoading: restaurantLoading } =
    useGetRestaurantById(id ?? "");

  const { data: backendMenuItems, isLoading: menuLoading } = useGetMenuItems(
    id ?? "",
  );

  // Merge with sample data
  const restaurant: Restaurant | null = useMemo(() => {
    if (backendRestaurant) return backendRestaurant;
    return SAMPLE_RESTAURANTS.find((r) => r.id === id) ?? null;
  }, [backendRestaurant, id]);

  const menuItems: MenuItem[] = useMemo(() => {
    if (backendMenuItems && backendMenuItems.length > 0)
      return backendMenuItems;
    return SAMPLE_MENU_ITEMS.filter((m) => m.restaurantId === id);
  }, [backendMenuItems, id]);

  // Group items by category
  const groupedMenu = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    for (const item of menuItems) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [menuItems]);

  const categoryOrder = Object.keys(groupedMenu);

  const isLoading = restaurantLoading || menuLoading;

  if (!isLoading && !restaurant) {
    return (
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground">
            Restaurant not found
          </h2>
          <p className="text-muted-foreground text-sm mt-2 mb-6">
            We couldn't find that restaurant. It may have moved or closed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to restaurants
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Banner */}
      <div className="relative w-full h-56 sm:h-72 lg:h-80 overflow-hidden">
        {isLoading ? (
          <BannerSkeleton />
        ) : (
          <>
            <motion.img
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              src={restaurant!.bannerUrl || restaurant!.imageUrl}
              alt={`${restaurant!.name} banner`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.src = `https://placehold.co/1400x400/f5ebe0/c46b3a?text=${encodeURIComponent(restaurant!.name)}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </>
        )}

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/95 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Restaurants</span>
        </Link>
      </div>

      {/* Restaurant Info */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pt-6 pb-8"
        >
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ) : (
            <>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight">
                {restaurant!.name}
              </h1>

              {/* Meta row */}
              <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                <StarRating rating={restaurant!.rating} />
                <div className="h-4 w-px bg-border" />
                <PriceLevel level={restaurant!.priceLevel} />
                <div className="h-4 w-px bg-border" />
                <div className="flex flex-wrap gap-1.5">
                  {restaurant!.cuisineTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                {restaurant!.description}
              </p>
            </>
          )}
        </motion.div>

        <Separator />

        {/* Menu Section */}
        <section className="py-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display font-bold text-xl sm:text-2xl text-foreground mb-6"
          >
            Menu
          </motion.h2>

          {isLoading ? (
            <MenuSkeleton />
          ) : menuItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <UtensilsCrossed className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Menu items coming soon.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="space-y-8"
            >
              {categoryOrder.map((category, idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + idx * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <CategorySection
                    category={category}
                    items={groupedMenu[category]}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
