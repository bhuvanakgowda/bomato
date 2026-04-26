import type { MenuItem, Restaurant } from "../backend.d";

export const SAMPLE_RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Osteria della Nonna",
    description:
      "A family-run trattoria serving generations-old recipes from Tuscany. Hand-rolled pasta, wood-fired meats, and wines sourced directly from small Chianti producers. Every dish tells a story.",
    cuisineTags: ["Italian", "Pasta", "Wine Bar"],
    rating: 4.8,
    priceLevel: BigInt(3),
    imageUrl: "/assets/generated/restaurant-italian.dim_800x500.jpg",
    bannerUrl: "/assets/generated/banner-italian.dim_1400x400.jpg",
  },
  {
    id: "r2",
    name: "Sakura Omakase",
    description:
      "An intimate 12-seat counter where Chef Hiroshi crafts a daily omakase experience using fish flown in from Tsukiji market. Each bite is a meditation on simplicity and precision.",
    cuisineTags: ["Japanese", "Sushi", "Omakase"],
    rating: 4.9,
    priceLevel: BigInt(4),
    imageUrl: "/assets/generated/restaurant-japanese.dim_800x500.jpg",
    bannerUrl: "/assets/generated/banner-japanese.dim_1400x400.jpg",
  },
  {
    id: "r3",
    name: "Spice Route",
    description:
      "Award-winning modern Indian cuisine that reimagines classic subcontinent flavors with contemporary technique. Slow-cooked curries, tandoor specialties, and craft cocktails with turmeric and cardamom.",
    cuisineTags: ["Indian", "Curry", "Tandoor"],
    rating: 4.7,
    priceLevel: BigInt(2),
    imageUrl: "/assets/generated/restaurant-indian.dim_800x500.jpg",
    bannerUrl: "/assets/generated/banner-indian.dim_1400x400.jpg",
  },
  {
    id: "r4",
    name: "The Griddle House",
    description:
      "Where classic American comfort food gets an artisanal upgrade. Wagyu smash burgers, thick-cut truffle fries, house-brewed craft sodas, and a killer Sunday brunch menu.",
    cuisineTags: ["American", "Burgers", "Brunch"],
    rating: 4.5,
    priceLevel: BigInt(2),
    imageUrl: "/assets/generated/restaurant-american.dim_800x500.jpg",
    bannerUrl: "/assets/generated/banner-american.dim_1400x400.jpg",
  },
  {
    id: "r5",
    name: "Café Lumière",
    description:
      "A slice of 6th arrondissement Paris transplanted to your city. Classic French technique with seasonal local produce. The soufflé is not optional — it's a rite of passage.",
    cuisineTags: ["French", "Bistro", "Patisserie"],
    rating: 4.6,
    priceLevel: BigInt(3),
    imageUrl: "/assets/generated/restaurant-french.dim_800x500.jpg",
    bannerUrl: "/assets/generated/banner-french.dim_1400x400.jpg",
  },
  {
    id: "r6",
    name: "Casa Bonita",
    description:
      "Festive, family-style Mexican cooking rooted in Oaxacan tradition. House-ground moles, wood-grilled mezcal chicken, fresh-pressed tortillas, and margaritas with hand-squeezed lime.",
    cuisineTags: ["Mexican", "Tacos", "Mezcal Bar"],
    rating: 4.4,
    priceLevel: BigInt(2),
    imageUrl: "/assets/generated/restaurant-mexican.dim_800x500.jpg",
    bannerUrl: "/assets/generated/banner-mexican.dim_1400x400.jpg",
  },
];

