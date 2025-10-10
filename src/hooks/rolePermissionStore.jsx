import { create } from "zustand";
import api from "../api/axios";

export const useRolePermission = create((set) => ({
  rolePermissiondata: [],
  rolePermissionisLoading: false,
  rolePermissionerrorMessage: null,
  success: false,
  rolePermissionMessage: "",
  rolePermissiondataById: {},
  getRolePermission: async () => {
    set({ rolePermissionisLoading: true, rolePermissionerrorMessage: null });
    try {
      const response = await api.get("/api/role_permissions");
      // console.log("role data", response.data.data);
      set({
        rolePermissiondata: response.data.data ?? [],
        rolePermissionisLoading: false,
      });
    } catch (errorMessage) {
      set({
        rolePermissionerrorMessage: errorMessage.message,
        rolePermissionisLoading: false,
      });
    }
  },
  getRolePermissionByRoleId: async (roleId) => {
    set({ rolePermissionisLoading: true, rolePermissionerrorMessage: null });
    try {
      const response = await api.get(`/api/role_permissions/role/${roleId}`);
      console.log("role data", response.data.data);
      set({
        rolePermissiondata: response.data.data ?? {},
        rolePermissionisLoading: false,
      });
      return {
        rolePermissiondata: response.data.data ?? {},
        rolePermissionisLoading: false,
        success: true,
      };
    } catch (errorMessage) {
      set({
        rolePermissionerrorMessage: errorMessage.message,
        rolePermissionisLoading: false,
      });
      return {
        rolePermissionisLoading: false,
        rolePermissionerrorMessage: errorMessage.message,
      };
    }
  },
  createRolePermission: async (requestData) => {
    set({ rolePermissionisLoading: true, rolePermissionerrorMessage: null });
    try {
      const response = await api.post("/api/roles", requestData);
      //   console.log("res data from register ",response.data.user)
      return {
        rolePermissiondata: response.data.data ?? {},
        rolePermissionisLoading: false,
        rolePermissionMessage: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({
        rolePermissionerrorMessage: error.message,
        rolePermissionisLoading: false,
      });
      return {
        success: false,
        rolePermissionerrorMessage:
          error?.response?.data?.message || error.message,
      };
    }
  },

  updateRolePermission: async (requestData, roleId) => {
    set({ rolePermissionisLoading: true, rolePermissionerrorMessage: null });
    try {
      const response = await api.put(`/api/roles/${roleId}`, requestData);
      //   console.log("res data from register ",response.data.user)
      return {
        rolePermissiondata: response.data.data ?? {},
        rolePermissionisLoading: false,
        rolePermissionMessage: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({
        rolePermissionerrorMessage: error.message,
        rolePermissionisLoading: false,
      });
      return {
        success: false,
        rolePermissionerrorMessage:
          error?.response?.data?.message || error.message,
      };
    }
  },
}));
