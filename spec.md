# Bomato

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Homepage with header ("Bomato"), search bar, and a grid of restaurant cards
- Each restaurant card shows: restaurant image, name, rating, cuisine tags, price level, "Order Now" button
- Dynamic restaurant detail page (per restaurant)
- Restaurant detail page: name, large banner image, rating, cuisine, price level
- Menu section on detail page: list of food items, each with an item counter (increment/decrement) that appears on click
- No cart functionality -- only item quantity selection UI

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: Define Restaurant and MenuItem data types; expose query to get all restaurants and get a single restaurant with its menu items; seed with sample data
2. Frontend homepage: Header with "Bomato" branding, search bar that filters restaurant cards, responsive grid of RestaurantCard components
3. RestaurantCard: image, name, rating stars, cuisine tags, price level indicator, "Order Now" button that navigates to /restaurant/:id
4. Restaurant detail page (/restaurant/:id): fetch restaurant by id, show name, banner image, rating/cuisine/price metadata
5. Menu section: list of food items; clicking an item reveals a +/- counter to select quantity; no cart or checkout logic
