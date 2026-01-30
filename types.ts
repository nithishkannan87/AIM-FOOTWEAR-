export enum Category {
  MEN = 'Men',
  WOMEN = 'Women',
  KIDS = 'Kids'
}

export enum ProductType {
  CASUAL = 'Casual',
  FORMAL = 'Formal',
  SPORTS = 'Sports',
  SANDALS = 'Sandals',
  SLIPPERS = 'Slippers'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // For discount display
  category: Category;
  type: ProductType;
  image: string;
  description: string;
  availableSizes: number[];
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  selectedSize: number;
  quantity: number;
}

export type SortOption = 'recommended' | 'priceLowHigh' | 'priceHighLow';
