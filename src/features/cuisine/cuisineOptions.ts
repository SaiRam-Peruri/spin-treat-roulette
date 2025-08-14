export interface CuisineOption {
  id: string;
  name: string;
  description: string;
  type: 'dish' | 'restaurant' | 'style';
  popularity: number; // 1-5 scale
  spiceLevel?: number; // 1-5 scale for applicable cuisines
  dietary?: string[]; // vegetarian, vegan, gluten-free, etc.
  emoji: string;
}

export const CUISINE_OPTIONS: Record<string, CuisineOption[]> = {
  Italian: [
    {
      id: 'italian-1',
      name: 'Pizza Margherita',
      description: 'Classic Italian pizza with tomato, mozzarella, and basil',
      type: 'dish',
      popularity: 5,
      dietary: ['vegetarian'],
      emoji: '🍕'
    },
    {
      id: 'italian-2',
      name: 'Spaghetti Carbonara',
      description: 'Creamy pasta with eggs, cheese, pancetta, and black pepper',
      type: 'dish',
      popularity: 4,
      emoji: '🍝'
    },
    {
      id: 'italian-3',
      name: 'Lasagna',
      description: 'Layered pasta with meat sauce, cheese, and bechamel',
      type: 'dish',
      popularity: 4,
      emoji: '🍝'
    },
    {
      id: 'italian-4',
      name: 'Risotto',
      description: 'Creamy rice dish with various seasonal ingredients',
      type: 'dish',
      popularity: 3,
      dietary: ['vegetarian'],
      emoji: '🍚'
    },
    {
      id: 'italian-5',
      name: 'Osso Buco',
      description: 'Braised veal shanks with vegetables and broth',
      type: 'dish',
      popularity: 3,
      emoji: '🍖'
    },
    {
      id: 'italian-6',
      name: 'Tiramisu',
      description: 'Coffee-flavored dessert with mascarpone and ladyfingers',
      type: 'dish',
      popularity: 5,
      dietary: ['vegetarian'],
      emoji: '🍰'
    },
    {
      id: 'italian-7',
      name: 'Antipasto Platter',
      description: 'Traditional Italian appetizer selection',
      type: 'dish',
      popularity: 4,
      emoji: '🧀'
    },
    {
      id: 'italian-8',
      name: 'Gelato',
      description: 'Italian-style ice cream with intense flavors',
      type: 'dish',
      popularity: 5,
      dietary: ['vegetarian'],
      emoji: '🍨'
    }
  ],

  Mexican: [
    {
      id: 'mexican-1',
      name: 'Tacos al Pastor',
      description: 'Marinated pork tacos with pineapple and onions',
      type: 'dish',
      popularity: 5,
      spiceLevel: 3,
      emoji: '🌮'
    },
    {
      id: 'mexican-2',
      name: 'Guacamole & Chips',
      description: 'Fresh avocado dip with crispy tortilla chips',
      type: 'dish',
      popularity: 5,
      spiceLevel: 2,
      dietary: ['vegetarian', 'vegan'],
      emoji: '🥑'
    },
    {
      id: 'mexican-3',
      name: 'Chicken Enchiladas',
      description: 'Rolled tortillas filled with chicken and covered in sauce',
      type: 'dish',
      popularity: 4,
      spiceLevel: 3,
      emoji: '🌯'
    },
    {
      id: 'mexican-4',
      name: 'Carne Asada',
      description: 'Grilled skirt steak with traditional seasonings',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      emoji: '🥩'
    },
    {
      id: 'mexican-5',
      name: 'Churros',
      description: 'Fried dough pastry with cinnamon sugar',
      type: 'dish',
      popularity: 5,
      dietary: ['vegetarian'],
      emoji: '🍩'
    },
    {
      id: 'mexican-6',
      name: 'Pozole',
      description: 'Traditional soup with hominy and meat',
      type: 'dish',
      popularity: 3,
      spiceLevel: 3,
      emoji: '🍲'
    },
    {
      id: 'mexican-7',
      name: 'Quesadillas',
      description: 'Grilled tortillas filled with cheese and other ingredients',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      dietary: ['vegetarian'],
      emoji: '🧀'
    },
    {
      id: 'mexican-8',
      name: 'Mexican Street Corn',
      description: 'Grilled corn with mayo, cheese, and chili powder',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      dietary: ['vegetarian'],
      emoji: '🌽'
    }
  ],

  Chinese: [
    {
      id: 'chinese-1',
      name: 'Sweet & Sour Pork',
      description: 'Crispy pork with bell peppers in tangy sauce',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🍖'
    },
    {
      id: 'chinese-2',
      name: 'Kung Pao Chicken',
      description: 'Spicy stir-fried chicken with peanuts and vegetables',
      type: 'dish',
      popularity: 4,
      spiceLevel: 4,
      emoji: '🐔'
    },
    {
      id: 'chinese-3',
      name: 'Fried Rice',
      description: 'Wok-fried rice with eggs, vegetables, and soy sauce',
      type: 'dish',
      popularity: 5,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🍚'
    },
    {
      id: 'chinese-4',
      name: 'Dim Sum',
      description: 'Variety of small steamed and fried dishes',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🥟'
    },
    {
      id: 'chinese-5',
      name: 'Hot Pot',
      description: 'Interactive dining with simmering broth and fresh ingredients',
      type: 'style',
      popularity: 4,
      spiceLevel: 3,
      emoji: '🍲'
    },
    {
      id: 'chinese-6',
      name: 'Peking Duck',
      description: 'Roasted duck with pancakes, sauce, and scallions',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      emoji: '🦆'
    },
    {
      id: 'chinese-7',
      name: 'Mapo Tofu',
      description: 'Spicy Sichuan tofu in chili and bean sauce',
      type: 'dish',
      popularity: 3,
      spiceLevel: 5,
      dietary: ['vegetarian'],
      emoji: '🌶️'
    },
    {
      id: 'chinese-8',
      name: 'Spring Rolls',
      description: 'Crispy rolls filled with vegetables or meat',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🌯'
    }
  ],

  Indian: [
    {
      id: 'indian-1',
      name: 'Butter Chicken',
      description: 'Creamy tomato-based curry with tender chicken',
      type: 'dish',
      popularity: 5,
      spiceLevel: 2,
      emoji: '🍛'
    },
    {
      id: 'indian-2',
      name: 'Biryani',
      description: 'Fragrant rice dish with spices, meat, or vegetables',
      type: 'dish',
      popularity: 5,
      spiceLevel: 3,
      emoji: '🍚'
    },
    {
      id: 'indian-3',
      name: 'Naan Bread',
      description: 'Soft, pillowy flatbread baked in tandoor oven',
      type: 'dish',
      popularity: 5,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🫓'
    },
    {
      id: 'indian-4',
      name: 'Samosas',
      description: 'Crispy pastries filled with spiced potatoes or meat',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      dietary: ['vegetarian'],
      emoji: '🥟'
    },
    {
      id: 'indian-5',
      name: 'Vindaloo',
      description: 'Very spicy curry with vinegar and garlic',
      type: 'dish',
      popularity: 3,
      spiceLevel: 5,
      emoji: '🌶️'
    },
    {
      id: 'indian-6',
      name: 'Tandoori Chicken',
      description: 'Yogurt-marinated chicken cooked in clay oven',
      type: 'dish',
      popularity: 4,
      spiceLevel: 3,
      emoji: '🐔'
    },
    {
      id: 'indian-7',
      name: 'Dal',
      description: 'Spiced lentil curry, comfort food of India',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      dietary: ['vegetarian', 'vegan'],
      emoji: '🍲'
    },
    {
      id: 'indian-8',
      name: 'Mango Lassi',
      description: 'Sweet yogurt drink with mango',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🥭'
    }
  ],

  Thai: [
    {
      id: 'thai-1',
      name: 'Pad Thai',
      description: 'Stir-fried rice noodles with tamarind and peanuts',
      type: 'dish',
      popularity: 5,
      spiceLevel: 2,
      emoji: '🍜'
    },
    {
      id: 'thai-2',
      name: 'Green Curry',
      description: 'Spicy coconut curry with green chilies and basil',
      type: 'dish',
      popularity: 4,
      spiceLevel: 4,
      emoji: '🍛'
    },
    {
      id: 'thai-3',
      name: 'Tom Yum Soup',
      description: 'Hot and sour soup with lemongrass and lime',
      type: 'dish',
      popularity: 4,
      spiceLevel: 4,
      emoji: '🍲'
    },
    {
      id: 'thai-4',
      name: 'Mango Sticky Rice',
      description: 'Sweet dessert with coconut milk and fresh mango',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegetarian', 'vegan'],
      emoji: '🥭'
    },
    {
      id: 'thai-5',
      name: 'Thai Basil Chicken',
      description: 'Spicy stir-fry with holy basil and chilies',
      type: 'dish',
      popularity: 4,
      spiceLevel: 4,
      emoji: '🐔'
    },
    {
      id: 'thai-6',
      name: 'Som Tam',
      description: 'Spicy green papaya salad with lime and chilies',
      type: 'dish',
      popularity: 3,
      spiceLevel: 4,
      dietary: ['vegetarian', 'vegan'],
      emoji: '🥗'
    },
    {
      id: 'thai-7',
      name: 'Massaman Curry',
      description: 'Rich, mild curry with potatoes and peanuts',
      type: 'dish',
      popularity: 3,
      spiceLevel: 2,
      emoji: '🍛'
    },
    {
      id: 'thai-8',
      name: 'Thai Fried Rice',
      description: 'Jasmine rice stir-fried with Thai seasonings',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      emoji: '🍚'
    }
  ],

  Japanese: [
    {
      id: 'japanese-1',
      name: 'Sushi',
      description: 'Fresh fish and rice, the art of Japanese cuisine',
      type: 'dish',
      popularity: 5,
      spiceLevel: 1,
      emoji: '🍣'
    },
    {
      id: 'japanese-2',
      name: 'Ramen',
      description: 'Rich broth with noodles, meat, and vegetables',
      type: 'dish',
      popularity: 5,
      spiceLevel: 2,
      emoji: '🍜'
    },
    {
      id: 'japanese-3',
      name: 'Tempura',
      description: 'Light, crispy battered and fried seafood or vegetables',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🍤'
    },
    {
      id: 'japanese-4',
      name: 'Yakitori',
      description: 'Grilled chicken skewers with tare sauce',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🍢'
    },
    {
      id: 'japanese-5',
      name: 'Miso Soup',
      description: 'Traditional soybean paste soup with tofu and seaweed',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🍲'
    },
    {
      id: 'japanese-6',
      name: 'Katsu',
      description: 'Breaded and fried cutlet, usually pork or chicken',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🍖'
    },
    {
      id: 'japanese-7',
      name: 'Onigiri',
      description: 'Rice balls with various fillings, wrapped in seaweed',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🍙'
    },
    {
      id: 'japanese-8',
      name: 'Matcha Ice Cream',
      description: 'Green tea flavored ice cream, uniquely Japanese',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🍦'
    }
  ],

  Mediterranean: [
    {
      id: 'med-1',
      name: 'Greek Salad',
      description: 'Fresh vegetables with feta cheese and olive oil',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🥗'
    },
    {
      id: 'med-2',
      name: 'Hummus & Pita',
      description: 'Creamy chickpea dip with warm flatbread',
      type: 'dish',
      popularity: 5,
      spiceLevel: 1,
      dietary: ['vegetarian', 'vegan'],
      emoji: '🧆'
    },
    {
      id: 'med-3',
      name: 'Gyros',
      description: 'Seasoned meat in pita with tzatziki sauce',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      emoji: '🌯'
    },
    {
      id: 'med-4',
      name: 'Falafel',
      description: 'Fried chickpea balls with herbs and spices',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      dietary: ['vegetarian', 'vegan'],
      emoji: '🧆'
    },
    {
      id: 'med-5',
      name: 'Paella',
      description: 'Spanish rice dish with saffron and various proteins',
      type: 'dish',
      popularity: 3,
      spiceLevel: 2,
      emoji: '🥘'
    },
    {
      id: 'med-6',
      name: 'Baklava',
      description: 'Sweet pastry with nuts and honey syrup',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🍯'
    },
    {
      id: 'med-7',
      name: 'Tabbouleh',
      description: 'Fresh parsley salad with bulgur, tomatoes, and lemon',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegetarian', 'vegan'],
      emoji: '🥗'
    },
    {
      id: 'med-8',
      name: 'Stuffed Grape Leaves',
      description: 'Rice and herbs wrapped in grape leaves',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegetarian', 'vegan'],
      emoji: '🍃'
    }
  ],

  Burgers: [
    {
      id: 'burger-1',
      name: 'Classic Cheeseburger',
      description: 'Beef patty with cheese, lettuce, tomato, and pickles',
      type: 'dish',
      popularity: 5,
      spiceLevel: 1,
      emoji: '🍔'
    },
    {
      id: 'burger-2',
      name: 'Bacon Burger',
      description: 'Juicy burger topped with crispy bacon strips',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🥓'
    },
    {
      id: 'burger-3',
      name: 'Veggie Burger',
      description: 'Plant-based patty with fresh vegetables',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🥬'
    },
    {
      id: 'burger-4',
      name: 'BBQ Burger',
      description: 'Smoky burger with BBQ sauce and onion rings',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      emoji: '🔥'
    },
    {
      id: 'burger-5',
      name: 'Mushroom Swiss Burger',
      description: 'Beef patty with sautéed mushrooms and Swiss cheese',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      emoji: '🍄'
    },
    {
      id: 'burger-6',
      name: 'Spicy Jalapeño Burger',
      description: 'Hot burger with jalapeños and pepper jack cheese',
      type: 'dish',
      popularity: 3,
      spiceLevel: 4,
      emoji: '🌶️'
    },
    {
      id: 'burger-7',
      name: 'Turkey Burger',
      description: 'Lean turkey patty with avocado and sprouts',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      emoji: '🦃'
    },
    {
      id: 'burger-8',
      name: 'Slider Trio',
      description: 'Three mini burgers with different toppings',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🍔'
    }
  ],

  Pizza: [
    {
      id: 'pizza-1',
      name: 'Margherita Pizza',
      description: 'Classic with tomato sauce, mozzarella, and fresh basil',
      type: 'dish',
      popularity: 5,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🍕'
    },
    {
      id: 'pizza-2',
      name: 'Pepperoni Pizza',
      description: 'America\'s favorite with spicy pepperoni slices',
      type: 'dish',
      popularity: 5,
      spiceLevel: 2,
      emoji: '🍕'
    },
    {
      id: 'pizza-3',
      name: 'Meat Lovers Pizza',
      description: 'Loaded with pepperoni, sausage, bacon, and ham',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      emoji: '🥩'
    },
    {
      id: 'pizza-4',
      name: 'Veggie Supreme',
      description: 'Bell peppers, mushrooms, onions, olives, and tomatoes',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🥬'
    },
    {
      id: 'pizza-5',
      name: 'Hawaiian Pizza',
      description: 'Ham and pineapple - love it or hate it!',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      emoji: '🍍'
    },
    {
      id: 'pizza-6',
      name: 'White Pizza',
      description: 'No tomato sauce, just cheese, garlic, and herbs',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🧄'
    },
    {
      id: 'pizza-7',
      name: 'Buffalo Chicken Pizza',
      description: 'Spicy buffalo chicken with ranch dressing',
      type: 'dish',
      popularity: 4,
      spiceLevel: 3,
      emoji: '🐔'
    },
    {
      id: 'pizza-8',
      name: 'Four Cheese Pizza',
      description: 'Mozzarella, parmesan, ricotta, and gorgonzola',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🧀'
    }
  ],

  BBQ: [
    {
      id: 'bbq-1',
      name: 'Pulled Pork',
      description: 'Slow-smoked pork shoulder, tender and flavorful',
      type: 'dish',
      popularity: 5,
      spiceLevel: 2,
      emoji: '🐷'
    },
    {
      id: 'bbq-2',
      name: 'Beef Brisket',
      description: 'Low and slow smoked beef, melt-in-your-mouth tender',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      emoji: '🥩'
    },
    {
      id: 'bbq-3',
      name: 'Ribs',
      description: 'Fall-off-the-bone pork ribs with signature sauce',
      type: 'dish',
      popularity: 5,
      spiceLevel: 2,
      emoji: '🍖'
    },
    {
      id: 'bbq-4',
      name: 'BBQ Chicken',
      description: 'Smoky grilled chicken with tangy BBQ glaze',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      emoji: '🐔'
    },
    {
      id: 'bbq-5',
      name: 'Burnt Ends',
      description: 'Crispy, caramelized cubes of smoked brisket',
      type: 'dish',
      popularity: 3,
      spiceLevel: 2,
      emoji: '🔥'
    },
    {
      id: 'bbq-6',
      name: 'Corn Bread',
      description: 'Sweet, crumbly bread perfect with BBQ',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🌽'
    },
    {
      id: 'bbq-7',
      name: 'Coleslaw',
      description: 'Creamy cabbage salad, classic BBQ side',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegetarian'],
      emoji: '🥬'
    },
    {
      id: 'bbq-8',
      name: 'Smoked Sausage',
      description: 'Spicy smoked sausage with perfect snap',
      type: 'dish',
      popularity: 4,
      spiceLevel: 3,
      emoji: '🌭'
    }
  ],

  Vegan: [
    {
      id: 'vegan-1',
      name: 'Buddha Bowl',
      description: 'Colorful bowl with grains, vegetables, and tahini',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegan', 'gluten-free'],
      emoji: '🥗'
    },
    {
      id: 'vegan-2',
      name: 'Plant-Based Burger',
      description: 'Impossible or Beyond burger with vegan toppings',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegan'],
      emoji: '🍔'
    },
    {
      id: 'vegan-3',
      name: 'Chickpea Curry',
      description: 'Spicy curry with coconut milk and vegetables',
      type: 'dish',
      popularity: 4,
      spiceLevel: 3,
      dietary: ['vegan', 'gluten-free'],
      emoji: '🍛'
    },
    {
      id: 'vegan-4',
      name: 'Quinoa Salad',
      description: 'Protein-rich grain salad with fresh herbs',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegan', 'gluten-free'],
      emoji: '🥗'
    },
    {
      id: 'vegan-5',
      name: 'Vegan Tacos',
      description: 'Plant-based protein with fresh salsas',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      dietary: ['vegan'],
      emoji: '🌮'
    },
    {
      id: 'vegan-6',
      name: 'Smoothie Bowl',
      description: 'Thick smoothie topped with fruits and granola',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      dietary: ['vegan'],
      emoji: '🥣'
    },
    {
      id: 'vegan-7',
      name: 'Mushroom Risotto',
      description: 'Creamy rice dish with wild mushrooms (dairy-free)',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegan'],
      emoji: '🍄'
    },
    {
      id: 'vegan-8',
      name: 'Chia Pudding',
      description: 'Nutritious dessert with chia seeds and fruits',
      type: 'dish',
      popularity: 3,
      spiceLevel: 1,
      dietary: ['vegan', 'gluten-free'],
      emoji: '🥥'
    }
  ],

  Seafood: [
    {
      id: 'seafood-1',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with lemon and herbs',
      type: 'dish',
      popularity: 5,
      spiceLevel: 1,
      emoji: '🐟'
    },
    {
      id: 'seafood-2',
      name: 'Fish & Chips',
      description: 'Beer-battered fish with crispy fries',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🍟'
    },
    {
      id: 'seafood-3',
      name: 'Lobster Roll',
      description: 'Fresh lobster meat in a buttered roll',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🦞'
    },
    {
      id: 'seafood-4',
      name: 'Shrimp Scampi',
      description: 'Garlic butter shrimp over pasta',
      type: 'dish',
      popularity: 4,
      spiceLevel: 2,
      emoji: '🍤'
    },
    {
      id: 'seafood-5',
      name: 'Clam Chowder',
      description: 'Creamy soup with clams and potatoes',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🍲'
    },
    {
      id: 'seafood-6',
      name: 'Crab Cakes',
      description: 'Pan-fried cakes with jumbo lump crab meat',
      type: 'dish',
      popularity: 4,
      spiceLevel: 1,
      emoji: '🦀'
    },
    {
      id: 'seafood-7',
      name: 'Seared Tuna',
      description: 'Perfectly seared tuna with wasabi',
      type: 'dish',
      popularity: 3,
      spiceLevel: 2,
      emoji: '🍣'
    },
    {
      id: 'seafood-8',
      name: 'Seafood Paella',
      description: 'Spanish rice dish with mixed seafood',
      type: 'dish',
      popularity: 3,
      spiceLevel: 2,
      emoji: '🥘'
    }
  ]
};

export function getCuisineOptions(cuisine: string): CuisineOption[] {
  const options = CUISINE_OPTIONS[cuisine] || [];
  
  // Add some randomization while keeping core options
  return options.map(option => ({
    ...option,
    popularity: Math.max(1, Math.min(5, option.popularity + (Math.random() - 0.5) * 0.5))
  }));
}

export function getRandomCuisineOptions(cuisine: string, count: number = 8): CuisineOption[] {
  const allOptions = getCuisineOptions(cuisine);
  
  // Sort by popularity and get top options, but add some randomness
  const shuffled = [...allOptions].sort((a, b) => {
    const popularityDiff = b.popularity - a.popularity;
    const randomFactor = (Math.random() - 0.5) * 1; // Add some randomness
    return popularityDiff + randomFactor;
  });
  
  return shuffled.slice(0, count);
}
