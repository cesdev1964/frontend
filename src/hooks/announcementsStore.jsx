import { create } from "zustand";
import api from "../api/axios";
const url = "/api/announcements";

export const useAnnounments = create((set) => ({
  announmentData: [],
  announmentIsLoading: false,
  annoumentErrorMessage: null,
  success: false,
  announmentById: {},

  // สำหรับหน้า HOME
    getAnnounmentData: async () => {
      set({ announmentIsLoading: true, annoumentErrorMessage: null });
      try {
        const response = await api.get(url);
        set({
          announmentData: response.data.data ?? [],
          announmentIsLoading: false,
        });
        return { success: response.data.success };
      } catch (errorMessage) {
        set({
          annoumentErrorMessage: errorMessage.message,
          announmentIsLoading: false,
        });
        return { success: response.data.success };
      }
    },

  //   เมื่อ field ไหนที่ไม่ว่าง ให้ทำการ add field ต่อกัน สลับได้
  // getAnnounmentDataSearch: async (status, search, onlyActive) => {
  //   set({ announmentIsLoading: true, annoumentErrorMessage: null });
  //   try {
  //     const response = [];
  //     if (!(status && search && onlyActive)) {
  //       response = await api.get(url);
  //     }
  //     if (!status) {
  //       response = await api.get(
  //         `${url}?search=${search}&onlyActive=${onlyActive}`
  //       );
  //     }
  //     if (!search) {
  //       response = await api.get(
  //         `${url}?status=${status}&onlyActive=${onlyActive}`
  //       );
  //     }
  //     if (!onlyActive) {
  //       response = await api.get(`${url}?status=${status}&search=${search}`);
  //     }
  //     if (!(status && search)) {
  //       response = await api.get(`${url}?onlyActive=${onlyActive}`);
  //     }
  //     if (!(status && onlyActive)) {
  //       response = await api.get(`${url}?search=${search}`);
  //     }
  //     if (!(search && onlyActive)) {
  //       response = await api.get(`${url}?status=${status}`);
  //     }
  //     if (search && onlyActive && status) {
  //       response = await api.get(
  //         `${url}?status=${status}&search=${search}&onlyActive=${onlyActive}`
  //       );
  //     }
  //     set({
  //       announmentData: response.data.data ?? [],
  //       announmentIsLoading: false,
  //     });
  //     return { success: response.data.success };
  //   } catch (errorMessage) {
  //     set({
  //       annoumentErrorMessage: errorMessage.message,
  //       announmentIsLoading: false,
  //     });
  //     return { success: response.data.success };
  //   }
  // },

  getAnnountmentById: async (id) => {
    set({ announmentIsLoading: true, annoumentErrorMessage: null });
    try {
      const response = await api.get(`${url}/${id}`);
      set({
        announmentById: response.data.data ?? {},
        announmentIsLoading: false,
      });
      return {
        announmentById: response.data.data ?? {},
        announmentIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        annoumentErrorMessage: errorMessage.response?.data?.message,
        announmentIsLoading: false,
      });
      return {
        announmentIsLoading: false,
        annoumentErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },
  createAnnounment: async (requestData) => {
    set({ announmentIsLoading: true, annoumentErrorMessage: null });
    try {
      const response = await api.post(url, requestData);
      return {
        announmentIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        annoumentErrorMessage: error?.response?.data?.message || error.message,
        announmentIsLoading: false,
        success: false,
      });
      return {
        annoumentErrorMessage: error?.response?.data?.message || error.message,
        announmentIsLoading: false,
        success: false,
      };
    }
  },
  updateAnnoument: async (requestData, id) => {
    set({ announmentIsLoading: true, annoumentErrorMessage: null });
    try {
      await api.put(`${url}/${id}`, requestData);
      return {
        announmentIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        annoumentErrorMessage: error?.response?.data?.message || error.message,
        announmentIsLoading: false,
        success: false,
      });
      return {
        annoumentErrorMessage: error?.response?.data?.message || error.message,
        announmentIsLoading: false,
        success: false,
      };
    }
  },
}));
