import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { MenuItem } from "../backend.d";

interface MenuItemRowProps {
  item: MenuItem;
}

export function MenuItemRow({ item }: MenuItemRowProps) {
  const [quantity, setQuantity] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  function increment() {
    setQuantity((q) => q + 1);
    if (!isExpanded) setIsExpanded(true);
  }

  function decrement() {
    setQuantity((q) => {
      const next = Math.max(0, q - 1);
      if (next === 0) setIsExpanded(false);
      return next;
    });
  }

  function handleItemClick() {
    if (!isExpanded) {
      setIsExpanded(true);
      if (quantity === 0) setQuantity(1);
    }
  }

  return (
    <motion.div
      layout
      className={`
        group relative flex items-start justify-between gap-4 p-4 rounded-xl
        border transition-colors duration-200 cursor-pointer
        ${
          isExpanded
            ? "border-primary/30 bg-primary/[0.03]"
            : "border-transparent hover:border-border hover:bg-muted/40"
        }
      `}
      onClick={handleItemClick}
    >
      {/* Item Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <h4 className="font-semibold text-sm text-foreground leading-snug">
            {item.name}
          </h4>
          {quantity > 0 && (
            <motion.span
              key={quantity}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold"
            >
              {quantity}
            </motion.span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        <p className="text-sm font-bold text-primary mt-1.5">
          ${item.price.toFixed(2)}
        </p>
      </div>

      {/* Counter */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: counter div uses stop propagation only, inner buttons handle keyboard */}
      <div
        className="shrink-0 flex items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="popLayout">
          {isExpanded ? (
            <motion.div
              key="counter"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex items-center gap-1 bg-card border border-border rounded-full p-1 shadow-xs"
            >
              <button
                type="button"
                onClick={decrement}
                className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus
                  className="w-3.5 h-3.5 text-foreground"
                  strokeWidth={2.5}
                />
              </button>
              <motion.span
                key={quantity}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-6 text-center text-sm font-bold text-foreground tabular-nums"
              >
                {quantity}
              </motion.span>
              <button
                type="button"
                onClick={increment}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-primary hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus
                  className="w-3.5 h-3.5 text-primary-foreground"
                  strokeWidth={2.5}
                />
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="add-btn"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                increment();
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring opacity-0 group-hover:opacity-100"
              aria-label={`Add ${item.name}`}
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
