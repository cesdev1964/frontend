import { create } from "zustand";
import api from "../api/axios";
const url = "/api/approvals/pending"

export const useOTApprove = create((set) => ({
  otApproveData: [],
  otIsLoading: false,
  otErrorMessage: null,
  success: false,
  otById: [],

  getOTrequestData: async () => {
    set({ otIsLoading: true, otErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data);
      set({
        otApproveData: response.data.data ?? [],
        otIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        otErrorMessage: errorMessage.message,
        otIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getOTrequestByEmployeeID: async (empid) => {
    set({ otIsLoading: true, otErrorMessage: null });
    try {
      const response = await api.get(`${url}?publicEmployeeId=${empid}`);
        // console.log("emp data", response.data.data);
      set({
        otById: response.data.data ?? [],
        otIsLoading: false,
      });
      return {
        otById: response.data.data ?? [],
        otIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        otErrorMessage: errorMessage.response?.data?.message,
        otIsLoading: false,
      });
      return {
        otIsLoading: false,
        otErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },
  createOTrequest: async (reqData) => {
    set({ otIsLoading: true, otErrorMessage: null });
    try {
      await api.post(url, reqData);
      return {
        otIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        otErrorMessage: error?.response?.data?.message || error.message,
        otIsLoading: false,
        success: false,
      });
      return {
        otErrorMessage: error?.response?.data?.message || error.message,
        otIsLoading: false,
        success: false,
      };
    }
  },
  deleteOTrequest: async (id) => {
    console.log("id ", id);
    set({ otIsLoading: true, otErrorMessage: null });
    try {
      await api.delete(`${url}/${id}`);
      return {
        otIsLoading: false,
        otErrorMessage: null,
        success: true,
      };
    } catch (error) {
      set({
        otErrorMessage: error?.response?.data?.message || error.message,
        otIsLoading: false,
        success: false,
      });
      return {
        otErrorMessage: error?.response?.data?.message || error.message,
        otIsLoading: false,
        success: false,
      };
    }
  }
}));