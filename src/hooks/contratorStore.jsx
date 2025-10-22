import { create } from "zustand";
import api from "../api/axios";
const url = "/api/contractors"

export const useContrator = create((set) => ({
  contratorData: [],
  contratorIsLoading: false,
  contratorErrorMessage: null,
  success: false,
  contratorById: {},
  contratorDropdown: [],

  getContratorData: async () => {
    set({ contratorIsLoading: true, contratorErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data);
      set({
        contratorData: response.data.data ?? [],
        contratorIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        contratorErrorMessage: errorMessage.message,
        contratorIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getContratorDropdown: async () => {
    set({ contratorIsLoading: true, contratorErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data)
      const data = response.data.data ?? [];
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.contractorId,
          label: item.contractorName,
        }));
      set({
        contratorDropdown: option,
        contratorIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        contratorErrorMessage: errorMessage.message,
        contratorIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getContratorById: async (id) => {
    set({ contratorIsLoading: true, contratorErrorMessage: null });
    try {
      const response = await api.get(`${url}/${id}`);
      //   console.log("role data", response.data.data);
      set({
        contratorById: response.data.data ?? {},
        contratorIsLoading: false,
      });
      return {
        contratorById: response.data.data ?? {},
        contratorIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        contratorErrorMessage: errorMessage.response?.data?.message,
        contratorIsLoading: false,
      });
      return {
        contratorIsLoading: false,
        contratorErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },
  createContrator: async (requestData) => {
    set({ contratorIsLoading: true, contratorErrorMessage: null });
    try {
      const response = await api.post(url, requestData);
      return {
        contratorIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        contratorErrorMessage: error?.response?.data?.message || error.message,
        contratorIsLoading: false,
        success: false,
      });
      return {
        contratorErrorMessage: error?.response?.data?.message || error.message,
        contratorIsLoading: false,
        success: false,
      };
    }
  },
  updateContrator: async (requestData, id) => {
    set({ contratorIsLoading: true, contratorErrorMessage: null });
    try {
      await api.put(`${url}/${id}`, requestData);
      return {
        contratorIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        contratorErrorMessage: error?.response?.data?.message || error.message,
        contratorIsLoading: false,
        success: false,
      });
      return {
        contratorErrorMessage: error?.response?.data?.message || error.message,
        contratorIsLoading: false,
        success: false,
      };
    }
  },
}));
