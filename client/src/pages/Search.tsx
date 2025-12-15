import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Search as SearchIcon, Filter, X, Star, MapPin } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { cafes } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [facilities, setFacilities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]); // Percentage

  const filteredCafes = cafes.filter(cafe => 
    cafe.name.toLowerCase().includes(query.toLowerCase()) || 
    cafe.address.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFacility = (facility: string) => {
    setFacilities(prev => 
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
  };

  return (
    <MobileLayout>
      <div className="p-6 pb-24 min-h-screen">
        {/* Search Header */}
        <div className="flex gap-3 mb-6 sticky top-0 bg-background/95 backdrop-blur-md py-2 z-10 -mx-6 px-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Search Cafe or Place..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-11 w-11 rounded-xl bg-white border-border"
            onClick={() => setShowFilters(true)}
          >
            <Filter size={20} />
          </Button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-muted-foreground">{filteredCafes.length} found</p>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {filteredCafes.map((cafe, index) => (
            <motion.div 
              key={cafe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setLocation(`/cafe/${cafe.id}`)}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 group cursor-pointer"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={cafe.images[0]} alt={cafe.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                  {cafe.distance}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-heading font-bold text-lg">{cafe.name}</h3>
                  <div className="flex items-center gap-1 text-accent font-bold text-sm">
                    <Star size={14} fill="currentColor" /> {cafe.rating} <span className="text-muted-foreground font-normal">({cafe.reviewCount})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin size={12} /> {cafe.address}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    {cafe.facilities.slice(0, 3).map(fac => (
                      <span key={fac} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{fac}</span>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-primary cursor-pointer hover:underline">View Detail</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Drawer */}
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setShowFilters(false)}
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-background z-50 rounded-t-3xl p-6 h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-background pb-2 border-b border-border/50">
                  <h2 className="text-xl font-heading font-bold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X size={24} />
                  </Button>
                </div>

                <div className="space-y-8">
                  {/* Facilities */}
                  <div>
                    <h3 className="font-bold mb-3">Facilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Wifi', 'Socket', 'Parking', 'Toilet', 'Prayer Room'].map(fac => (
                        <div 
                          key={fac}
                          onClick={() => toggleFacility(fac)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium border cursor-pointer transition-colors",
                            facilities.includes(fac) 
                              ? "bg-primary text-primary-foreground border-primary" 
                              : "bg-white text-muted-foreground border-border hover:bg-secondary"
                          )}
                        >
                          {fac}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Environment */}
                  <div>
                    <h3 className="font-bold mb-3">Environment</h3>
                    <div className="space-y-3">
                      {['Indoor', 'Indoor Smoking', 'Outdoor', 'Study Zone', 'Pet Friendly'].map(env => (
                        <div key={env} className="flex items-center space-x-3">
                          <Checkbox id={env} className="rounded-md" />
                          <Label htmlFor={env} className="text-base font-normal cursor-pointer">{env}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-bold mb-4">Price Range</h3>
                    <Slider 
                      defaultValue={[0, 100]} 
                      max={100} 
                      step={1} 
                      className="mb-2"
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground font-mono">
                      <span>Rp 0</span>
                      <span>{'>'} Rp 500.000</span>
                    </div>
                  </div>

                  <div className="pt-4 pb-8">
                    <Button className="w-full h-12 rounded-xl text-lg font-bold shadow-lg" onClick={() => setShowFilters(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
}
