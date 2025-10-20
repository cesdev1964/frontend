import { create } from "zustand";
import api from "../api/axios";
const url = "/api/employees"

export const useEmployee = create((set) => ({
  employeeData: [],
  employeeIsLoading: false,
  employeeErrorMessage: null,
  success: false,
  employeeById: {},
  employeeDropdown: [],

  getEmployeeData: async () => {
    set({ employeeIsLoading: true, employeeErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data);
      set({
        employeeData: response.data.data ?? [],
        employeeIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        employeeErrorMessage: errorMessage.message,
        employeeIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getEmployeeDropdown: async () => {
    set({ employeeIsLoading: true, employeeErrorMessage: null });
    try {
      const response = await api.get(url);
      // console.log("role data", response.data.data)
      const data = response.data.data ?? [];
      const option = data
        ?.filter((activeData) => activeData.isActive === true)
        .map((item) => ({
          value: item.contractorId,
          label: item.contractorName,
        }));
      set({
        employeeDropdown: option,
        employeeIsLoading: false,
      });
      return { success: response.data.success };
    } catch (errorMessage) {
      set({
        employeeErrorMessage: errorMessage.message,
        employeeIsLoading: false,
      });
      return { success: response.data.success };
    }
  },

  getEmployeeById: async (id) => {
    set({ employeeIsLoading: true, employeeErrorMessage: null });
    try {
      const response = await api.get(`${url}/${id}`);
        console.log("emp data", response.data.data);
      set({
        employeeById: response.data.data ?? {},
        employeeIsLoading: false,
      });
      return {
        employeeById: response.data.data ?? {},
        employeeIsLoading: false,
      };
    } catch (errorMessage) {
      set({
        employeeErrorMessage: errorMessage.response?.data?.message,
        employeeIsLoading: false,
      });
      return {
        employeeIsLoading: false,
        employeeErrorMessage: errorMessage.response?.data?.message,
      };
    }
  },
  createEmployee: async (requestData) => {
    set({ employeeIsLoading: true, employeeErrorMessage: null });
    try {
      const response = await api.post(url, requestData);
      return {
        employeeIsLoading: false,
        success: response.data.success,
      };
    } catch (error) {
      set({
        employeeErrorMessage: error?.response?.data?.message || error.message,
        employeeIsLoading: false,
        success: false,
      });
      return {
        employeeErrorMessage: error?.response?.data?.message || error.message,
        employeeIsLoading: false,
        success: false,
      };
    }
  },
  deleteEmployee: async (id) => {
    console.log("id ", id);
    set({ employeeIsLoading: true, employeeErrorMessage: null });
    try {
      await api.delete(`${url}/${id}`);
      return {
        employeeIsLoading: false,
        employeeErrorMessage: null,
        success: true,
      };
    } catch (error) {
      set({
        employeeErrorMessage: error?.response?.data?.message || error.message,
        employeeIsLoading: false,
        success: false,
      });
      return {
        employeeErrorMessage: error?.response?.data?.message || error.message,
        employeeIsLoading: false,
        success: false,
      };
    }
  },
  updateEmployee: async (requestData, id) => {
    set({ employeeIsLoading: true, employeeErrorMessage: null });
    try {
      await api.put(`${url}/${id}`, requestData);
      return {
        employeeIsLoading: false,
        success: true,
      };
    } catch (error) {
      set({
        employeeErrorMessage: error?.response?.data?.message || error.message,
        employeeIsLoading: false,
        success: false,
      });
      return {
        employeeErrorMessage: error?.response?.data?.message || error.message,
        employeeIsLoading: false,
        success: false,
      };
    }
  },
}));