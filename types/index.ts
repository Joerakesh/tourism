// types/index.ts
export interface Place {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number; // 1-5
  location: string;
  images: string[];
  duration?: string; // e.g., "3 Days"
}

export interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}
