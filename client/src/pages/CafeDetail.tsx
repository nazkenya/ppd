import React, { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { ArrowLeft, Heart, Share2, MapPin, Clock, Phone, Star, Wifi, Zap, Car, BookOpen, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cafes } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import MobileLayout from '@/components/MobileLayout';
import { Input } from '@/components/ui/input';
import { useCollections } from '@/context/CollectionsContext';
import { CollectionPicker } from '@/components/CollectionPicker';

const priceRangeMap: Record<string, string> = {
  '$': 'Rp 25k - 50k',
  '$$': 'Rp 50k - 100k',
  '$$$': 'Rp 100k - 200k',
};

export default function CafeDetail() {
  const [, params] = useRoute('/cafe/:id');
  const [, setLocation] = useLocation();
  const id = params?.id;
  const cafe = cafes.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState<'info' | 'facilities' | 'reviews'>('info');
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const [reviewQuery, setReviewQuery] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const { collections, addCafeToCollection } = useCollections();
  const isSaved = collections.some((col) => col.cafeIds.includes(cafe?.id || ''));

  if (!cafe) return <div>Kafe tidak ditemukan</div>;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${cafe.lat},${cafe.lng}`;
  const priceRangeText = priceRangeMap[cafe.priceRange] ?? 'Rp 50k - 100k';

  return (
    <MobileLayout hideNav>
      <div className="relative min-h-screen bg-background pb-16">
        {/* Hero Image / Carousel */}
        <div className="relative h-72 rounded-b-3xl overflow-hidden shadow-md">
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
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-none"
              onClick={() => setLocation('/home')}
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full bg-white/90 text-primary hover:bg-white border-none px-3 py-2 flex items-center gap-2"
                onClick={() => window.open(mapsUrl, '_blank')}
              >
                <Navigation size={18} className="text-primary" />
                <span className="text-xs font-semibold text-primary">Rute</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className={cn(
                  'rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-none',
                  isSaved && 'bg-accent/90 text-primary-foreground'
                )}
                onClick={() => setPickerOpen(true)}
              >
                <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-none">
                <Share2 size={20} />
              </Button>
            </div>
          </div>

          {/* Cafe Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h1 className="text-3xl font-heading font-bold mb-1">{cafe.name}</h1>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="bg-green-500/90 px-2 py-0.5 rounded text-xs">{cafe.isOpen ? 'BUKA' : 'TUTUP'}</span>
              <span className="flex items-center gap-1"><Star size={14} fill="currentColor" className="text-yellow-400" /> {cafe.rating} ({cafe.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="rounded-t-3xl bg-background -mt-8 relative z-20 px-6 pt-8 space-y-6">
          {/* Key facilities */}
          <div className="grid grid-cols-4 gap-2">
            {['Wifi', 'Socket', 'Parking', 'Prayer Room', 'Live Music', 'Outdoor', 'Toilet'].filter(f => cafe.facilities.includes(f)).slice(0,4).map(fac => (
              <div key={fac} className="flex items-center gap-2 rounded-xl border border-border/70 bg-card px-3 py-2 text-xs font-medium">
                {fac === 'Wifi' && <Wifi size={16} className="text-primary" />}
                {fac === 'Socket' && <Zap size={16} className="text-primary" />}
                {fac === 'Parking' && <Car size={16} className="text-primary" />}
                {fac === 'Prayer Room' && <BookOpen size={16} className="text-primary" />}
                {!['Wifi','Socket','Parking','Prayer Room'].includes(fac) && <Star size={14} className="text-accent" />}
                <span className="truncate">{fac}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex bg-muted/60 p-1 rounded-xl">
            {[
              { id: 'info', label: 'Informasi' },
              { id: 'facilities', label: 'Fasilitas' },
              { id: 'reviews', label: 'Ulasan' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 py-2 text-sm font-bold capitalize rounded-lg transition-all",
                  activeTab === tab.id ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
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
                    <h3 className="font-bold text-sm">Jam Operasional</h3>
                    <p className="text-sm text-muted-foreground">{cafe.openTime} - {cafe.closeTime}</p>
                    <details className="mt-2 text-xs bg-muted/60 rounded-lg p-2">
                      <summary className="cursor-pointer font-semibold text-foreground">Lihat per hari</summary>
                      <ul className="mt-2 space-y-1">
                        {Object.entries(cafe.weeklyHours).map(([day, hours]) => (
                          <li key={day} className="flex justify-between text-muted-foreground">
                            <span>{day}</span>
                            <span className="font-medium text-foreground">{hours}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                    <Car size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Parkir</h3>
                    <p className="text-sm text-muted-foreground">{cafe.parking}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Kapasitas</h3>
                    <p className="text-sm text-muted-foreground">{cafe.seatingCapacity}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Alamat</h3>
                    <p className="text-sm text-muted-foreground">{cafe.address}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Kontak</h3>
                    <p className="text-sm text-muted-foreground">{cafe.phone}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-2 border-t border-border">
                  <h3 className="font-bold mb-2">Tentang</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cafe.description}
                  </p>
                </div>
                
                {/* Menu Preview */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold">Menu Populer</h3>
                    <span className="text-xs text-primary font-medium">Lihat Menu Lengkap</span>
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
                    <div className="text-xs text-muted-foreground mt-1">{cafe.reviewCount} ulasan</div>
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

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">Cari ulasan</span>
                    <span className="text-xs text-muted-foreground">{cafe.reviews.length} total</span>
                  </div>
                    <Input
                    value={reviewQuery}
                    onChange={(e) => setReviewQuery(e.target.value)}
                    placeholder="Cari berdasarkan kata kunci atau nama..."
                    className="h-11 rounded-xl bg-card border-border"
                  />
                </div>

                <div className="space-y-4">
                  {cafe.reviews.length > 0 ? cafe.reviews
                    .filter(review => {
                      const term = reviewQuery.toLowerCase();
                      if (!term) return true;
                      return (
                        review.user.toLowerCase().includes(term) ||
                        review.comment.toLowerCase().includes(term)
                      );
                    })
                    .map(review => (
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
                    <div className="text-center text-muted-foreground py-8">Belum ada ulasan. Jadilah yang pertama!</div>
                  )}
                  {cafe.reviews.length > 0 && !cafe.reviews.some(review => review.user.toLowerCase().includes(reviewQuery.toLowerCase()) || review.comment.toLowerCase().includes(reviewQuery.toLowerCase())) && reviewQuery && (
                    <div className="text-center text-muted-foreground py-6">Tidak ada ulasan yang cocok dengan “{reviewQuery}”.</div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 left-0 right-0 px-5 pb-5 pt-3 bg-card/95 backdrop-blur-md border-t border-border/70 z-30">
          <div className="rounded-2xl border border-border/70 bg-background/90 px-4 py-3 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)] flex items-center gap-3">
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Rentang harga</div>
              <div className="text-lg font-bold text-foreground leading-tight">{priceRangeText}</div>
              <div className="text-[11px] text-muted-foreground">Per orang</div>
            </div>
            <div className="flex gap-2 ml-auto">
              <Button className="h-12 rounded-xl font-bold flex items-center gap-2" onClick={() => window.open(mapsUrl, '_blank')}>
                <Navigation size={18} /> Rute
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CollectionPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={(collectionId) => addCafeToCollection(cafe.id, collectionId)}
        title="Simpan kafe ini"
      />
    </MobileLayout>
  );
}
