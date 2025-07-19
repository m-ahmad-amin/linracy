import { create } from "zustand";

export const usePostStore = create((set) => {
    return {
        isPosting: false,
        postCreated: false,
        setIsPosting: (value) => set({ isPosting: value }),
        setPostCreated: (value) => set({postCreated: value})
    }
})