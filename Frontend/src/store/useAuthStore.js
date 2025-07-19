import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set, get) => {
  return {
    authUser: null,
    isCheckingAuth: true,

    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/check");

        set({ authUser: res.data });
      } catch (error) {
        // if (error.response?.data?.message) {
        //   toast.error(error.response.data.message);
        // } else {
        //   toast.error("Something went wrong");
        // }
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },
  };
});
