import { create } from "zustand";
import api from "../api/axios";
const url = "/api/approvals"

export const useOTApprove = create((set) => ({
  otApproveData: [],
  otApproveIsLoading: false,
  otApproveErrorMessage: null,
  success: false,
  otApproveById: [],
  afterOtArrovedData : {},
  getOTApprovalPending: async () => {
    set({ otApproveIsLoading: true, otApproveErrorMessage: null });
    try {
      const response = await api.get(`${url}/pending`);
      // console.log(" data", response.data.data);
      set({
        otApproveData: response.data.data ?? [],
        otApproveIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        otApproveErrorMessage: errorMessage.message,
        otApproveIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getOTApprovalPendingByFilter: async (argument,value) => {
    set({ otApproveIsLoading: true, otApproveErrorMessage: null });
    try {
      const response = await api.get(`${url}/pending?${argument}=${value}`);
        // console.log("emp data", response.data.data);
      set({
        otApproveById: response.data.data ?? [],
        otApproveIsLoading: false,
      });
      return {
        otApproveById: response.data.data ?? [],
        otApproveIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        otApproveErrorMessage: errorMessage.response?.data?.message,
        otApproveIsLoading: false,
      });
      return {
        otApproveIsLoading: false,
        otApproveErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },
  approveOT: async (reqData) => {
    set({ otApproveIsLoading: true, otApproveErrorMessage: null });
    try {
      const response = await api.post(`${url}/approve`,reqData);
       set({
        afterOtArrovedData: response.data.data ?? {},
        otApproveIsLoading: false,
      });
      return {
        afterOtArrovedData: response.data.data ?? {},
        otApproveIsLoading: false,
        otApproveErrorMessage: null,
        success: true,
      };
    } catch (error) {
      set({
        otApproveErrorMessage: error?.response?.data?.message || error.message,
        otApproveIsLoading: false,
        success: false,
      });
      return {
        otApproveErrorMessage: error?.response?.data?.message || error.message,
        otApproveIsLoading: false,
        success: false,
      };
    }
  },
  rejectOT: async (reqData) => {
    // console.log("id ", id);
    set({ otApproveIsLoading: true, otApproveErrorMessage: null });
    try {
      const response = await api.post(`${url}/reject`,reqData);
      set({
        afterOtArrovedData: response.data.data ?? {},
        otApproveIsLoading: false,
      });
      return {
        afterOtArrovedData: response.data.data ?? {},
        otApproveIsLoading: false,
        otApproveErrorMessage: null,
        success: true,
      };
    } catch (error) {
      set({
        otApproveErrorMessage: error?.response?.data?.message || error.message,
        otApproveIsLoading: false,
        success: false,
      });
      return {
        otApproveErrorMessage: error?.response?.data?.message || error.message,
        otApproveIsLoading: false,
        success: false,
      };
    }
  }
}));