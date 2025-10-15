import { create } from "zustand";
import api from "../api/axios";
const url = "/api/flows"

export const useFlow = create((set) => ({
  flowData: [],
  flowIsLoading: false,
  flowErrorMessage: null,
  success: false,
  flowById: {},
  flowDropdown: [],

  getFlowData: async () => {
    set({ flowIsLoading: true, flowErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data);
      set({
        flowData: response.data.data ?? [],
        flowIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        flowErrorMessage: errorMessage.message,
        flowIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getFlowDropdown: async () => {
    set({ flowIsLoading: true, flowErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data)
      const data = response.data.data ?? [];
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.flowId,
          label: item.flowName,
        }));
      set({
        flowDropdown: option,
        flowIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        flowErrorMessage: errorMessage.message,
        flowIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getFlowById: async (id) => {
    set({ flowIsLoading: true, flowErrorMessage: null });
    try {
      const response = await api.get(`${url}/${id}`);
      //   console.log("role data", response.data.data);
      set({
        flowById: response.data.data ?? {},
        flowIsLoading: false,
      });
      return {
        flowById: response.data.data ?? {},
        flowIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        flowErrorMessage: errorMessage.response?.data?.message,
        flowIsLoading: false,
      });
      return {
        flowIsLoading: false,
        flowErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },
  createFlow: async (requestData) => {
    set({ flowIsLoading: true, flowErrorMessage: null });
    try {
      const response = await api.post(url, requestData);
      return {
        flowIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        flowErrorMessage: error?.response?.data?.message || error.message,
        flowIsLoading: false,
        success: false,
      });
      return {
        flowErrorMessage: error?.response?.data?.message || error.message,
        flowIsLoading: false,
        success: false,
      };
    }
  },
  deleteFlow: async (id) => {
    console.log("id ", id);
    set({ flowIsLoading: true, flowErrorMessage: null });
    try {
      await api.delete(`${url}/${id}`);
      return {
        flowIsLoading: false,
        flowErrorMessage: null,
        success: true,
      };
    } catch (error) {
      set({
        flowErrorMessage: error?.response?.data?.message || error.message,
        flowIsLoading: false,
        success: false,
      });
      return {
        flowErrorMessage: error?.response?.data?.message || error.message,
        flowIsLoading: false,
        success: false,
      };
    }
  },
  updateFlow: async (requestData, id) => {
    set({ flowIsLoading: true, flowErrorMessage: null });
    try {
      await api.put(`${url}/${id}`, requestData);
      return {
        flowIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        flowErrorMessage: error?.response?.data?.message || error.message,
        flowIsLoading: false,
        success: false,
      });
      return {
        flowErrorMessage: error?.response?.data?.message || error.message,
        flowIsLoading: false,
        success: false,
      };
    }
  },
}));