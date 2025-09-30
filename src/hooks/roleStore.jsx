import { create } from "zustand";
import api from "../api/axios";

export const useRole = create((set) => ({
  data: [],
  isLoading: false,
  errorMessage: null,

  getRoleData: async () => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await api.get("/api/roles");
      console.log("role data", response.data.data);
      set({
        data: response.data.data ?? {},
        isLoading: false,
      });
    } catch (errorMessage) {
      set({ error: errorMessage.message, isLoading: false });
    }
  },
}));
