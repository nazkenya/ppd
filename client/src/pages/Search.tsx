import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Search as SearchIcon, Filter, X, Star, MapPin, ArrowLeft } from 'lucide-react';
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
  const [ambiance, setAmbiance] = useState<'Quiet' | 'Noisy' | ''>('');
  const [openUntil, setOpenUntil] = useState<string>(''); // HH:MM
  const [environment, setEnvironment] = useState<string>('');

  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const filteredCafes = cafes.filter(cafe => {
    const matchesQuery = cafe.name.toLowerCase().includes(query.toLowerCase()) || 
      cafe.address.toLowerCase().includes(query.toLowerCase());
    const matchesFacilities = facilities.length === 0 || facilities.every(f => cafe.facilities.includes(f));
    const matchesAmbiance = !ambiance || cafe.ambiance === ambiance;
    const matchesOpenUntil = !openUntil || timeToMinutes(cafe.closeTime) >= timeToMinutes(openUntil);
    return matchesQuery && matchesFacilities && matchesAmbiance && matchesOpenUntil;
  });

  const toggleFacility = (facility: string) => {
    setFacilities(prev => 
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
  };

  return (
    <MobileLayout>
      <div className="p-6 pb-24 min-h-screen">
        {/* Search Header */}
        <div className="flex gap-3 items-center mb-6 sticky top-0 bg-background/95 backdrop-blur-md py-2 z-10 -mx-6 px-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-full"
            onClick={() => setLocation('/home')}
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Cari kafe atau tempat..." 
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
          <p className="text-sm text-muted-foreground">{filteredCafes.length} hasil</p>
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
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <MapPin size={12} /> {cafe.address}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                  <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {cafe.ambiance === 'Quiet' ? 'Quiet / Focus' : 'Lively / Social'}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground">
                    Parking: {cafe.parking || 'N/A'}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground mb-3">Seating: {cafe.seatingCapacity}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                    {cafe.facilities.slice(0, 3).map(fac => (
                      <span key={fac} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{fac}</span>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-primary cursor-pointer hover:underline">Lihat Detail</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 flex items-end justify-center"
            >
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className="relative w-full max-w-md bg-background rounded-t-3xl p-6 h-[80vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-background pb-2 border-b border-border/50">
                  <h2 className="text-xl font-heading font-bold">Filter</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X size={24} />
                  </Button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold mb-3">Fasilitas</h3>
                    <div className="flex flex-wrap gap-3">
                      {['Wifi', 'Socket', 'Parking', 'Toilet', 'Prayer Room'].map(fac => (
                        <button 
                          key={fac}
                          onClick={() => toggleFacility(fac)}
                          className={cn(
                            "px-5 py-2 rounded-full text-sm font-semibold border border-border bg-white cursor-pointer transition-colors",
                            facilities.includes(fac) 
                              ? "border-primary text-primary bg-primary/5" 
                              : "text-foreground hover:border-primary/60"
                          )}
                        >
                          {fac}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3">Lingkungan</h3>
                    <div className="space-y-3 text-base">
                      {['Indoor', 'Indoor Smoking', 'Outdoor', 'Study Zone', 'Pet Friendly'].map(env => (
                        <label key={env} className="flex items-center gap-3 cursor-pointer" onClick={() => setEnvironment(prev => prev === env ? '' : env)}>
                          <span
                            className={cn(
                              "w-5 h-5 rounded-full border-2 border-border inline-flex items-center justify-center",
                              environment === env && "border-primary"
                            )}
                          >
                            {environment === env && <span className="w-2.5 h-2.5 rounded-full bg-primary block" />}
                          </span>
                          <span className="text-foreground">{env}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3">Suasana</h3>
                    <div className="flex gap-2">
                      {(['Quiet', 'Noisy'] as const).map(option => (
                        <button
                          key={option}
                          onClick={() => setAmbiance(prev => prev === option ? '' : option)}
                          className={cn(
                            "px-5 py-2 rounded-full text-sm font-semibold border border-border bg-white transition-colors",
                            ambiance === option 
                              ? "border-primary text-primary bg-primary/5" 
                              : "text-foreground hover:border-primary/60"
                          )}
                        >
                          {option === 'Quiet' ? 'Tenang / Fokus' : 'Ramai / Sosial'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3">Buka sampai</h3>
                    <div className="flex gap-2">
                      {['20:00', '22:00', '24:00'].map(time => (
                            <button
                              key={time}
                              onClick={() => setOpenUntil(prev => prev === time ? '' : time)}
                              className={cn(
                                "px-4 py-2 rounded-full text-sm font-semibold border transition-colors",
                                openUntil === time 
                                  ? "bg-primary text-primary-foreground border-primary" 
                                  : "bg-white text-foreground border-border hover:bg-secondary/80"
                              )}
                            >
                              {`Sampai ${time}`}
                            </button>
                          ))}
                    </div>
                    {openUntil && <p className="text-xs text-muted-foreground mt-2">Menampilkan kafe yang buka minimal sampai {openUntil}</p>}
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Rentang Harga</h3>
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
                      Terapkan Filter
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
}
