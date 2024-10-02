import { create } from 'zustand';

export const useListingStore = create((set) => ({
    puppies: [],

    // Fetch all listings
    getAllListings: async () => {
        try {
            const res = await fetch("http://localhost:3000/api/listing");
            if (!res.ok) {
                const error = await res.json();
                return { success: false, message: error.message || "Failed to fetch listings" };
            }

            const data = await res.json();
            set({ puppies: data}); // Update state with the fetched data
            return { success: true, message: "Listings fetched successfully" };
        } catch (error) {
            return { success: false, message: error.message || "Failed to fetch listings" };
        }
    },
}));