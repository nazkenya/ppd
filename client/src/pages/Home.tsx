import React from 'react';
import { useLocation, Link } from 'wouter';
import { Search, MapPin, Bell, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MobileLayout from '@/components/MobileLayout';
import { cafes } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function Home() {
  const [, setLocation] = useLocation();

  const categories = [
    { name: 'Coffee', icon: '☕' },
    { name: 'Non-Coffee', icon: '🥤' },
    { name: 'Pastry', icon: '🥐' },
    { name: 'Food', icon: '🍝' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <MapPin size={14} /> Jakarta, Indonesia
            </span>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Good Morning, Peeps!
            </h1>
          </div>
          <Link href="/profile">
             <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-primary/20 cursor-pointer">
               <User className="text-primary" />
             </div>
          </Link>
        </div>

        {/* Search */}
        <div className="relative" onClick={() => setLocation('/search')}>
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <div className="w-full h-12 pl-10 pr-4 rounded-2xl bg-white border border-border flex items-center text-muted-foreground cursor-text shadow-sm">
            Search Cafe or Place...
          </div>
          <div className="absolute right-3 top-3 bg-primary p-1 rounded-lg">
             <div className="w-4 h-0.5 bg-white mb-0.5"></div>
             <div className="w-4 h-0.5 bg-white"></div>
          </div>
        </div>

        {/* Nearby Cafes - Horizontal Scroll */}
        <div className="space-y-3">
          <div className="flex justify-between items-end px-1">
            <h2 className="text-lg font-bold font-heading">Nearest Cafe</h2>
            <Link href="/search" className="text-xs text-primary font-medium hover:underline">See All</Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
            {cafes.map((cafe, index) => (
              <motion.div 
                key={cafe.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setLocation(`/cafe/${cafe.id}`)}
                className="min-w-[220px] bg-card rounded-2xl p-3 shadow-md border border-border/50 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="h-32 rounded-xl overflow-hidden mb-3 relative">
                  <img src={cafe.images[0]} alt={cafe.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-foreground flex items-center gap-1">
                    ⭐ {cafe.rating}
                  </div>
                </div>
                <h3 className="font-bold text-lg truncate">{cafe.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{cafe.address}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-primary">{cafe.distance}</span>
                  <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{cafe.isOpen ? 'OPEN' : 'CLOSED'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="flex justify-between px-2">
           {categories.map((cat) => (
             <div key={cat.name} className="flex flex-col items-center gap-2 cursor-pointer group">
               <div className="w-16 h-16 bg-white border border-border rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:bg-primary/10 group-hover:scale-105 transition-all">
                 {cat.icon}
               </div>
               <span className="text-xs font-medium text-muted-foreground">{cat.name}</span>
             </div>
           ))}
        </div>

        {/* Recommended - Vertical List */}
        <div className="space-y-4 pb-4">
          <div className="flex justify-between items-end px-1">
            <h2 className="text-lg font-bold font-heading">Recommended for You</h2>
            <Link href="/search" className="text-xs text-primary font-medium hover:underline">See All</Link>
          </div>

          <div className="space-y-4">
            {[...cafes].reverse().map((cafe, index) => (
              <motion.div 
                key={cafe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                onClick={() => setLocation(`/cafe/${cafe.id}`)}
                className="bg-card rounded-2xl p-3 shadow-sm border border-border/50 flex gap-4 hover:bg-secondary/20 transition-colors cursor-pointer"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={cafe.images[1] || cafe.images[0]} alt={cafe.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{cafe.name}</h3>
                    <span className="text-xs font-bold text-accent flex items-center gap-1">⭐ {cafe.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{cafe.description}</p>
                  <div className="flex gap-2">
                    {cafe.tags.slice(0,2).map(tag => (
                      <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-md">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-2 text-xs font-medium text-primary">
                    {cafe.distance} • {cafe.priceRange}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
