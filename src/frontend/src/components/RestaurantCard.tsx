import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { DollarSign, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Restaurant } from "../backend.d";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
}

function PriceLevel({ level }: { level: bigint }) {
  const num = Number(level);
  return (
    <span className="flex items-center gap-0.5 text-sm font-medium">
      {(["1", "2", "3", "4"] as const).map((slot, i) => (
        <DollarSign
          key={slot}
          className={`h-3.5 w-3.5 ${i < num ? "text-primary" : "text-muted-foreground/30"}`}
          strokeWidth={2.5}
        />
      ))}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-accent text-accent" strokeWidth={0} />
      <span className="text-sm font-semibold text-foreground">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
    >
      {/* Restaurant Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={
            restaurant.imageUrl ||
            "https://placehold.co/800x500/f5ebe0/c46b3a?text=Restaurant"
          }
          alt={`${restaurant.name} restaurant`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/800x500/f5ebe0/c46b3a?text=${encodeURIComponent(restaurant.name)}`;
          }}
        />
        {/* Cuisine tags overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {restaurant.cuisineTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs font-semibold bg-background/90 backdrop-blur-sm text-foreground shadow-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-display font-bold text-lg leading-tight text-card-foreground line-clamp-1">
            {restaurant.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {restaurant.description}
          </p>
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <StarRating rating={restaurant.rating} />
          <PriceLevel level={restaurant.priceLevel} />
        </div>

        {/* Extra cuisine tags */}
        {restaurant.cuisineTags.length > 2 && (
          <div className="flex flex-wrap gap-1.5">
            {restaurant.cuisineTags.slice(2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs py-0 px-2 h-5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* CTA */}
        <Button
          onClick={() =>
            navigate({ to: "/restaurant/$id", params: { id: restaurant.id } })
          }
          className="mt-auto w-full font-semibold shadow-btn-primary"
          size="sm"
        >
          Order Now
        </Button>
      </div>
    </motion.article>
  );
}
