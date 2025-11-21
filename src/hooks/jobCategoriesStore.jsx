import { create } from "zustand";
import api from "../api/axios";
const url = "/api/job-category";

export const useJobCategory = create((set) => ({
  jobCategoryData: [],
  jobCategoryIsLoading: false,
  jobCategoryErrorMessage: null,
  success: false,
  jobCategoryById: {},
  jobCategoryDropdown: [],

  getJobCategoryData: async () => {
    set({ jobCategoryIsLoading: true, jobCategoryErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data);
      set({
        jobCategoryData: response.data.data ?? [],
        jobCategoryIsLoading: false,
      });
      return { success: true };
    } catch (errorMessage) {
      set({
        jobCategoryErrorMessage: errorMessage.message,
        jobCategoryIsLoading: false,
      });
      return { success: false };
    }
  },

  getJobCategoryDropdown: async () => {
    set({ jobCategoryIsLoading: true, jobCategoryErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data)
      const data = response.data.data ?? [];
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.otTypeId,
          label: `(${item.otTypeCode})` + " " + item.otTypeName,
        }));
      set({
        jobCategoryDropdown: option,
        jobCategoryIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        jobCategoryErrorMessage: errorMessage.message,
        jobCategoryIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getJobCategoryById: async (id) => {
    set({ jobCategoryIsLoading: true, jobCategoryErrorMessage: null });
    try {
      const response = await api.get(`${url}/${id}`);
      //   console.log("role data", response.data.data);
      set({
        jobCategoryById: response.data.data ?? {},
        jobCategoryIsLoading: false,
      });
      return {
        jobCategoryById: response.data.data ?? {},
        jobCategoryIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        jobCategoryErrorMessage: errorMessage.response?.data?.message,
        jobCategoryIsLoading: false,
      });
      return {
        jobCategoryIsLoading: false,
        jobCategoryErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },
  createJobCategory: async (requestData) => {
    set({ jobCategoryIsLoading: true, jobCategoryErrorMessage: null });
    try {
      const response = await api.post(url, requestData);
      return {
        jobCategoryIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        jobCategoryErrorMessage: error?.response?.data?.message || error.message,
        jobCategoryIsLoading: false,
        success: false,
      });
      return {
        jobCategoryErrorMessage: error?.response?.data?.message || error.message,
        jobCategoryIsLoading: false,
        success: false,
      };
    }
  },
  updateJobCategory: async (requestData, id) => {
    set({ jobCategoryIsLoading: true, jobCategoryErrorMessage: null });
    try {
      await api.put(`${url}/${id}`, requestData);
      return {
        jobCategoryIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        jobCategoryErrorMessage: error?.response?.data?.message || error.message,
        jobCategoryIsLoading: false,
        success: false,
      });
      return {
        jobCategoryErrorMessage: error?.response?.data?.message || error.message,
        jobCategoryIsLoading: false,
        success: false,
      };
    }
  },
}));
