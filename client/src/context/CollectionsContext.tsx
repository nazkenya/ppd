import React, { createContext, useContext, useMemo, useState } from 'react';

export type Collection = { id: string; name: string; cafeIds: string[] };

type CollectionsContextValue = {
  collections: Collection[];
  createCollection: (name: string) => Collection | null;
  addCafeToCollection: (cafeId: string, collectionId: string) => void;
};

const CollectionsContext = createContext<CollectionsContextValue | undefined>(undefined);

const initialCollections: Collection[] = [
  { id: 'col-1', name: 'Weekday Work Spots', cafeIds: ['1', '3'] },
  { id: 'col-2', name: 'Brunch with Friends', cafeIds: ['2'] },
];

export function CollectionsProvider({ children }: { children: React.ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);

  const createCollection = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return null;
    const newCollection: Collection = { id: `col-${Date.now()}`, name: trimmed, cafeIds: [] };
    setCollections((prev) => [...prev, newCollection]);
    return newCollection;
  };

  const addCafeToCollection = (cafeId: string, collectionId: string) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId && !col.cafeIds.includes(cafeId)
          ? { ...col, cafeIds: [...col.cafeIds, cafeId] }
          : col
      )
    );
  };

  const value = useMemo(
    () => ({
      collections,
      createCollection,
      addCafeToCollection,
    }),
    [collections]
  );

  return <CollectionsContext.Provider value={value}>{children}</CollectionsContext.Provider>;
}

export function useCollections() {
  const ctx = useContext(CollectionsContext);
  if (!ctx) throw new Error('useCollections must be used within CollectionsProvider');
  return ctx;
}
