import { create } from "zustand";
import api from "../api/axios";

export const useJob = create((set) => ({
  jobData: [],
  jobIsLoading: false,
  jobErrorMessage: null,
  success: false,
  jobById: {},
  jobDropdown: [],
  getJobData: async () => {
    set({ jobIsLoading: true, jobErrorMessage: null });
    try {
      const response = await api.get("/api/jobs");
      // console.log("role data", response.data.data);
      set({
        jobData: response.data.data ?? [],
        jobIsLoading: false,
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

  getJobDropdown: async () => {
    set({ jobIsLoading: true, jobErrorMessage: null });
    try {
      const response = await api.get("/api/jobs");
      const data = response.data.data ?? [];
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.jobId,
          label: item.jobNo,
        }));
      set({
        jobDropdown: option,
        jobIsLoading: false,
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

  getJobDropdownAll: async () => {
    set({ jobIsLoading: true, jobErrorMessage: null });
    try {
      const response = await api.get("/api/jobs");
      const data = response.data.data ?? [];
      const option = data.map((item) => ({
          value: item.jobId,
          label: item.jobNo,
        }));
      set({
        jobDropdown: option,
        jobIsLoading: false,
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

  getJobById: async (id) => {
    set({ jobIsLoading: true, jobErrorMessage: null });
    try {
      const response = await api.get(`/api/jobs/${id}`);
      //   console.log("role data", response.data.data);
      set({
        jobById: response.data.data ?? {},
        jobIsLoading: false,
      });
      return {
        jobById: response.data.data ?? {},
        jobIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        jobErrorMessage: errorMessage?.response?.data?.message,
        jobIsLoading: false,
      });
      return {
        jobIsLoading: false,
        jobErrorMessage: response.data?.message,
      };
    }
  },
  createJob: async (requestData) => {
    set({ jobIsLoading: true, jobErrorMessage: null });
    try {
      const response = await api.post("/api/jobs", requestData);
      return {
        jobIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        jobErrorMessage: error?.response?.data?.message || error.message,
        jobIsLoading: false,
        success: false,
      });
      return {
        jobErrorMessage: error?.response?.data?.message || error.message,
        jobIsLoading: false,
        success: false,
      };
    }
  },
  deleteJob: async (id) => {
    set({ jobIsLoading: true, jobErrorMessage: null });
    await api.delete(`/api/jobs/${id}`);
    try {
      return {
        jobIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        jobErrorMessage: error?.response?.data?.message || error.message,
        jobIsLoading: false,
        success: false,
      });
      return {
        jobErrorMessage: error?.response?.data?.message || error.message,
        jobIsLoading: false,
        success: false,
      };
    }
  },
  updateJob: async (requestData, id) => {
    set({ jobIsLoading: true, jobErrorMessage: null });
    try {
      const response = await api.put(`/api/jobs/${id}`, requestData);
      return {
        jobIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        jobErrorMessage: error?.response?.data?.message || error.message,
        jobIsLoading: false,
        success: false,
      });
      return {
        jobErrorMessage: error?.response?.data?.message || error.message,
        jobIsLoading: false,
        success: false,
      };
    }
  },
}));
