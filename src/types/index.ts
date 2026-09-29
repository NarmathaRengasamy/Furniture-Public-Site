export interface ColorOption {
  name: string;
  hex: string;
}

export interface Dimensions {
  width: string;
  depth: string;
  height: string;
  weight: string;
  unit: string;
}

export interface Product {
  id: string;
  _id?: string;
  title: string;
  subtitle: string;
  category: string;
  room: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  features: string[];
  dimensions: Dimensions;
  materials: string[];
  colors: ColorOption[];
  images: string[];
  videoDemoUrl?: string;
  inStock: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  designer: string;
  careInstructions: string;
  shippingInfo: string;
}

export interface Category {
  id: string;
  label: string;
  count: number;
}

export interface CompanyInfo {
  name: string;
  brand: string;
  tagline: string;
  phone: string;
  phoneNumber: string;
  email: string;
  website: string;
  address: string;
  operatingHours: string;
  establishedYear: string;
  pdfCatalogueUrl: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  product: string;
  rating: number;
  comment: string;
  verified: boolean;
  date: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface BrandStat {
  num: string;
  label: string;
}
