import { create } from "zustand";

export const useCartStore = create((set) => ({
    items: [],
    // helps to reflect changes to the client-side/local state in react application
    setItems: (items) => set({ items }),
    addToCart: async (product) => {
        try {
            console.log("Sending product to API:", product);
            const res = await fetch(`/api/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ product }),
            });
            const data = await res.json();
            console.log("Cart API response:", data);
            if (!data.success) return { success: false, message: data.message };
            else {
                set((state) => ({ items: [...state.items, data.data.item] }));
                return { success: true, message: data.message };
            }
        }
        catch (error) {
            return { success: false, message: "Server Error" };
        }
    },
    deleteCartItem: async (pid) => {
        try {
            const res = await fetch(`/api/cart/${pid}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };
            else {
                set((state) => ({ items: state.items.filter((item) => item.product._id !== pid) }));
                return { success: true, message: data.message };
            }
        }
        catch (error) {
            return { success: false, message: "Server Error" };
        }
    },
    fetchCart: async () => {
        try {
            const res = await fetch(`/api/cart`);
            const data = await res.json();
            if (data.success) set({ items: data.data.items });
        }
        catch (error) {
            return { success: false, message: "Server Error" };
        }
    },
    clearCart: async () => {
        try {
            const res = await fetch(`/api/cart`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) set({ items: [] });
        }
        catch (error) {
            return { success: false, message: "Server Error" };
        }
    },
}));
