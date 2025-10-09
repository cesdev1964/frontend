import { create } from "zustand";
import api from "../api/axios";

export const useEmployeeType = create((set) => ({
  employeeTypeData: [],
  employeeTypeIsLoading: false,
  employeeTypeErrorMessage: null,
  success: false,
  employeeTypeById: {},

  getEmployeeType: async () => {
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      const response = await api.get("/api/employeeTypes");
      // console.log("role data", response.data.data);
      set({
        employeeTypeData: response.data.data ?? [],
        employeeTypeIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({ employeeTypeErrorMessage: errorMessage.message, employeeTypeIsLoading: false });
      return { success: response.data.success };
    }
  },

  getEmployeeTypeDropdown: async () => {
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      const response = await api.get("/api/employeeTypes");
      // console.log("role data", response.data.data)
      const data = response.data.data ?? []
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.typeId,
          label: item.typeName,
        }));
      set({
        employeeTypeData : option,
        employeeTypeIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({ employeeTypeErrorMessage: errorMessage.message, employeeTypeIsLoading: false });
      return { success: response.data.success };
    }
  },
  
  getEmployeeTypeById: async (id) => {
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      const response = await api.get(`/api/employeeTypes/${id}`);
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
      set({ employeeTypeErrorMessage: errorMessage.message, employeeTypeIsLoading: false });
      return {
        employeeTypeIsLoading: false,
        employeeTypeErrorMessage: errorMessage.message,
      };
    }
  },
  createEmployeeType: async (requestData) => {
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      const response = await api.post("/api/employeeTypes", requestData);
      return {
        employeeTypeIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        employeeTypeErrorMessage: error?.response?.data?.message || error.message,
        employeeTypeIsLoading: false,
        success: response.data.success,
      });
      return {
        employeeTypeErrorMessage: error?.response?.data?.message || error.message,
        employeeTypeIsLoading: false,
        success: response.data.success,
      };
    }
  },
  deleteEmployeeType: async (id) => {
    console.log("id ", id);
    set({ employeeTypeIsLoading: true, employeeTypeErrorMessage: null });
    try {
      const response = await api.delete(`/api/employeeTypes/${id}`);
      return {
        employeeTypeIsLoading: false,
        employeeTypeErrorMessage: response.data.message ?? "",
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
      const response = await api.put(`/api/employeeTypes/${id}`, requestData);
      return {
        employeeTypeIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        employeeTypeErrorMessage: error?.response?.data?.message || error.message,
        employeeTypeIsLoading: false,
        success: response.data.success,
      });
      return {
        employeeTypeErrorMessage: error?.response?.data?.message || error.message,
        employeeTypeIsLoading: false,
        success: response.data.success,
      };
    }
  },
}));
