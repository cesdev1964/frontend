import { create } from "zustand";
import api from "../api/axios";

export const useUser = create((set) => ({
  userdata: [],
  userIsLoading: false,
  userError: null,
  message: null,
  success: false,
  userById: {},
  userDropdown: [],
  getUserData: async () => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await api.get("/api/users");
      set({
        userdata: response.data.data ?? {},
        userIsLoading: false,
      });
    } catch (errorMessage) {
      set({
        userError: errorMessage.response.data.message,
        userIsLoading: false,
      });
    }
  },
  getUserDropdown: async () => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await api.get("/api/users");
      const data = response.data.data ?? [];
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.userId,
          label: item.titleName + " " + item.firstname + " " + item.lastname,
        }));
      set({
        userDropdown: option,
        userIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        userError: error?.response?.data?.message,
        userIsLoading: false,
      });
      return { success: response.data.success };
    }
  },
  getUserByIdData: async (userId) => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await api.get(`/api/users/${userId}`);
      set({
        userById: response.data.user ?? {},
        userIsLoading: false,
      });
      return {
        userById: response.data.user ?? {},
        userIsLoading: false,
        success: true,
      };
    } catch (errorMessage) {
      set({
        userError: errorMessage.response.data.message,
        userIsLoading: false,
      });
      return {
        userIsLoading: false,
        userError: errorMessage.response.data.message,
      };
    }
  },
  register: async (requestData) => {
    console.log("req data from register to sent be ", requestData);
    set({ userIsLoading: true, userError: null });
    try {
      await api.post("/api/users/register", requestData);
      return { userIsLoading: false, success: true };
    } catch (error) {
      set({
        userError: error.response.data.message,
        userIsLoading: false,
        success: false,
      });
      return {
        success: false,
        error: error?.response?.data?.message,
        userIsLoading: false,
      };
    }
  },
  deleteUser: async (userId) => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await api.delete(`/api/users/${userId}`);
      return {
        userIsLoading: false,
        message: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({ userError: error.response.data.message, userIsLoading: false,success: false });
      return { success: false, error: error?.response?.data?.message };
    }
  },
  // ใช้ sessionId
  changePassword: async (requestData, userId) => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await api.put(
        `/api/users/change-password/${userId}`,
        requestData
      );
      // console.log("message from change password",response.data.message)
      return {
        userIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({ userError: error.response.data.message, userIsLoading: false,success: false });
      return {
        success: false,
        userError: error?.response?.data?.message,
      };
    }
  },

  resetPassword: async (userId) => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await api.put(`/api/users/reset-password/${userId}`);
      return {
        userIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({ userError: error.response.data.message, userIsLoading: false ,success: false});
      return {
        success: false,
        userError: error?.response?.data?.message,
      };
    }
  },
  //   ทำ update พรุ่งนี้
  updateUser: async (requestData, userId) => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await api.put(`/api/users/${userId}`, requestData);
      // console.log("res data from register ",response)
      return {
        userIsLoading: false,
        message: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({ userError: error.response.data.message, userIsLoading: false ,success: false});
      return {
        success: false,
        userError: error?.response?.data?.message,
      };
    }
  },
}));
