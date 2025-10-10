import { create } from "zustand";
import api from "../api/axios";

export const useUser = create((set) => ({
  userdata: [],
  userIsLoading: false,
  userError: null,
  message: null,
  success: false,
  userById : {},

  getUserData: async () => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await api.get("/api/users");
      //   console.log("user data", response.data.data);
      set({
        userdata: response.data.data ?? {},
        userIsLoading: false,
      });
    } catch (errorMessage) {
      set({ userError: errorMessage.response.data.message, userIsLoading: false });
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
      return { userById: response.data.user ?? {}, userIsLoading: false ,success : true};
   
    } catch (errorMessage) {
      set({ userError: errorMessage.response.data.message, userIsLoading: false });
      return { userIsLoading: false ,userError: errorMessage.response.data.message};

    }
  },
  register: async (requestData) => {
    console.log("req data from register to sent be ",requestData)
    set({ userIsLoading: true, userError: null });
    try {
      await api.post("/api/users/register",requestData);
      return {userIsLoading: false, success: true };
    } catch (error) {
      set({ userError: error.response.data.message, userIsLoading: false });
      return { success: false, error: error?.response?.data?.message };
    }
  },
  deleteUser: async (userId) => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await api.delete(`/api/users/${userId}`);
    //   console.log("delete user response ",response.data.message)
      return { userIsLoading: false, message : response.data.message ?? "", success: true };
    } catch (error) {
      set({ userError: error.response.data.message, userIsLoading: false });
      return { success: false, error: error?.response?.data?.message };
    }
  },
  // ใช้ sessionId
  changePassword: async (requestData,userId) => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await api.put(`/api/users/change-password/${userId}`, {
        currentPassword: requestData.currentPassword,
        newPassword: requestData.newPassword,
      });
        // console.log("message from change password",response.data.message)
      return {
        userIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({ userError: error.response.data.message, userIsLoading: false });
      return {
        success: false,
        userError: error?.response?.data?.message,
      };
    }
  },
//   ทำ update พรุ่งนี้
  updateUser: async (requestData,userId) => {
    set({userIsLoading : true, userError: null });
    try {
      const response = await api.put(`/api/users/${userId}`, requestData
    );
        // console.log("res data from register ",response)
      return {
        userIsLoading: false,
        message: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({ userError: error.response.data.message, userIsLoading: false });
      return {
        success: false,
        userError: error?.response?.data?.message ,
      };
    }
  },

}));
