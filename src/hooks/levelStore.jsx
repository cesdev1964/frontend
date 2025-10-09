import { create } from "zustand";
import api from "../api/axios";

export const useLevel = create((set) => ({
  levelData: [],
  levelIsLoading: false,
  levelErrorMessage: null,
  success: false,
  levelById: {},

  getLevelData: async () => {
    set({ levelIsLoading: true, levelErrorMessage: null });
    try {
      const response = await api.get("/api/levels");
      // console.log("role data", response.data.data);
      set({
        levelData: response.data.data ?? [],
        levelIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({ levelErrorMessage: errorMessage.message, levelIsLoading: false });
      return { success: response.data.success };
    }
  },
  getLevelDropdown: async () => {
    set({ levelIsLoading: true, levelErrorMessage: null });
    try {
      const response = await api.get("/api/levels");
      const option = response.data.data
        ? response.data.data.map((item) => ({
            value: item.levelId,
            label: item.levelName,
          }))
        : [];

      set({
        levelData: option,
        levelIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({ levelErrorMessage: errorMessage.message, levelIsLoading: false });
      return { success: response.data.success };
    }
  },
  getLevelById: async (id) => {
    set({ levelIsLoading: true, levelErrorMessage: null });
    try {
      const response = await api.get(`/api/levels/${id}`);
      //   console.log("role data", response.data.data);
      set({
        levelById: response.data.data ?? {},
        levelIsLoading: false,
      });
      return {
        levelById: response.data.data ?? {},
        levelIsLoading: false,
      };
    } catch (errorMessage) {
      set({ levelErrorMessage: errorMessage.message, levelIsLoading: false });
      return {
        levelIsLoading: false,
        levelErrorMessage: errorMessage.message,
      };
    }
  },
  createLevel: async (requestData) => {
    set({ levelIsLoading: true, levelErrorMessage: null });
    try {
      const response = await api.post("/api/levels", requestData);
      return {
        levelIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        levelErrorMessage: error?.response?.data?.message || error.message,
        levelIsLoading: false,
        success: response.data.success,
      });
      return {
        levelErrorMessage: error?.response?.data?.message || error.message,
        levelIsLoading: false,
        success: response.data.success,
      };
    }
  },
  deleteLevel: async (id) => {
    console.log("id ", id);
    set({ levelIsLoading: true, levelErrorMessage: null });
    try {
      const response = await api.delete(`/api/levels/${id}`);
      return {
        levelIsLoading: false,
        levelErrorMessage: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({
        levelErrorMessage: error?.response?.data?.message || error.message,
        levelIsLoading: false,
        success: false,
      });
      return {
        levelErrorMessage: error?.response?.data?.message || error.message,
        levelIsLoading: false,
        success: false,
      };
    }
  },
  updateLevel: async (requestData, id) => {
    set({ levelIsLoading: true, levelErrorMessage: null });
    try {
      const response = await api.put(`/api/levels/${id}`, requestData);
      return {
        levelIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        levelErrorMessage: error?.response?.data?.message || error.message,
        levelIsLoading: false,
        success: response.data.success,
      });
      return {
        levelErrorMessage: error?.response?.data?.message || error.message,
        levelIsLoading: false,
        success: response.data.success,
      };
    }
  },
}));
