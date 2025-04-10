import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/types";
import { compareItem } from "../utils/compareItem";

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  updateQuantity: (updatedItem: CartItem, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.dish.id === newItem.dish.id &&
              item.bun === newItem.bun &&
              item.doneness === newItem.doneness &&
              item.extras
                .map((e) => e._id)
                .sort()
                .join(",") ===
                newItem.extras
                  .map((e) => e._id)
                  .sort()
                  .join(",")
          );

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems };
          }

          return { items: [...state.items, newItem] };
        });
      },

      removeFromCart: (targetItem) => {
        set((state) => ({
          items: state.items.filter((item) => !compareItem(item, targetItem)),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const items = get().items;
        let total = 0;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          let extrasTotal = 0;

          for (let e = 0; e < item.extras.length; e++) {
            extrasTotal += item.extras[e].price;
          }

          const itemTotal = (item.dish.price + extrasTotal) * item.quantity;
          total += itemTotal;
        }

        return total;
      },
      updateQuantity: (updatedItem: CartItem, newQuantity: number) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (compareItem(item, updatedItem)) {
              return { ...item, quantity: newQuantity };
            }

            return item;
          }),
        }));
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
