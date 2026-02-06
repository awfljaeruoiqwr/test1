import { create } from 'zustand';
import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  toggleDrawer: (open?: boolean) => void;
  clearCart: () => void;
  totalCount: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
  setQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    })),
  toggleDrawer: (open) => set((state) => ({ isOpen: open ?? !state.isOpen })),
  clearCart: () => set({ items: [] }),
  totalCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
  totalPrice: () => get().items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
}));
