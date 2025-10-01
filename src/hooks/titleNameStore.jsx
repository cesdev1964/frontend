import { create } from "zustand";
import api from "../api/axios";

export const useTitltName = create((set) => ({
  titleData: [],
  titleIsLoading: false,
  titleErrorMessage: null,
  success : false,

  getTitleNameData: async () => {
    set({ titleIsLoading: true, titleErrorMessage: null });
    try {
      const response = await api.get("/api/titles");
      console.log("role data", response.data.data);
      set({
        titleData: response.data.data ?? {},
        titleIsLoading: false,
      });
      return {success : true}
    } catch (errorMessage) {
      set({ titleErrorMessage: errorMessage.message, titleIsLoading: false });
      return {success : false}
    }
  },
}));