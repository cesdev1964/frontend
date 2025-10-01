import { create } from "zustand";
import api from "../api/axios";

export const useRole = create((set) => ({
  data: [],
  isLoading: false,
  errorMessage: null,
  success: false,
  dataById: {},
  getRoleData: async () => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await api.get("/api/roles");
      // console.log("role data", response.data.data);
      set({
        data: response.data.data ?? {},
        isLoading: false,
      });
    } catch (errorMessage) {
      set({ errorMessage: errorMessage.message, isLoading: false });
    }
  },
  getRoleByIdData: async (roleId) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await api.get(`/api/roles/${roleId}`);
      console.log("role data", response.data.data);
      set({
        dataById: response.data.data ?? {},
        isLoading: false,
      });
      return { dataById: response.data.data ?? {}, isLoading: false ,success : true};
    } catch (errorMessage) {
      set({ errorMessage: errorMessage.message, isLoading: false });
      return { isLoading: false ,errorMessage: errorMessage.message};

    }
  },
  createRole: async (requestData) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await api.post("/api/roles", {
        roleName: requestData.roleName,
        roleDescription: requestData.roleDescription,
      });
      //   console.log("res data from register ",response.data.user)
      return {
        data: response.data.data ?? {},
        isLoading: false,
        message: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
      return {
        success: false,
        errorMessage: error?.response?.data?.message || error.message,
      };
    }
  },
  deleteRole: async (roleId) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await api.delete(`/api/roles/${roleId}`);
      //   console.log("delete user response ",response.data.message)
      return {
        isLoading: false,
        errorMessage: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
      return {
        success: false,
        errorMessage: error?.response?.data?.message || error.message,
      };
    }
  },
  updateRole: async (requestData,roleId) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const response = await api.put(`/api/roles/${roleId}`, {
        roleName: requestData.roleName,
        roleDescription: requestData.roleDescription,
      });
      //   console.log("res data from register ",response.data.user)
      return {
        data: response.data.data ?? {},
        isLoading: false,
        message: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
      return {
        success: false,
        errorMessage: error?.response?.data?.message || error.message,
      };
    }
  },
}));
