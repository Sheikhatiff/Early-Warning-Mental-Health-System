import { create } from "zustand";
import axios from "axios";

const AUTH_API_URL = `http://localhost:5000/api/v1/auth`;
const USER_API_URL = `http://localhost:5000/api/v1/users`;
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, name, password, passwordConfirm) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${AUTH_API_URL}/sign-up`, {
        email,
        password,
        name,
        passwordConfirm,
      });
      set({ user: res.data.data, isAuthenticated: true, isLoading: false });
      console.log(res.data.data);
    } catch (error) {
      set({
        error: error.response || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${AUTH_API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },
  verifyEmail: async (verificationToken) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${AUTH_API_URL}/verify-email`, {
        verificationToken,
      });
      set({ user: res.data.data, isAuthenticated: true, isLoading: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response.data.error || "Error in verifying email",
        isLoading: false,
      });
      throw err;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${AUTH_API_URL}/check-auth`);
      set({
        user: response?.data?.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        isCheckingAuth: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },
  resetPassword: async (token, password, passwordConfirm) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${AUTH_API_URL}/reset-password/${token}`,
        {
          password,
          passwordConfirm,
        }
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
  deleteMe: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${USER_API_URL}/deleteMe`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error deleting account",
        isLoading: false,
      });
      throw error;
    }
  },
  updateMyPassword: async (
    currentPassword,
    newPassword,
    confirmNewPassword
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.patch(`${USER_API_URL}/updateMyPassword`, {
        currentPassword,
        password: newPassword,
        passwordConfirm: confirmNewPassword,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error updating password",
        isLoading: false,
      });
      throw error;
    }
  },
  updateMe: async (name, photo) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      if (name !== "") formData.append("name", name);
      if (photo) formData.append("photo", photo);

      const response = await axios.patch(`${USER_API_URL}/updateMe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ user: response.data.data.user, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error updating profile",
        isLoading: false,
      });
      throw error;
    }
  },
}));
