import { create } from "zustand";

export type FavoriteProps = {
  mal_id: number;
  title: string;
  score: number;
  images: { webp: { image_url: string; large_image_url: string } };
};

const useFavoriteStore = create((set) => ({
  totalItems: 0,
  items: [],
  addFavorite: (favorite: FavoriteProps) => {
    set((state: { items: FavoriteProps[]; totalItems: number }) => {
      const isFavourited = state.items.some((item) => item?.mal_id === favorite.mal_id);
      return !isFavourited
        ? {
            items: [...state.items, favorite],
            totalItems: state.totalItems + 1,
          }
        : state;
    });
  },
  removeFavorite: (mal_id: number) => {
    set((state: { items: FavoriteProps[]; totalItems: number }) => {
      const filteredItems = state.items.filter((item) => item?.mal_id !== mal_id);

      return {
        items: filteredItems,
        totalItems: filteredItems.length,
      };
    });
  },
  resetFavorite: () => {
    set({
      items: [],
      totalItems: 0,
    });
  },
}));

export default useFavoriteStore;
