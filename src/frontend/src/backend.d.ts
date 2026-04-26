import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Restaurant {
    id: string;
    priceLevel: bigint;
    name: string;
    cuisineTags: Array<string>;
    description: string;
    imageUrl: string;
    bannerUrl: string;
    rating: number;
}
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    restaurantId: string;
    category: string;
    price: number;
}
export interface backendInterface {
    getAllRestaurants(): Promise<Array<Restaurant>>;
    getMenuItemsByRestaurantId(restaurantId: string): Promise<Array<MenuItem>>;
    getRestaurantById(id: string): Promise<Restaurant | null>;
}
