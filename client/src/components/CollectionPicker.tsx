import React, { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/context/CollectionsContext';
import { Heart, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface CollectionPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (collectionId: string) => void;
  title?: string;
  allowCreate?: boolean;
}

export function CollectionPicker({
  open,
  onOpenChange,
  onSelect,
  title = 'Save to a collection',
  allowCreate = true,
}: CollectionPickerProps) {
  const { collections, createCollection } = useCollections();
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');

  const filtered = useMemo(
    () => collections.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [collections, search]
  );

  const handleCreate = () => {
    if (!newName.trim()) return;
    const created = createCollection(newName);
    if (created) {
      onSelect(created.id);
      onOpenChange(false);
      setNewName('');
      setSearch('');
    }
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-5">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Heart className="text-accent" size={18} /> {title}
          </DialogTitle>
          <DialogDescription>Pick a collection or make a new one.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            autoFocus
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl"
          />

          {allowCreate && (
            <div className="flex gap-2">
              <Input
                placeholder="New collection name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="rounded-xl"
              />
              <Button onClick={handleCreate} disabled={!newName.trim()} className="rounded-xl">
                <Plus size={16} className="mr-1" /> Add
              </Button>
            </div>
          )}

          <ScrollArea className="max-h-72 rounded-xl border border-border/80">
            <div className="p-2 space-y-2">
              {filtered.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-6">
                  {collections.length === 0
                    ? 'No collections yet. Create one to get started.'
                    : 'No collections match that search.'}
                </div>
              ) : (
                filtered.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => handleSelect(col.id)}
                    className={cn(
                      'w-full rounded-xl border border-border/70 bg-card px-3 py-3 text-left shadow-sm transition-all',
                      'hover:border-primary/60 hover:shadow'
                    )}
                  >
                    <div className="font-semibold">{col.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {col.cafeIds.length} saved cafe{col.cafeIds.length === 1 ? '' : 's'}
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
