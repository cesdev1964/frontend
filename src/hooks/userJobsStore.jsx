import { create } from "zustand";
import api from "../api/axios";
const url = "/api/userJobs";

export const useUserJobs = create((set) => ({
  userJobsdata: [],
  userJobsisLoading: false,
  userJobserrorMessage: null,
  success: false,
  userJobsMessage: "",
  userJobsdataById: [],
  
//   เอามาแสดงรายการ Job ทั้งหมดที่คนๆนั้นดูแลอยู่
  getUserJobs: async (userId) => {
    set({ userJobsisLoading: true, userJobserrorMessage: null });
    try {
      const response = await api.get(`${url}/${userId}`);
      console.log("role data", response.data.data);
      set({
        userJobsdata: response.data.data ?? [],
        userJobsisLoading: false,
      });
      return {
        userJobsdata: response.data.data ?? [],
        userJobserrorMessage: errorMessage.message,
        userJobsisLoading: false,
        success: true,
      };
    } catch (errorMessage) {
      set({
        userJobserrorMessage: errorMessage.message,
        userJobsisLoading: false,
      });
    }
  },

 
  updateUserJobs: async (requestData, userId) => {
    set({ userJobsisLoading: true, userJobserrorMessage: null });
    try {
      const response = await api.put(`${url}/${userId}`,requestData);
      console.log("response",response);
      return {
        userJobsdata: response.data.permissions ?? {},
        userJobsisLoading: false,
        userJobsMessage: response.data.message ?? "",
        success: true,
      };
    } catch (error) {
      set({
        userJobserrorMessage: error.message,
        userJobsisLoading: false,
      });
      return {
        success: false,
        userJobserrorMessage:
          error?.response?.data?.message || error.message,
      };
    }
  },
}));
