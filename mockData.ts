import { Category, Product, ProductType } from './types';

// Using direct Unsplash URLs for realistic sneaker and slipper images

export const PRODUCTS: Product[] = [
  // Men's Sneakers
  {
    id: 'm1',
    name: 'Walkaroo Sporty Red Kicks',
    price: 1299,
    originalPrice: 1599,
    category: Category.MEN,
    type: ProductType.SPORTS,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    description: 'High-performance sporty sneakers in a bold red colorway. Breathable mesh upper.',
    availableSizes: [7, 8, 9, 10, 11],
    rating: 4.5,
    reviewsCount: 120,
    isNew: true
  },
  {
    id: 'm2',
    name: 'Walkaroo Navy Canvas Sneakers',
    price: 899,
    category: Category.MEN,
    type: ProductType.CASUAL,
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=80&w=600',
    description: 'Classic canvas sneakers in navy. Timeless design for everyday comfort.',
    availableSizes: [6, 7, 8, 9, 10],
    rating: 4.2,
    reviewsCount: 85
  },
  {
    id: 'm3',
    name: 'Walkaroo Urban White High-Tops',
    price: 2499,
    originalPrice: 2999,
    category: Category.MEN,
    type: ProductType.CASUAL,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
    description: 'Premium leather high-top sneakers. Clean, minimalist white design for the urban explorer.',
    availableSizes: [7, 8, 9, 10, 11],
    rating: 4.8,
    reviewsCount: 45
  },
  // Men's Slippers/Slides
  {
    id: 'm4',
    name: 'Walkaroo Comfort Slides',
    price: 599,
    category: Category.MEN,
    type: ProductType.SLIPPERS,
    image: 'https://images.unsplash.com/photo-1603487742131-4160d6e66c6e?auto=format&fit=crop&q=80&w=600',
    description: 'Ergonomic slides with arch support. Perfect for post-workout or home use.',
    availableSizes: [6, 7, 8, 9, 10],
    rating: 4.0,
    reviewsCount: 200
  },
  // Women's Sneakers
  {
    id: 'w1',
    name: 'Walkaroo Pink Running Shoes',
    price: 1199,
    originalPrice: 1499,
    category: Category.WOMEN,
    type: ProductType.SPORTS,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=600',
    description: 'Lightweight runners in a vibrant pink. Cushioned sole for long distance comfort.',
    availableSizes: [4, 5, 6, 7, 8],
    rating: 4.6,
    reviewsCount: 150,
    isNew: true
  },
  // Women's Slippers/Sandals
  {
    id: 'w2',
    name: 'Walkaroo Beach Flip-Flops',
    price: 499,
    category: Category.WOMEN,
    type: ProductType.SLIPPERS,
    image: 'https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&q=80&w=600',
    description: 'Durable and colorful flip-flops, essential for your beach bag.',
    availableSizes: [4, 5, 6, 7, 8],
    rating: 4.3,
    reviewsCount: 92
  },
  {
    id: 'w3',
    name: 'Walkaroo Cozy House Slippers',
    price: 349,
    category: Category.WOMEN,
    type: ProductType.SLIPPERS,
    image: 'https://plus.unsplash.com/premium_photo-1673966524316-c7447d48601c?auto=format&fit=crop&q=80&w=600',
    description: 'Soft faux-fur lined slippers to keep your toes warm and cozy.',
    availableSizes: [4, 5, 6, 7, 8],
    rating: 4.1,
    reviewsCount: 320
  },
  // Kids
  {
    id: 'k1',
    name: 'Walkaroo Kids Velcro Sneakers',
    price: 999,
    category: Category.KIDS,
    type: ProductType.SPORTS,
    image: 'https://images.unsplash.com/photo-1514989940723-e8875ea01cd7?auto=format&fit=crop&q=80&w=600',
    description: 'Rugged velcro sneakers for active kids. Easy on and off.',
    availableSizes: [1, 2, 3, 4, 5],
    rating: 4.7,
    reviewsCount: 60
  },
  {
    id: 'k2',
    name: 'Walkaroo Kids Garden Clogs',
    price: 499,
    category: Category.KIDS,
    type: ProductType.SLIPPERS,
    image: 'https://images.unsplash.com/photo-1614165936126-2ed18e471b10?auto=format&fit=crop&q=80&w=600',
    description: 'Waterproof clogs with back strap. Fun, safe, and easy to clean.',
    availableSizes: [1, 2, 3, 4, 5],
    rating: 4.4,
    reviewsCount: 110
  },
  // Extra
  {
    id: 'm5',
    name: 'Walkaroo Marathon Runner',
    price: 1499,
    category: Category.MEN,
    type: ProductType.SPORTS,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=600',
    description: 'Pro-level running shoes with advanced shock absorption.',
    availableSizes: [7, 8, 9, 10],
    rating: 4.5,
    reviewsCount: 30
  },
  {
    id: 'w4',
    name: 'Walkaroo Casual Slip-Ons',
    price: 899,
    category: Category.WOMEN,
    type: ProductType.CASUAL,
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=600',
    description: 'Effortless slip-on sneakers for a casual, laid-back look.',
    availableSizes: [5, 6, 7, 8],
    rating: 4.2,
    reviewsCount: 45
  },
   {
    id: 'm6',
    name: 'Walkaroo Retro Street Sneaker',
    price: 2199,
    category: Category.MEN,
    type: ProductType.CASUAL,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600',
    description: 'Retro-inspired street sneakers with premium build quality.',
    availableSizes: [8, 9, 10, 11],
    rating: 4.6,
    reviewsCount: 12
  }
];