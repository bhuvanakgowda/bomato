import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  // Data types for Restaurant and MenuItem
  type Restaurant = {
    id : Text;
    name : Text;
    cuisineTags : [Text];
    rating : Float;
    priceLevel : Nat;
    description : Text;
    imageUrl : Text;
    bannerUrl : Text;
  };

  type MenuItem = {
    id : Text;
    restaurantId : Text;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
  };

  module Restaurant {
    public func compare(r1 : Restaurant, r2 : Restaurant) : Order.Order {
      Float.compare(r1.rating, r2.rating);
    };
  };

  module MenuItem {
    public func compare(m1 : MenuItem, m2 : MenuItem) : Order.Order {
      Text.compare(m1.name, m2.name);
    };
  };

  // Restaurant Store
  let restaurants = Map.empty<Text, Restaurant>();
  let menuItems = Map.empty<Text, MenuItem>();

  // Populate with sample data
  public shared ({ caller }) func _init() : async () {
    // Adding restaurants
    let sampleRestaurants = [
      {
        id = "1";
        name = "Bella Italia";
        cuisineTags = ["Italian", "Pizza", "Pasta"];
        rating = 4.5;
        priceLevel = 3;
        description = "Authentic Italian cuisine with a modern twist.";
        imageUrl = "https://example.com/italian.jpg";
        bannerUrl = "https://example.com/italian-banner.jpg";
      },
      {
        id = "2";
        name = "Sushi Zen";
        cuisineTags = ["Japanese", "Sushi", "Seafood"];
        rating = 4.8;
        priceLevel = 4;
        description = "Fresh sushi and sashimi prepared by master chefs.";
        imageUrl = "https://example.com/japanese.jpg";
        bannerUrl = "https://example.com/japanese-banner.jpg";
      },
      {
        id = "3";
        name = "El Mexicano";
        cuisineTags = ["Mexican", "Tacos", "Burritos"];
        rating = 4.2;
        priceLevel = 2;
        description = "Spicy and flavorful Mexican dishes.";
        imageUrl = "https://example.com/mexican.jpg";
        bannerUrl = "https://example.com/mexican-banner.jpg";
      },
      {
        id = "4";
        name = "Curry House";
        cuisineTags = ["Indian", "Curry", "Vegetarian"];
        rating = 3.9;
        priceLevel = 2;
        description = "Traditional Indian curries and biryanis.";
        imageUrl = "https://example.com/indian.jpg";
        bannerUrl = "https://example.com/indian-banner.jpg";
      },
      {
        id = "5";
        name = "American Grill";
        cuisineTags = ["American", "Burgers", "Steak"];
        rating = 4.3;
        priceLevel = 3;
        description = "Classic American comfort food.";
        imageUrl = "https://example.com/american.jpg";
        bannerUrl = "https://example.com/american-banner.jpg";
      },
      {
        id = "6";
        name = "Bangkok Spice";
        cuisineTags = ["Thai", "Spicy", "Noodles"];
        rating = 4.6;
        priceLevel = 2;
        description = "Authentic Thai dishes with bold flavors.";
        imageUrl = "https://example.com/thai.jpg";
        bannerUrl = "https://example.com/thai-banner.jpg";
      },
    ];

    // Adding menu items
    let sampleMenuItems = [
      // Bella Italia
      {
        id = "m1";
        restaurantId = "1";
        name = "Margherita Pizza";
        description = "Classic pizza with tomato, mozzarella, and basil.";
        price = 12.99;
        category = "Main";
      },
      {
        id = "m2";
        restaurantId = "1";
        name = "Spaghetti Carbonara";
        description = "Pasta with bacon, eggs, and parmesan.";
        price = 14.49;
        category = "Main";
      },
      {
        id = "m3";
        restaurantId = "1";
        name = "Tiramisu";
        description = "Coffee-flavored Italian dessert.";
        price = 6.99;
        category = "Dessert";
      },
      {
        id = "m4";
        restaurantId = "1";
        name = "Bruschetta";
        description = "Grilled bread with tomatoes and garlic.";
        price = 8.50;
        category = "Starter";
      },
      {
        id = "m5";
        restaurantId = "1";
        name = "Risotto";
        description = "Creamy rice dish with mushrooms.";
        price = 13.99;
        category = "Main";
      },

      // Sushi Zen
      {
        id = "m6";
        restaurantId = "2";
        name = "Salmon Nigiri";
        description = "Fresh salmon over rice.";
        price = 10.99;
        category = "Main";
      },
      {
        id = "m7";
        restaurantId = "2";
        name = "Miso Soup";
        description = "Traditional Japanese soup with tofu.";
        price = 4.50;
        category = "Starter";
      },
      {
        id = "m8";
        restaurantId = "2";
        name = "Dragon Roll";
        description = "Sushi roll with eel and avocado.";
        price = 15.99;
        category = "Main";
      },
      {
        id = "m9";
        restaurantId = "2";
        name = "Tempura Ice Cream";
        description = "Deep-fried ice cream dessert.";
        price = 7.99;
        category = "Dessert";
      },
      {
        id = "m10";
        restaurantId = "2";
        name = "Edamame";
        description = "Steamed soybeans with sea salt.";
        price = 5.99;
        category = "Starter";
      },
    ];

    for (r in sampleRestaurants.values()) {
      restaurants.add(r.id, r);
    };

    for (m in sampleMenuItems.values()) {
      menuItems.add(m.id, m);
    };
  };

  // Get all restaurants
  public query ({ caller }) func getAllRestaurants() : async [Restaurant] {
    restaurants.values().toArray();
  };

  // Get a single restaurant by id
  public query ({ caller }) func getRestaurantById(id : Text) : async ?Restaurant {
    restaurants.get(id);
  };

  // Get menu items by restaurantId
  public query ({ caller }) func getMenuItemsByRestaurantId(restaurantId : Text) : async [MenuItem] {
    let filteredItems = menuItems.values().filter(
      func(item) {
        item.restaurantId == restaurantId;
      }
    );
    filteredItems.toArray();
  };
};
