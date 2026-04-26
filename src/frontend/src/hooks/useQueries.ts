import { useQuery } from "@tanstack/react-query";
import type { MenuItem, Restaurant } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllRestaurants() {
  const { actor, isFetching } = useActor();
  return useQuery<Restaurant[]>({
    queryKey: ["restaurants"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRestaurants();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRestaurantById(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Restaurant | null>({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRestaurantById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetMenuItems(restaurantId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menu", restaurantId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenuItemsByRestaurantId(restaurantId);
    },
    enabled: !!actor && !isFetching && !!restaurantId,
  });
}