export const SAMPLE_MENU_ITEMS: MenuItem[] = [
  // Osteria della Nonna (r1)
  {
    id: "m1",
    restaurantId: "r1",
    name: "Cacio e Pepe",
    description:
      "Hand-rolled tonnarelli, Pecorino Romano, black pepper — nothing else",
    category: "Pasta",
    price: 22,
  },
  {
    id: "m2",
    restaurantId: "r1",
    name: "Tagliatelle al Ragù",
    description:
      "6-hour braised Chianina beef ragù, fresh egg tagliatelle, parmigiano",
    category: "Pasta",
    price: 26,
  },
  {
    id: "m3",
    restaurantId: "r1",
    name: "Risotto ai Funghi Porcini",
    description:
      "Carnaroli rice, wild porcini, aged parmigiano, white truffle oil",
    category: "Risotto",
    price: 28,
  },
  {
    id: "m4",
    restaurantId: "r1",
    name: "Bistecca alla Fiorentina",
    description:
      "1.2kg T-bone Chianina, rosemary, Ligurian olive oil, sea salt",
    category: "Mains",
    price: 68,
  },
  {
    id: "m5",
    restaurantId: "r1",
    name: "Burrata con Prosciutto",
    description:
      "Andria burrata, 24-month San Daniele, heirloom tomatoes, basil",
    category: "Starters",
    price: 18,
  },
  {
    id: "m6",
    restaurantId: "r1",
    name: "Tiramisù della Nonna",
    description:
      "Grandmother's recipe, Savoiardo biscuits, Marsala, 70% Valrhona",
    category: "Desserts",
    price: 12,
  },

  // Sakura Omakase (r2)
  {
    id: "m7",
    restaurantId: "r2",
    name: "Omakase 12-piece",
    description:
      "Seasonal nigiri selection by Chef Hiroshi, tsukemono, miso soup",
    category: "Omakase",
    price: 185,
  },
  {
    id: "m8",
    restaurantId: "r2",
    name: "Omakase 8-piece",
    description: "Chef's choice of 8 premium nigiri, wasabi, pickled ginger",
    category: "Omakase",
    price: 120,
  },
  {
    id: "m9",
    restaurantId: "r2",
    name: "Uni Don",
    description: "Hokkaido sea urchin over warm shari rice, nori, gold leaf",
    category: "Donburi",
    price: 75,
  },
  {
    id: "m10",
    restaurantId: "r2",
    name: "Wagyu Tataki",
    description:
      "A5 Miyazaki wagyu, ponzu, micro shiso, crispy garlic, yuzu zest",
    category: "Starters",
    price: 42,
  },
  {
    id: "m11",
    restaurantId: "r2",
    name: "Mochi Ice Cream",
    description: "House-made matcha and black sesame mochi, yuzu curd",
    category: "Desserts",
    price: 14,
  },

  // Spice Route (r3)
  {
    id: "m12",
    restaurantId: "r3",
    name: "Dal Makhani",
    description:
      "Black lentils slow-cooked 24 hours, butter, fenugreek, tandoor smoke",
    category: "Vegetarian",
    price: 16,
  },
  {
    id: "m13",
    restaurantId: "r3",
    name: "Lamb Rogan Josh",
    description: "Kashmiri spiced braised lamb, saffron, yogurt, crispy onions",
    category: "Mains",
    price: 24,
  },
  {
    id: "m14",
    restaurantId: "r3",
    name: "Chicken Tikka Masala",
    description:
      "Tandoor-charred chicken, tomato cream sauce, ginger, coriander",
    category: "Mains",
    price: 21,
  },
  {
    id: "m15",
    restaurantId: "r3",
    name: "Saag Paneer",
    description: "House-made paneer, silky pureed spinach, cumin tadka",
    category: "Vegetarian",
    price: 17,
  },
  {
    id: "m16",
    restaurantId: "r3",
    name: "Garlic Naan",
    description: "Stone-oven bread, roasted garlic, butter, fresh coriander",
    category: "Breads",
    price: 5,
  },
  {
    id: "m17",
    restaurantId: "r3",
    name: "Gulab Jamun",
    description:
      "Milk-solid dumplings, rose-cardamom syrup, pistachio, saffron ice cream",
    category: "Desserts",
    price: 9,
  },

  // The Griddle House (r4)
  {
    id: "m18",
    restaurantId: "r4",
    name: "The Classic Smash",
    description:
      "Double Wagyu patty, American cheese, secret sauce, brioche bun",
    category: "Burgers",
    price: 18,
  },
  {
    id: "m19",
    restaurantId: "r4",
    name: "Mushroom Truffle Burger",
    description: "Wild mushroom duxelles, aged cheddar, truffle aioli, arugula",
    category: "Burgers",
    price: 22,
  },
  {
    id: "m20",
    restaurantId: "r4",
    name: "Truffle Parmesan Fries",
    description:
      "Hand-cut russet fries, white truffle oil, parmesan, fresh thyme",
    category: "Sides",
    price: 10,
  },
  {
    id: "m21",
    restaurantId: "r4",
    name: "Avocado Egg Toast",
    description:
      "Sourdough, smashed avocado, soft-poached egg, chilli flakes, za'atar",
    category: "Brunch",
    price: 14,
  },
  {
    id: "m22",
    restaurantId: "r4",
    name: "Burnt Basque Cheesecake",
    description:
      "San Sebastián-style, caramelized top, runny center, berry compote",
    category: "Desserts",
    price: 10,
  },

  // Café Lumière (r5)
  {
    id: "m23",
    restaurantId: "r5",
    name: "French Onion Soup",
    description: "Caramelized onions, beef consommé, crouton, Gruyère gratiné",
    category: "Starters",
    price: 14,
  },
  {
    id: "m24",
    restaurantId: "r5",
    name: "Duck Confit",
    description: "48-hour duck leg confit, lentils du Puy, mustard jus, lardon",
    category: "Mains",
    price: 34,
  },
  {
    id: "m25",
    restaurantId: "r5",
    name: "Bouillabaisse",
    description:
      "Marseille-style seafood stew, rouille, sourdough, saffron broth",
    category: "Mains",
    price: 38,
  },
  {
    id: "m26",
    restaurantId: "r5",
    name: "Crème Brûlée",
    description:
      "Tahitian vanilla custard, caramelized sugar crust, fresh berries",
    category: "Desserts",
    price: 11,
  },
  {
    id: "m27",
    restaurantId: "r5",
    name: "Grand Soufflé au Chocolat",
    description:
      "Valrhona 70% soufflé, crème anglaise, must be ordered 20 min ahead",
    category: "Desserts",
    price: 16,
  },

  // Casa Bonita (r6)
  {
    id: "m28",
    restaurantId: "r6",
    name: "Birria Tacos",
    description:
      "Slow-braised beef cheek, Oaxacan cheese quesatacos, consommé dip",
    category: "Tacos",
    price: 16,
  },
  {
    id: "m29",
    restaurantId: "r6",
    name: "Al Pastor",
    description:
      "Achiote marinated pork, pineapple, white onion, cilantro, salsa verde",
    category: "Tacos",
    price: 14,
  },
  {
    id: "m30",
    restaurantId: "r6",
    name: "Mole Negro Chicken",
    description:
      "Grilled chicken, traditional 34-ingredient black mole, sesame, plantain",
    category: "Mains",
    price: 26,
  },
  {
    id: "m31",
    restaurantId: "r6",
    name: "Elote en Esquites",
    description: "Street corn kernels, lime crema, cotija, chili, epazote",
    category: "Sides",
    price: 8,
  },
  {
    id: "m32",
    restaurantId: "r6",
    name: "Churros con Chocolate",
    description:
      "Cinnamon churros, Oaxacan drinking chocolate, cajeta dipping sauce",
    category: "Desserts",
    price: 9,
  },
];
