import { create } from "zustand";
import api from "../api/axios";
const url = "/api/permissions"

export const usePermission = create((set) => ({
  permissionData: [],
  permissionLoading: false,
  permissionError: null,
  permissionDataById: {},

  getPermission: async () => {
    set({ permissionLoading: true, permissionError: null });
    try {
      const response = await api.get(url);
      set({
        permissionData: response.data.permissions ?? [],
        permissionLoading: false,
      });
      return {
        permissionDataById: response.data.permissions ?? [],
        permissionLoading: false,
      };
    } catch (error) {
      set({ permissionError: error.response?.data?.message, permissionLoading: false });
    }
  },
  getPermissionById: async (id) => {
    set({ isLoading: true, permissionError: null });
    try {
      const response = await api.get(`${url}/${id}`);
      //   console.log("role data", response.data.data);
      set({
        permissionDataById: response.data.permission ?? {},
        permissionLoading: false,
      });
      return {
        permissionDataById: response.data.permission ?? {},
        permissionLoading: false,
      };
    } catch (errorMessage) {
      set({ permissionError: errorMessage.response?.data?.message, permissionLoading: false });
      return {
        permissionLoading: false,
        permissionError: errorMessage.response?.data?.message,
      };
    }
  },

  createPermission: async (requestData) => {
        console.log("req data from register ",requestData)

    set({ permissionLoading: true, permissionError: null });
    try {
      const response = await api.post(url,requestData);
        // console.log("res data from register ",response.data.permissions)
      return {
        permissionData: response.data.permissions ?? {},
        permissionLoading: false,
      };
    } catch (error) {
      set({
        permissionError: error?.response?.data?.message || error.message,
        permissionLoading: false,
      });
      return {
        permissionError: error?.response?.data?.message || error.message,
      };
    }
  },
  deletePermission: async (id) => {
    set({ permissionLoading: true, permissionError: null });
    try {
      const response = await api.delete(`${url}/${id}`);
      //   console.log("delete user response ",response.data.message)
      return {
        permissionLoading: false,
        permissionError: response.data.message ?? "",
      };
    } catch (error) {
      set({
        permissionError: error?.response?.data?.message || error.message,
        permissionLoading: false,
      });
      return {
        permissionError: error?.response?.data?.message || error.message,
        permissionLoading: false,
      };
    }
  },
  updatePermission: async (requestData, id) => {
    set({ permissionLoading: true, permissionError: null });
    try {
      const response = await api.put(`${url}/${id}`,requestData);
      return {
        permissionData: response.data.permissions ?? {},
        permissionError: false,
      };
    } catch (error) {
      set({
        permissionError: error?.response?.data?.message || error.message,
        permissionLoading: false,
      });
      return {
        permissionError: error?.response?.data?.message || error.message,
        permissionLoading: false,
      };
    }
  },
}));
