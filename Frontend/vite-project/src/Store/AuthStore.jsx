import { create } from "zustand";

export const useAuthStore = create((set) => ({
    users: [],
    setuser : (user) => {
        set({users: user});
    },


    //Creating a new user
    createUser: async (newUser) => {
        if (!newUser.name || !newUser.password || !newUser.telephone || !newUser.email || !newUser.profile) {
            return { success: false, message: "All fields are required" };
        }
        try {
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            if (!res.ok) {
                const error = await res.json();
                return { success: false, message: error.message || "Failed to create user" };
            }

            const data = await res.json();
            set({ users: data }); // Update state with the fetched data
            return { success: true, message: "User created successfully" };
        } catch (error) {
            return { success: false, message: error.message || "Failed to create user" };
        }
    },

    //Getting all users
    getAllUsers: async () => {
        try {
            const res = await fetch("http://localhost:3000/api/auth");
            if (!res.ok) {
                const error = await res.json();
                return { success: false, message: error.message || "Failed to fetch users" };
            }

            const data = await res.json();
            set({ users: data }); // Update state with the fetched data
            return { success: true, message: "Users fetched successfully" };
        } catch (error) {
            return { success: false, message: error.message || "Failed to fetch users" };
        }
    },
}));