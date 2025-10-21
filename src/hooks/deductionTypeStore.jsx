import { create } from "zustand";
import api from "../api/axios";
const url = "/api/deductionTypes"

export const useDeduction = create((set) => ({
  deductionData: [],
  deductionIsLoading: false,
  deductionErrorMessage: null,
  success: false,
  deductionById: {},
  deductionDropdown: [],

  getDeductionData: async () => {
    set({ deductionIsLoading: true, deductionErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data);
      set({
        deductionData: response.data.data ?? [],
        deductionIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        deductionErrorMessage: errorMessage.message,
        deductionIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getDeductionDropdown: async () => {
    set({ deductionIsLoading: true, deductionErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data)
      const data = response.data.data ?? [];
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.deductionTypeId,
          label: item.deductionTypeName,
        }));
      set({
        deductionDropdown: option,
        deductionIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        deductionErrorMessage: errorMessage.message,
        deductionIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getDeductionById: async (id) => {
    set({ deductionIsLoading: true, deductionErrorMessage: null });
    try {
      const response = await api.get(`${url}/${id}`);
      //   console.log("role data", response.data.data);
      set({
        deductionById: response.data.data ?? {},
        deductionIsLoading: false,
      });
      return {
        deductionById: response.data.data ?? {},
        deductionIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        deductionErrorMessage: errorMessage.response?.data?.message,
        deductionIsLoading: false,
      });
      return {
        deductionIsLoading: false,
        deductionErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },
  createDeduction: async (requestData) => {
    set({ deductionIsLoading: true, deductionErrorMessage: null });
    try {
      const response = await api.post(url, requestData);
      return {
        deductionIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        deductionErrorMessage: error?.response?.data?.message || error.message,
        deductionIsLoading: false,
        success: false,
      });
      return {
        deductionErrorMessage: error?.response?.data?.message || error.message,
        deductionIsLoading: false,
        success: false,
      };
    }
  },
  updateDeduction: async (requestData, id) => {
    set({ deductionIsLoading: true, deductionErrorMessage: null });
    try {
      await api.put(`${url}/${id}`, requestData);
      return {
        deductionIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        deductionErrorMessage: error?.response?.data?.message || error.message,
        deductionIsLoading: false,
        success: false,
      });
      return {
        deductionErrorMessage: error?.response?.data?.message || error.message,
        deductionIsLoading: false,
        success: false,
      };
    }
  },
}));