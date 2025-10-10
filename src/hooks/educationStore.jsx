import { create } from "zustand";
import api from "../api/axios";

export const useEducation = create((set) => ({
  educationData: [],
  educationDropdown : [],
  educationIsLoading: false,
  educationErrorMessage: null,
  success: false,
  educationById: {},

  getEducationData: async () => {
    set({ educationIsLoading: true, educationErrorMessage: null });
    try {
      const response = await api.get("/api/educations");
      // console.log("role data", response.data.data);
      set({
        educationData: response.data.data ?? [],
        educationIsLoading: false,
      });
      return { success: response.data.success };
    } catch (error) {
      set({ educationErrorMessage: error.response.data.message, educationIsLoading: false });
      return { success: response.data.success };
    }
  },

  getEducationDropdown: async () => {
    set({ educationIsLoading: true, educationErrorMessage: null });
    try {
      const response = await api.get("/api/educations");
      // console.log("role data", response.data.data)
      const option = response.data.data ? response.data.data.map(item=>({
        value : item.educationId,
        label : item.educationName
      })): []

      set({
        educationDropdown: option,
        educationIsLoading: false,
      });
      return { success: response.data.success };
    } catch (error) {
      set({ educationErrorMessage: error?.response?.data?.message, educationIsLoading: false });
      return { success: response.data.success };
    }
  },
  getEducationById: async (id) => {
    set({ educationIsLoading: true, educationErrorMessage: null });
    try {
      const response = await api.get(`/api/educations/${id}`);
      //   console.log("role data", response.data.data);
      set({
        educationById: response.data.data ?? {},
        educationIsLoading: false,
      });
      return {
        educationById: response.data.data ?? {},
        educationIsLoading: false,
      };
    } catch (error) {
      set({ educationErrorMessage: error?.response?.data?.message, educationIsLoading: false });
      return {
        educationIsLoading: false,
        educationErrorMessage: error?.response?.data?.message,
      };
    }
  },
  createEducation: async (requestData) => {
    set({ educationIsLoading: true, educationErrorMessage: null });
    try {
      const response = await api.post("/api/educations", requestData);
      return {
        educationIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        educationErrorMessage: error?.response?.data?.message || error.message,
        educationIsLoading: false,
        success: false,
      });
      return {
        educationErrorMessage: error?.response?.data?.message || error.message,
        educationIsLoading: false,
        success: false,
      };
    }
  },
  deleteEducation: async (id) => {
    set({ educationIsLoading: true, educationErrorMessage: null });
    try {
      const response = await api.delete(`/api/educations/${id}`);
      return {
        educationIsLoading: false,
        educationErrorMessage: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({
        educationErrorMessage: error?.response?.data?.message || error.message,
        educationIsLoading: false,
        success: false,
      });
      return {
        educationErrorMessage: error?.response?.data?.message || error.message,
        educationIsLoading: false,
        success: false,
      };
    }
  },
  updateEducation: async (requestData, id) => {
    set({ educationIsLoading: true, educationErrorMessage: null });
    try {
      const response = await api.put(`/api/educations/${id}`, requestData);
      return {
        educationIsLoading: false,
        success: response.data.success,
      };
    }  catch (error) {
      set({
        educationErrorMessage: error?.response?.data?.message || error.message,
        educationIsLoading: false,
        success: false,
      });
      return {
        educationErrorMessage: error?.response?.data?.message || error.message,
        educationIsLoading: false,
        success: false,
      };
    }
  },
}));
