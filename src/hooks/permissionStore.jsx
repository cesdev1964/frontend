import { create } from "zustand";
import api from "../api/axios";

export const usePermission = create((set) => ({
  permissionData: [],
  permissionLoading: false,
  permissionError: null,
  permissionDataById: {},

  getPermission: async () => {
    set({ permissionLoading: true, permissionError: null });
    try {
      const response = await api.get("/api/permissions");
    //   console.log("responsedata",response.data.permissions)
      set({
        permissionData: response.data.permissions ?? [],
        permissionLoading: false,
      });
      return {
        permissionDataById: response.data.permissions ?? [],
        permissionLoading: false,
      };
    } catch (error) {
      set({ permissionError: error.message, permissionLoading: false });
    }
  },
  getPermissionById: async (id) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await api.get(`/api/permission/${id}`);
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
      set({ permissionError: errorMessage.message, permissionLoading: false });
      return {
        permissionLoading: false,
        permissionError: errorMessage.message,
      };
    }
  },

  createPermission: async (requestData) => {
    set({ permissionLoading: true, permissionError: null });
    try {
      const response = await api.post("/api/permission", {
        roleName: requestData.permissionCode,
        roleDescription: requestData.permissionName,
        isActive : requestData.isActive
      });
      //   console.log("res data from register ",response.data.user)
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
      const response = await api.delete(`/api/permission/${id}`);
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
      const response = await api.put(`/api/permissions/${id}`,requestData);
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
