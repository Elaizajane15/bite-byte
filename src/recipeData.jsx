// Mock recipe data
export const mockRecipes = [
  {
    id: '1',
    title: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish with eggs, cheese, and pancetta',
    cookTime: '20 minutes',
    servings: 4,
    difficulty: 'Medium',
    category: 'Italian',
    author: 'Maria Rossi',
    createdAt: '1/15/2024',
    likes: 24,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
    rating: 4.6,
    totalRatings: 23,
    ingredients: [
      '400g spaghetti',
      '200g pancetta or guanciale',
      '4 large eggs',
      '100g Pecorino Romano cheese',
      '2 cloves garlic',
      'Black pepper',
      'Salt'
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
      'While pasta cooks, cut pancetta into small cubes and cook in a large skillet until crispy.',
      'In a bowl, whisk together eggs, grated cheese, and black pepper.',
      'Drain pasta, reserving 1 cup of pasta water.',
      'Add hot pasta to the skillet with pancetta.',
      'Remove from heat and quickly stir in egg mixture, adding pasta water as needed.',
      'Serve immediately with extra cheese and black pepper.'
    ],
    tips: [
      'Read through all instructions before starting',
      'Prep all ingredients beforehand',
      'Taste and adjust seasoning as needed',
      'Have fun and don\'t be afraid to experiment!'
    ]
  },
  {
    id: '2',
    title: 'Thai Green Curry',
    description: 'Aromatic and spicy Thai curry with coconut milk and fresh herbs',
    cookTime: '30 minutes',
    servings: 4,
    difficulty: 'Medium',
    category: 'Asian',
    author: 'David Chen',
    createdAt: '1/12/2024',
    likes: 18,
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
    rating: 4.3,
    totalRatings: 12,
    ingredients: [
      '400ml coconut milk',
      '3 tbsp green curry paste',
      '500g chicken breast, sliced',
      '1 Thai eggplant, diced',
      '100g green beans',
      '2 tbsp fish sauce',
      '1 tbsp palm sugar',
      'Thai basil leaves',
      'Red chilies for garnish'
    ],
    instructions: [
      'Heat 2 tbsp coconut milk in a wok over medium heat.',
      'Add curry paste and cook for 2 minutes until fragrant.',
      'Add chicken and cook until no longer pink.',
      'Add remaining coconut milk, eggplant, and green beans.',
      'Season with fish sauce and palm sugar.',
      'Simmer for 15 minutes until vegetables are tender.',
      'Garnish with Thai basil and red chilies before serving.'
    ],
    tips: [
      'Use fresh curry paste for best flavor',
      'Adjust spice level to your preference',
      'Serve with jasmine rice'
    ]
  },
  {
    id: '3',
    title: 'Chocolate Chip Cookies',
    description: 'Perfectly chewy chocolate chip cookies that everyone loves',
    cookTime: '25 minutes',
    servings: 24,
    difficulty: 'Easy',
    category: 'Dessert',
    author: 'Sarah Johnson',
    createdAt: '1/10/2024',
    likes: 32,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
    rating: 4.8,
    totalRatings: 45,
    ingredients: [
      '2¼ cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '1 cup butter, softened',
      '¾ cup brown sugar',
      '¾ cup white sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '2 cups chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Mix flour, baking soda, and salt in a bowl.',
      'In another bowl, cream butter and both sugars until fluffy.',
      'Beat in eggs and vanilla.',
      'Gradually add flour mixture.',
      'Stir in chocolate chips.',
      'Drop rounded tablespoons onto baking sheets.',
      'Bake 9-11 minutes until golden brown.',
      'Cool on baking sheet for 2 minutes before transferring.'
    ],
    tips: [
      'Don\'t overbake for chewy cookies',
      'Use room temperature ingredients',
      'Chill dough for thicker cookies'
    ]
  },
];

export const categories = ['All', 'Italian', 'Asian', 'Mexican', 'American', 'Dessert', 'Vegetarian'];