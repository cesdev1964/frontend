import { create } from "zustand";
import api from "../api/axios";

export const usePosition = create((set) => ({
  positionData: [],
  positionIsLoading: false,
  positionErrorMessage: null,
  success: false,
  positionById: {},
  positionDropdown :[],
  getPositionData: async () => {
    set({ positionIsLoading: true, positionErrorMessage: null });
    try {
      const response = await api.get("/api/positions");
      // console.log("role data", response.data.data);
      set({
        positionData: response.data.data ?? [],
        positionIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        positionErrorMessage: errorMessage.message,
        positionIsLoading: false,
      });
      return { success: response.data.success };
    }
  },
  // มีเงื่อนไข แสดงเฉพาะ position ที่ active
  getPositionDropdown: async () => {
    set({ positionIsLoading: true, positionErrorMessage: null });
    try {
      const response = await api.get("/api/positions");
      const data = response.data.data ?? [];
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.positionId,
          label: item.positionName,
        }));
      set({
        positionDropdown: option,
        positionIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        positionErrorMessage: errorMessage.message,
        positionIsLoading: false,
      });
      return { success: response.data.success };
    }
  },
  getPositionById: async (id) => {
    set({ positionIsLoading: true, positionErrorMessage: null });
    try {
      const response = await api.get(`/api/positions/${id}`);
      //   console.log("role data", response.data.data);
      set({
        positionById: response.data.data ?? {},
        positionIsLoading: false,
      });
      return {
        positionById: response.data.data ?? {},
        positionIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        positionErrorMessage: errorMessage.message,
        positionIsLoading: false,
      });
      return {
        positionIsLoading: false,
        positionErrorMessage: errorMessage.message,
      };
    }
  },
  createPosition: async (requestData) => {
    set({ positionIsLoading: true, positionErrorMessage: null });
    try {
      const response = await api.post("/api/positions", requestData);
      return {
        positionIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        positionErrorMessage: error?.response?.data?.message || error.message,
        positionIsLoading: false,
        success: response.data.success,
      });
      return {
        positionErrorMessage: error?.response?.data?.message || error.message,
        positionIsLoading: false,
        success: response.data.success,
      };
    }
  },
  deletePosition: async (id) => {
    console.log("id ", id);
    set({ positionIsLoading: true, positionErrorMessage: null });
    try {
      const response = await api.delete(`/api/positions/${id}`);
      return {
        positionIsLoading: false,
        positionErrorMessage: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({
        positionErrorMessage: error?.response?.data?.message || error.message,
        positionIsLoading: false,
        success: false,
      });
      return {
        positionErrorMessage: error?.response?.data?.message || error.message,
        positionIsLoading: false,
        success: false,
      };
    }
  },
  updatePosition: async (requestData, id) => {
    set({ positionIsLoading: true, positionErrorMessage: null });
    try {
      const response = await api.put(`/api/positions/${id}`, requestData);
      return {
        positionIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        positionErrorMessage: error?.response?.data?.message || error.message,
        positionIsLoading: false,
        success: response.data.success,
      });
      return {
        positionErrorMessage: error?.response?.data?.message || error.message,
        positionIsLoading: false,
        success: response.data.success,
      };
    }
  },
}));
