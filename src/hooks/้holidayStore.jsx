import { create } from "zustand";
import api from "../api/axios";
const url = "/api/Holidays";

export const useHoliday = create((set) => ({
  holidayData: [],
  holidayIsLoading: false,
  holidayErrorMessage: null,
  success: false,
  holidayById: {},
  holidaySelectYearData: [],

  getHolidayData: async () => {
    set({ holidayIsLoading: true, holidayErrorMessage: null });
    try {
      const response = await api.get(url);
      set({
        holidayData: response.data.data ?? [],
        holidayIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        holidayErrorMessage: errorMessage.message,
        holidayIsLoading: false,
      });
      return { success: response.data.success };
    }
  },
  getHolidayDataByYear: async (year) => {
    set({ holidayIsLoading: true, holidayErrorMessage: null });
    try {
      const response = await api.get(url);
      const data = response.data.data ?? [];
      const holidayItemList = data?.find((item) => item.year === Number(year))?.items ?? [];

      set({
        holidayData: holidayItemList ?? [],
        holidayIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        holidayErrorMessage: errorMessage.message,
        holidayIsLoading: false,
      });
      return { success: response.data.success };
    }
  },


  //   getContratorDropdown: async () => {
  //     set({ holidayIsLoading: true, holidayErrorMessage: null });
  //     try {
  //       const response = await api.get(url);
  //       // console.log("role data", response.data.data)
  //       const data = response.data.data ?? [];
  //       const option = data
  //         ?.filter((activeData) => activeData.isActive === true)
  //         .map((item) => ({
  //           value: item.contractorId,
  //           label: item.contractorName,
  //         }));
  //       set({
  //         holidayDropdown: option,
  //         holidayIsLoading: false,
  //       });
  //       return { success: response.data.success };
  //     } catch (errorMessage) {
  //       set({
  //         holidayErrorMessage: errorMessage.message,
  //         holidayIsLoading: false,
  //       });
  //       return { success: response.data.success };
  //     }
  //   },

    getHolidayById: async (id) => {
      set({ holidayIsLoading: true, holidayErrorMessage: null });
      try {
        const response = await api.get(`${url}/${id}`);
        //   console.log("role data", response.data.data);
        set({
          holidayById: response.data.data ?? {},
          holidayIsLoading: false,
        });
        return {
          holidayById: response.data.data ?? {},
          holidayIsLoading: false,
        };
      } catch (errorMessage) {
        set({
          holidayErrorMessage: errorMessage.response?.data?.message,
          holidayIsLoading: false,
        });
        return {
          holidayIsLoading: false,
          holidayErrorMessage: errorMessage.response?.data?.message,
        };
      }
    },

  createHoliday: async (requestData) => {
    set({ holidayIsLoading: true, holidayErrorMessage: null });
    try {
      const response = await api.post(url, requestData);
      return {
        holidayIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        holidayErrorMessage: error?.response?.data?.message || error.message,
        holidayIsLoading: false,
        success: false,
      });
      return {
        holidayErrorMessage: error?.response?.data?.message || error.message,
        holidayIsLoading: false,
        success: false,
      };
    }
  },
    updateHoliday: async (requestData, id) => {
      set({ holidayIsLoading: true, holidayErrorMessage: null });
      try {
        await api.put(`${url}/${id}`, requestData);
        return {
          holidayIsLoading: false,
          success: true,
        };
      } catch (error) {
        set({
          holidayErrorMessage: error?.response?.data?.message || error.message,
          holidayIsLoading: false,
          success: false,
        });
        return {
          holidayErrorMessage: error?.response?.data?.message || error.message,
          holidayIsLoading: false,
          success: false,
        };
      }
    },
}));
