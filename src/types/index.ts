export interface Review {
  id: string;
  userName: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'keyboards' | 'keycaps' | 'audio' | 'mice' | 'accessories';
  brand?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: 'Artisan' | 'Bestseller' | 'Limited Edition' | 'New Arrival' | 'Staff Pick';
  image: string;
  galleryImages?: string[];
  doodleIcon: string;
  description: string;
  fullDescription?: string;
  story?: string;
  specs: { [key: string]: string };
  tags: string[];
  soundProfile?: 'Linear' | 'Tactile' | 'Clicky' | 'Silent';
  colorVariants?: { name: string; hex: string }[];
  switchOptions?: string[];
  inStock: boolean;
  reviewsList?: Review[];
}

export interface Brand {
  id: string;
  name: string;
  category: 'keyboards' | 'keycaps' | 'audio' | 'mice' | 'accessories';
  logoIcon: string;
  tagline: string;
  productCount: number;
  featuredProductImage?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  count: number;
  description: string;
}

export interface DeskSetup {
  id: string;
  title: string;
  user: string;
  avatar: string;
  image: string;
  likes: number;
  taggedProducts: { id: string; name: string; price: number; x: number; y: number }[];
}

export interface SwitchSound {
  id: string;
  name: string;
  type: 'Linear' | 'Tactile' | 'Clicky' | 'Silent';
  profile: string;
  frequency: number;
  decay: number;
}
