export interface Hotel {
  id: string;
  name: string;
  country: string;
  city: string;
  price: number;
  images: string[];
  stars: number;
  rating: number;
  description: string;
}

export type ListHotels = Hotel[];
