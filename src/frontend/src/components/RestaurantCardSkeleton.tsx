import { Skeleton } from "@/components/ui/skeleton";

export function RestaurantCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card flex flex-col">
      <Skeleton className="w-full aspect-[16/10]" />
      <div className="p-4 flex flex-col gap-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-9 w-full mt-1" />
      </div>
    </div>
  );
}
