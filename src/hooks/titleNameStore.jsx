import { create } from "zustand";
import api from "../api/axios";

export const useTitltName = create((set) => ({
  titleData: [],
  titleIsLoading: false,
  titleErrorMessage: null,
  success: false,
  titleById: {},
  titleDropdown:[],
  getTitleNameData: async () => {
    set({ titleIsLoading: true, titleErrorMessage: null });
    try {
      const response = await api.get("/api/titles");
      // console.log("role data", response.data.data);
      set({
        titleData: response.data.data ?? [],
        titleIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({ titleErrorMessage: errorMessage.response?.data?.message, titleIsLoading: false });
      return { success: response.data.success };
    }
  },
  getNameTitleById: async (id) => {
    set({ titleIsLoading: true, titleErrorMessage: null });
    try {
      const response = await api.get(`/api/titles/${id}`);
      //   console.log("role data", response.data.data);
      set({
        titleById: response.data.data ?? {},
        titleIsLoading: false,
      });
      return {
        titleById: response.data.data ?? {},
        titleIsLoading: false,
      };
    } catch (errorMessage) {
      set({ titleErrorMessage: errorMessage.response?.data?.message, titleIsLoading: false });
      return {
        titleIsLoading: false,
        titleErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },

   getTitleDropdown: async () => {
    set({ titleIsLoading: true, titleErrorMessage: null });
    try {
      const response = await api.get("/api/titles");
      const data = response.data.data ?? [];
      const option = data
        .map((item) => ({
          value: item.titleId,
          label: item.titleNameTH,
        }));
      set({
        titleDropdown: option,
        titleErrorMessage: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        jobErrorMessage: error?.response?.data?.message,
        jobIsLoading: false,
      });
      return { success: response.data.success };
    }
  },
  createTitle: async (requestData) => {
    set({ titleIsLoading: true, titleErrorMessage: null });
    try {
      const response = await api.post("/api/titles", requestData);
      console.log("response",response);
      return {
        titleIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        titleErrorMessage: error?.response?.data?.message || error.message,
        titleIsLoading: false,
        success: false,
      });
      return {
        titleErrorMessage: error?.response?.data?.message || error.message,
        titleIsLoading: false,
        success: false,
      };
    }
  },
  deleteTitle: async (id) => {
      console.log("id ",id)
    set({ titleIsLoading: true, titleErrorMessage: null });
    try {
      const response = await api.delete(`/api/titles/${id}`);
      return {
        titleIsLoading: false,
        titleErrorMessage: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({
        titleErrorMessage: error?.response?.data?.message || error.message,
        titleIsLoading: false,
        success: false,
      });
      return {
        titleErrorMessage: error?.response?.data?.message || error.message,
        titleIsLoading: false,
        success: false,
      };
    }
  },
  updateTitle: async (requestData, id) => {
    set({ titleIsLoading: true, titleErrorMessage: null });
    try {
    const response =   await api.put(`/api/titles/${id}`, requestData);
      return {
        titleIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        titleErrorMessage: error?.response?.data?.message || error.message,
        titleIsLoading: false,
        success: false,
      });
      return {
        titleErrorMessage: error?.response?.data?.message || error.message,
        titleIsLoading: false,
        success: false,
      };
    }
  },
}));
