// @s/store/userStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  clearUser: () => set({ user: null, token: null }),
}));

export default useUserStore;
