import { create } from "zustand";
import api from "../api/axios";
const url = "/api/ot-types"

export const useOTType = create((set) => ({
  otTypeData: [],
  otTypeIsLoading: false,
  otTypeErrorMessage: null,
  success: false,
  otTypeById: {},
  otTypeDropdown: [],

  getOtTypeData: async () => {
    set({ otTypeIsLoading: true, otTypeErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data);
      set({
        otTypeData: response.data.data ?? [],
        otTypeIsLoading: false,
      });
      return { success: true };
    } catch (errorMessage) {
      set({
        otTypeErrorMessage: errorMessage.message,
        otTypeIsLoading: false,
      });
      return { success: false };
    }
  },

  getOtTypeDropdown: async () => {
    set({ otTypeIsLoading: true, otTypeErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data)
      const data = response.data.data ?? [];
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.otTypeId,
          label: `(${item.otTypeCode})`+" "+item.otTypeName,
        }));
      set({
        otTypeDropdown: option,
        otTypeIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        otTypeErrorMessage: errorMessage.message,
        otTypeIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getOtTypeById: async (id) => {
    set({ otTypeIsLoading: true, otTypeErrorMessage: null });
    try {
      const response = await api.get(`${url}/${id}`);
      //   console.log("role data", response.data.data);
      set({
        otTypeById: response.data.data ?? {},
        otTypeIsLoading: false,
      });
      return {
        otTypeById: response.data.data ?? {},
        otTypeIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        otTypeErrorMessage: errorMessage.response?.data?.message,
        otTypeIsLoading: false,
      });
      return {
        otTypeIsLoading: false,
        otTypeErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },
  createOtType: async (requestData) => {
    set({ otTypeIsLoading: true, otTypeErrorMessage: null });
    try {
      const response = await api.post(url, requestData);
      return {
        otTypeIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        otTypeErrorMessage: error?.response?.data?.message || error.message,
        otTypeIsLoading: false,
        success: false,
      });
      return {
        otTypeErrorMessage: error?.response?.data?.message || error.message,
        otTypeIsLoading: false,
        success: false,
      };
    }
  },
  updateOtType: async (requestData, id) => {
    set({ otTypeIsLoading: true, otTypeErrorMessage: null });
    try {
      await api.put(`${url}/${id}`, requestData);
      return {
        otTypeIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        otTypeErrorMessage: error?.response?.data?.message || error.message,
        otTypeIsLoading: false,
        success: false,
      });
      return {
        otTypeErrorMessage: error?.response?.data?.message || error.message,
        otTypeIsLoading: false,
        success: false,
      };
    }
  },
}));
