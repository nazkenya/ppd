import interior1 from '@assets/stock_images/modern_cozy_coffee_s_6f21fac6.jpg';
import interior2 from '@assets/stock_images/modern_cozy_coffee_s_40e52ca8.jpg';
import latte1 from '@assets/stock_images/latte_art_coffee_cup_e1677264.jpg';
import latte2 from '@assets/stock_images/latte_art_coffee_cup_b9317b19.jpg';
import exterior from '@assets/stock_images/cafe_exterior_storef_d496f81d.jpg';
import pastries from '@assets/stock_images/delicious_pastries_i_cd413911.jpg';

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Coffee' | 'Non-Coffee' | 'Food';
  image?: string;
}

export interface Cafe {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  address: string;
  ambiance: 'Quiet' | 'Noisy';
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  weeklyHours: Record<string, string>;
  phone: string;
  priceRange: string; 
  parking: string;
  seatingCapacity: string;
  images: string[];
  facilities: string[]; 
  tags: string[];
  description: string;
  reviews: Review[];
  menu: MenuItem[];
  lat: number;
  lng: number;
}

export const cafes: Cafe[] = [
  {
    id: '1',
    name: 'Brew Haven',
    rating: 4.8,
    reviewCount: 324,
    distance: '3.2km',
    address: 'Jl. Merdeka No. 45, Jakarta',
    ambiance: 'Quiet',
    isOpen: true,
    openTime: '07:00',
    closeTime: '22:00',
    weeklyHours: {
      Monday: '07:00 - 22:00',
      Tuesday: '07:00 - 22:00',
      Wednesday: '07:00 - 22:00',
      Thursday: '07:00 - 22:00',
      Friday: '07:00 - 23:00',
      Saturday: '08:00 - 23:00',
      Sunday: '08:00 - 21:00',
    },
    phone: '+62 812-3456-7890',
    priceRange: '$$',
    parking: 'Street & limited on-site',
    seatingCapacity: 'Best for 2-6 people',
    images: [interior1, latte1, pastries, exterior],
    facilities: ['Wifi', 'Socket', 'Toilet', 'Prayer Room'],
    tags: ['Indoor', 'Study Zone', 'Cozy'],
    description: 'A cozy spot perfect for studying or catching up with friends. Famous for our signature Brew Latte and freshly baked croissants.',
    reviews: [
      { id: 'r1', user: 'Sarah M.', rating: 5, comment: 'Best coffee in town! The ambiance is perfect for working.', date: '2 days ago' },
      { id: 'r2', user: 'John D.', rating: 4, comment: 'Great coffee, but can get a bit crowded on weekends.', date: '1 week ago' }
    ],
    menu: [
      { id: 'm1', name: 'Brew Latte', price: 35000, category: 'Coffee', image: latte1 },
      { id: 'm2', name: 'Cappuccino', price: 32000, category: 'Coffee' },
      { id: 'm3', name: 'Almond Croissant', price: 28000, category: 'Food', image: pastries }
    ],
    lat: -6.1751,
    lng: 106.8650
  },
  {
    id: '2',
    name: 'Garden Bistro',
    rating: 4.5,
    reviewCount: 156,
    distance: '1.2km',
    address: 'Jl. Pahlawan No. 12, Jakarta',
    ambiance: 'Noisy',
    isOpen: true,
    openTime: '08:00',
    closeTime: '23:00',
    weeklyHours: {
      Monday: '08:00 - 23:00',
      Tuesday: '08:00 - 23:00',
      Wednesday: '08:00 - 23:00',
      Thursday: '08:00 - 23:00',
      Friday: '08:00 - 00:00',
      Saturday: '08:00 - 00:00',
      Sunday: '08:00 - 22:00',
    },
    phone: '+62 811-9876-5432',
    priceRange: '$$$',
    parking: 'Valet & on-site',
    seatingCapacity: 'Great for groups up to 10',
    images: [exterior, interior2, latte2],
    facilities: ['Wifi', 'Parking', 'Toilet', 'Outdoor'],
    tags: ['Outdoor', 'Pet Friendly', 'Nature'],
    description: 'Enjoy your coffee surrounded by lush greenery. Our outdoor seating area is perfect for pet owners.',
    reviews: [
      { id: 'r3', user: 'Mike R.', rating: 5, comment: 'My dog loves this place! Great staff too.', date: '3 days ago' }
    ],
    menu: [
      { id: 'm4', name: 'Iced Americano', price: 30000, category: 'Coffee' },
      { id: 'm5', name: 'Avocado Toast', price: 55000, category: 'Food' }
    ],
    lat: -6.1760,
    lng: 106.8660
  },
  {
    id: '3',
    name: 'Minimalist Coffee',
    rating: 4.2,
    reviewCount: 89,
    distance: '4.5km',
    address: 'Jl. Sudirman Kav 5, Jakarta',
    ambiance: 'Quiet',
    isOpen: false,
    openTime: '09:00',
    closeTime: '20:00',
    weeklyHours: {
      Monday: '09:00 - 20:00',
      Tuesday: '09:00 - 20:00',
      Wednesday: '09:00 - 20:00',
      Thursday: '09:00 - 20:00',
      Friday: '09:00 - 21:00',
      Saturday: '09:00 - 21:00',
      Sunday: 'Closed',
    },
    phone: '+62 813-5555-1212',
    priceRange: '$',
    parking: 'Street only',
    seatingCapacity: 'Cozy, best for 1-3 people',
    images: [interior2, latte1],
    facilities: ['Wifi', 'Socket'],
    tags: ['Indoor', 'Quiet', 'Minimalist'],
    description: 'Strictly coffee. No distractions. The best place for deep work.',
    reviews: [],
    menu: [
      { id: 'm6', name: 'Espresso', price: 25000, category: 'Coffee' },
      { id: 'm7', name: 'Pour Over', price: 40000, category: 'Coffee' }
    ],
    lat: -6.1740,
    lng: 106.8640
  },
  {
    id: '4',
    name: 'Retro Beans',
    rating: 4.7,
    reviewCount: 210,
    distance: '2.8km',
    address: 'Jl. Kemang Raya, Jakarta',
    ambiance: 'Noisy',
    isOpen: true,
    openTime: '10:00',
    closeTime: '24:00',
    weeklyHours: {
      Monday: '10:00 - 23:00',
      Tuesday: '10:00 - 23:00',
      Wednesday: '10:00 - 23:00',
      Thursday: '10:00 - 23:00',
      Friday: '10:00 - 24:00',
      Saturday: '10:00 - 24:00',
      Sunday: '10:00 - 22:00',
    },
    phone: '+62 812-9988-7766',
    priceRange: '$$',
    parking: 'On-site lot',
    seatingCapacity: 'Fits groups up to 8 comfortably',
    images: [interior1, pastries],
    facilities: ['Wifi', 'Toilet', 'Live Music'],
    tags: ['Indoor', 'Retro', 'Music'],
    description: 'Step back in time with our retro-themed decor and classic playlist. Live jazz every Friday night.',
    reviews: [],
    menu: [
      { id: 'm8', name: 'Vietnam Drip', price: 28000, category: 'Coffee' },
      { id: 'm9', name: 'Fried Banana', price: 20000, category: 'Food' }
    ],
    lat: -6.1770,
    lng: 106.8630
  }
];
