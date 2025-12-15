import React, { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { ArrowLeft, Heart, Share2, MapPin, Clock, Phone, Star, Wifi, Zap, Car, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cafes } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';

export default function CafeDetail() {
  const [, params] = useRoute('/cafe/:id');
  const [, setLocation] = useLocation();
  const id = params?.id;
  const cafe = cafes.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState<'info' | 'facilities' | 'reviews'>('info');
  const [emblaRef] = useEmblaCarousel({ loop: true });

  if (!cafe) return <div>Cafe not found</div>;

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero Image / Carousel */}
      <div className="relative h-72">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {cafe.images.map((img, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 relative">
                <img src={img} alt={`${cafe.name} ${idx}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Nav */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-none"
            onClick={() => setLocation('/home')}
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-none">
              <Heart size={20} />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-none">
              <Share2 size={20} />
            </Button>
          </div>
        </div>

        {/* Cafe Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-heading font-bold mb-1">{cafe.name}</h1>
          <div className="flex items-center gap-2 text-sm font-medium">
             <span className="bg-green-500/90 px-2 py-0.5 rounded text-xs">OPEN</span>
             <span className="flex items-center gap-1"><Star size={14} fill="currentColor" className="text-yellow-400" /> {cafe.rating} ({cafe.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="rounded-t-3xl bg-background -mt-6 relative z-20 px-6 pt-8">
        {/* Tabs */}
        <div className="flex bg-muted/50 p-1 rounded-xl mb-6">
          {['info', 'facilities', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "flex-1 py-2 text-sm font-bold capitalize rounded-lg transition-all",
                activeTab === tab ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Operational Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Operational Hours</h3>
                  <p className="text-sm text-muted-foreground">{cafe.openTime} - {cafe.closeTime}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Address</h3>
                  <p className="text-sm text-muted-foreground">{cafe.address}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Contact</h3>
                  <p className="text-sm text-muted-foreground">{cafe.phone}</p>
                </div>
              </div>

               {/* Description */}
               <div className="pt-2 border-t border-border">
                 <h3 className="font-bold mb-2">About</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   {cafe.description}
                 </p>
               </div>
               
               {/* Menu Preview */}
               <div>
                 <div className="flex justify-between items-center mb-3">
                   <h3 className="font-bold">Popular Menu</h3>
                   <span className="text-xs text-primary font-medium">See Full Menu</span>
                 </div>
                 <div className="space-y-3">
                   {cafe.menu.map(item => (
                     <div key={item.id} className="flex justify-between items-center p-3 rounded-xl border border-border bg-card">
                       <div className="flex items-center gap-3">
                         {item.image ? (
                           <img src={item.image} className="w-12 h-12 rounded-lg object-cover bg-muted" />
                         ) : (
                           <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">☕</div>
                         )}
                         <div>
                           <div className="font-bold text-sm">{item.name}</div>
                           <div className="text-xs text-muted-foreground">{item.category}</div>
                         </div>
                       </div>
                       <div className="font-bold text-primary">Rp {item.price.toLocaleString()}</div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="grid grid-cols-2 gap-4">
              {cafe.facilities.map((fac, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-6 border border-border rounded-2xl bg-card hover:border-primary/50 transition-colors">
                  {fac === 'Wifi' && <Wifi size={32} className="mb-2 text-primary" />}
                  {fac === 'Socket' && <Zap size={32} className="mb-2 text-primary" />}
                  {fac === 'Parking' && <Car size={32} className="mb-2 text-primary" />}
                  {fac === 'Prayer Room' && <BookOpen size={32} className="mb-2 text-primary" />}
                  {!['Wifi', 'Socket', 'Parking', 'Prayer Room'].includes(fac) && <div className="text-3xl mb-2">✨</div>}
                  <span className="font-medium text-sm">{fac}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
             <div className="space-y-6">
               <div className="flex items-center gap-6 bg-card p-6 rounded-2xl border border-border">
                 <div className="text-center">
                   <div className="text-4xl font-bold font-heading text-primary">{cafe.rating}</div>
                   <div className="flex text-accent text-sm"><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /></div>
                   <div className="text-xs text-muted-foreground mt-1">{cafe.reviewCount} reviews</div>
                 </div>
                 <div className="flex-1 space-y-1">
                   {['Food', 'Ambience', 'Service', 'Price'].map(cat => (
                     <div key={cat} className="flex items-center gap-2 text-xs">
                       <span className="w-16 font-medium">{cat}</span>
                       <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                         <div className="h-full bg-primary w-[80%] rounded-full"></div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="space-y-4">
                 {cafe.reviews.length > 0 ? cafe.reviews.map(review => (
                   <div key={review.id} className="border-b border-border pb-4 last:border-0">
                     <div className="flex justify-between mb-2">
                       <div className="font-bold text-sm">{review.user}</div>
                       <div className="text-xs text-muted-foreground">{review.date}</div>
                     </div>
                     <div className="flex text-accent mb-2">
                       {Array.from({length: 5}).map((_, i) => (
                         <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-muted"} />
                       ))}
                     </div>
                     <p className="text-sm text-muted-foreground">{review.comment}</p>
                   </div>
                 )) : (
                   <div className="text-center text-muted-foreground py-8">No reviews yet. Be the first!</div>
                 )}
               </div>
             </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-30 flex gap-4">
         <div className="flex flex-col justify-center">
           <span className="text-xs text-muted-foreground">Price range</span>
           <span className="font-bold text-primary text-lg">{cafe.priceRange}</span>
         </div>
         <Button className="flex-1 h-12 rounded-xl text-lg font-bold shadow-lg" onClick={() => setLocation('/order')}>
           Order Now
         </Button>
      </div>
    </div>
  );
}
