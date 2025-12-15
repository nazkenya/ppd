import React from 'react';
import { useLocation } from 'wouter';
import { Search, MapPin, Star, Heart } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { cafes } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function Favorites() {
  const [, setLocation] = useLocation();
  // Mock favorites - just take the first two
  const favoriteCafes = cafes.slice(0, 2);

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="text-primary fill-primary" />
            <h1 className="text-xl font-heading font-bold">Bookmark Manager</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
             <span className="text-xs font-bold text-primary">2</span>
          </div>
        </div>

        {/* Search Bookmarks */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <div className="w-full h-12 pl-10 pr-4 rounded-2xl bg-white border border-border flex items-center text-muted-foreground cursor-text shadow-sm">
            Search bookmark...
          </div>
        </div>

        <p className="text-sm text-muted-foreground">Found 2 bookmarks</p>

        <div className="space-y-4">
          {favoriteCafes.map((cafe, index) => (
            <motion.div 
              key={cafe.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setLocation(`/cafe/${cafe.id}`)}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 group cursor-pointer"
            >
              <div className="h-32 overflow-hidden relative">
                <img src={cafe.images[0]} alt={cafe.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                  <h3 className="text-white font-heading font-bold text-xl">{cafe.name}</h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-start text-xs text-muted-foreground mb-3">
                  <div className="space-y-1">
                     <div className="flex items-center gap-1"><MapPin size={12} /> {cafe.address}</div>
                     <div className="flex items-center gap-1"><Star size={12} className="text-accent" fill="currentColor" /> {cafe.rating} ({cafe.reviewCount}) • {cafe.distance}</div>
                  </div>
                  <div className="font-medium text-primary bg-secondary px-2 py-1 rounded-md">{cafe.openTime} - {cafe.closeTime}</div>
                </div>
                <div className="w-full h-10 rounded-xl border border-primary text-primary font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  View Detail
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
