import { create } from "zustand";
import api from "../api/axios";
const url = "/api/employeeTypes"

export const useEmployeeType = create((set) => ({
  employeeTypeData: [],
  employeeTypeIsLoading: false,
  employeeTypeErrorMessage: null,
  success: false,
  employeeTypeById: {},
  employeeTypeDropdown : [],
  getEmployeeType: async () => {
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data);
      set({
        employeeTypeData: response.data.data ?? [],
        employeeTypeIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({ employeeTypeErrorMessage: errorMessage.response?.data?.message, employeeTypeIsLoading: false });
      return { success: response.data.success };
    }
  },

  getEmployeeTypeDropdown: async () => {
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data)
      const data = response.data.data ?? []
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.typeId,
          label: item.typeName,
        }));
      set({
        employeeTypeDropdown : option,
        employeeTypeIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({ employeeTypeErrorMessage: errorMessage.response?.data?.message, employeeTypeIsLoading: false });
      return { success: response.data.success };
    }
  },
  
  getEmployeeTypeById: async (id) => {
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      const response = await api.get(`${url}/${id}`);
      //   console.log("role data", response.data.data);
      set({
        employeeTypeById: response.data.data ?? {},
        employeeTypeIsLoading: false,
      });
      return {
        employeeTypeById: response.data.data ?? {},
        employeeTypeIsLoading: false,
      };
    } catch (errorMessage) {
      set({ employeeTypeErrorMessage: errorMessage.response?.data?.message, employeeTypeIsLoading: false });
      return {
        employeeTypeIsLoading: false,
        employeeTypeErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },
  createEmployeeType: async (requestData) => {
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      await api.post(url, requestData);
      return {
        employeeTypeIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        employeeTypeErrorMessage: error?.response?.data?.message || error.message,
        employeeTypeIsLoading: false,
        success: false,
      });
      return {
        employeeTypeErrorMessage: error?.response?.data?.message || error.message,
        employeeTypeIsLoading: false,
        success: false,
      };
    }
  },
  deleteEmployeeType: async (id) => {
    console.log("id ", id);
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      await api.delete(`${url}/${id}`);
      return {
        employeeTypeIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        employeeTypeErrorMessage: error?.response?.data?.message || error.message,
        employeeTypeIsLoading: false,
        success: false,
      });
      return {
        employeeTypeErrorMessage: error?.response?.data?.message || error.message,
        employeeTypeIsLoading: false,
        success: false,
      };
    }
  },
  updateEmployeeType: async (requestData, id) => {
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      await api.put(`${url}/${id}`, requestData);
      return {
        employeeTypeIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        employeeTypeErrorMessage: error?.response?.data?.message || error.message,
        employeeTypeIsLoading: false,
        success: false,
      });
      return {
        employeeTypeErrorMessage: error?.response?.data?.message || error.message,
        employeeTypeIsLoading: false,
        success: false,
      };
    }
  },
}));
