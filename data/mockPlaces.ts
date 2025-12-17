export interface Place {
  _id: string;
  name: string;
  location: string; // e.g., "Kerala, India"
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  duration: string; // e.g., "3 Days / 2 Nights"
  category: "Beach" | "Mountain" | "City" | "Heritage" | "Forest";
  amenities: string[];
  images: string[];
  lat: number;
  lon: number;
  isFeatured?: boolean;
}

export const MOCK_PLACES: Place[] = [
  {
    _id: "654321654321654321654321",
    name: "Munnar Tea Gardens Escape",
    location: "Kerala, India",
    description:
      "Immerse yourself in the rolling hills and tea plantations of Munnar. Experience the cool climate, visit the tea museum, and spot the Nilgiri Tahr.",
    price: 12999,
    rating: 4.9,
    reviewsCount: 320,
    duration: "3 Days / 2 Nights",
    category: "Mountain",
    amenities: ["Breakfast", "Guide", "Trekking", "Bonfire", "Hotel"],
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop",
    ],
    lat: 10.0889,
    lon: 77.0595,
    isFeatured: true,
  },
  {
    _id: "654321654321654321654322",
    name: "Goa Beach Party & Chill",
    location: "Goa, India",
    description:
      "The ultimate beach getaway. Enjoy water sports at Baga Beach, explore Portuguese architecture, and enjoy the vibrant nightlife.",
    price: 15499,
    rating: 4.7,
    reviewsCount: 510,
    duration: "4 Days / 3 Nights",
    category: "Beach",
    amenities: ["Dinner", "Scooter Rental", "Scuba Diving", "Club Entry"],
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop",
    ],
    lat: 15.2993,
    lon: 74.124,
    isFeatured: true,
  },
  {
    _id: "654321654321654321654323",
    name: "Jaipur Royal Heritage Tour",
    location: "Rajasthan, India",
    description:
      "Walk through the Pink City. Visit the Hawa Mahal, Amer Fort, and experience authentic Rajasthani culture and food.",
    price: 8999,
    rating: 4.8,
    reviewsCount: 180,
    duration: "2 Days / 1 Night",
    category: "Heritage",
    amenities: ["Breakfast", "Fort Entry", "Camel Ride", "Guide"],
    images: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop",
    ],
    lat: 26.9124,
    lon: 75.7873,
    isFeatured: false,
  },
  {
    _id: "654321654321654321654324",
    name: "Rishikesh Rafting Adventure",
    location: "Uttarakhand, India",
    description:
      "Feel the adrenaline with white water rafting in the Ganges, followed by a spiritual evening at the Ganga Aarti.",
    price: 6500,
    rating: 4.6,
    reviewsCount: 120,
    duration: "2 Days / 1 Night",
    category: "Mountain",
    amenities: ["Rafting Gear", "Camping", "Meals", "Bonfire"],
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop",
    ],
    lat: 30.0869,
    lon: 78.2676,
    isFeatured: false,
  },
];
