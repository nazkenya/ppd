import React, { useMemo, useState } from 'react';
import { Heart, Plus, FolderPlus, Search, MapPin, Star } from 'lucide-react';
import { useLocation } from 'wouter';
import MobileLayout from '@/components/MobileLayout';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCollections } from '@/context/CollectionsContext';
import { CollectionPicker } from '@/components/CollectionPicker';
import { cafes } from '@/lib/mockData';

export default function Favorites() {
  const [, setLocation] = useLocation();
  const { collections, createCollection } = useCollections();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const totalSaved = collections.reduce((sum, col) => sum + col.cafeIds.length, 0);

  const handleCreate = () => {
    const created = createCollection(newName);
    if (created) {
      setShowCreate(false);
      setNewName('');
    }
  };

  const selectedCollection = useMemo(
    () => collections.find((c) => c.id === selectedCollectionId) || null,
    [collections, selectedCollectionId]
  );

  const selectedCafes = useMemo(() => {
    if (!selectedCollection) return [];
    return cafes.filter((c) => selectedCollection.cafeIds.includes(c.id));
  }, [selectedCollection]);

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="text-primary fill-primary" />
            <h1 className="text-xl font-heading font-bold">Koleksi Tersimpan</h1>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-border/70 bg-card/80 p-6 text-center space-y-3 shadow-sm">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <FolderPlus className="text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold">Koleksi</h2>
            <p className="text-sm text-muted-foreground">
              Kelompokkan kedai kopi favoritmu. Ketuk + untuk membuat koleksi baru.
            </p>
          </div>
            <Button className="rounded-xl w-full" onClick={() => setShowCreate(true)}>
            <Plus size={16} className="mr-2" /> Tambah koleksi
          </Button>
        </div>

        {collections.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {collections.length} koleksi • {totalSaved} tersimpan
              </div>
              <Button variant="ghost" size="sm" className="text-primary" onClick={() => setPickerOpen(true)}>
                <Search size={16} className="mr-1" /> Telusuri
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {collections.map((col) => (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedCollectionId(col.id)}
                  className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm cursor-pointer hover:border-primary/60"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{col.name}</div>
                    <div className="text-xs text-muted-foreground">{col.cafeIds.length} tersimpan</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogContent className="rounded-2xl p-6">
          <DialogHeader className="text-left">
            <DialogTitle>Buat koleksi</DialogTitle>
            <DialogDescription>Beri nama koleksi agar kamu bisa menyimpan kafe di dalamnya.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
              <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="mis. Kopi pagi"
              className="rounded-xl"
            />
            <Button className="w-full rounded-xl" disabled={!newName.trim()} onClick={handleCreate}>
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CollectionPicker open={pickerOpen} onOpenChange={setPickerOpen} onSelect={() => setPickerOpen(false)} />

      <Dialog open={Boolean(selectedCollection)} onOpenChange={(open) => !open && setSelectedCollectionId(null)}>
        <DialogContent className="rounded-2xl p-6 max-w-md">
            <DialogHeader className="text-left">
            <DialogTitle>{selectedCollection?.name}</DialogTitle>
            <DialogDescription>
              {selectedCollection?.cafeIds.length || 0} kafe dalam koleksi ini.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {selectedCafes.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">Belum ada kafe yang tersimpan.</div>
            ) : (
              selectedCafes.map((cafe) => (
                <button
                  key={cafe.id}
                  onClick={() => setLocation(`/cafe/${cafe.id}`)}
                  className="w-full text-left rounded-xl border border-border/70 bg-card p-3 shadow-sm hover:border-primary/60"
                >
                  <div className="flex items-center gap-3">
                    <img src={cafe.images[0]} alt={cafe.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold">{cafe.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin size={12} /> {cafe.address}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Star size={12} className="text-accent" fill="currentColor" /> {cafe.rating} ({cafe.reviewCount})
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
