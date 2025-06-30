import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Eye,
  EyeOff,
  Save,
  Lock,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { useAuthStore } from "../store/authStore.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  // State management
  const navigate = useNavigate();
  const { user, updateMe, updateMyPassword, deleteMe } = useAuthStore();

  const [previewURL, setPreviewURL] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    delete: false,
  });

  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  // Handle profile save
  const handleProfileSave = async () => {
    setLoading((prev) => ({ ...prev, profile: true }));
    try {
      await updateMe(profileName, profileImage);
      setProfileImage(null); // Reset image after saving
      setProfileName(""); // Reset name after saving
      setPreviewURL(null); // Reset preview URL after saving
      console.log("Profile updated:", {
        ...user,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      if (err?.response?.data?.message)
        toast.error(err?.response?.data?.message);
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    setLoading((prev) => ({ ...prev, password: true }));
    try {
      // Simulate API call
      await updateMyPassword(
        passwords.current,
        passwords.new,
        passwords.confirm
      );
      console.log("Password updated");
      setPasswords({ current: "", new: "", confirm: "" });
      toast.success("Password updated successfully!");
      // Show success notification here
    } catch (err) {
      if (err?.response?.data?.message)
        toast.error(err?.response?.data?.message);
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  };

  // Handle account deletion
  const handleAccountDelete = async () => {
    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      // Simulate API call
      await deleteMe();
      toast.success("Account deleted successfully!");
      navigate("/");
      // Redirect to login or home page
    } catch (err) {
      if (err?.response?.data?.message)
        toast.error(err?.response?.data?.message);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
      setShowDeleteModal(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex flex-col relative overflow-hidden">
      {/* Background floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-64 h-64 bg-green-500 rounded-full opacity-10 blur-3xl -top-32 left-10"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute w-48 h-48 bg-emerald-500 rounded-full opacity-15 blur-3xl top-3/4 right-10"
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-green-500/20"
          >
            <h2 className="text-xl font-semibold text-gray-300 uppercase tracking-wider mb-6">
              Profile Information
            </h2>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    {previewURL ? (
                      <img
                        src={previewURL}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gray-500 rounded-full mx-auto mb-2"></div>
                          <div className="w-12 h-3 bg-gray-500 rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg"
                >
                  <Camera size={16} className="text-white" />
                </motion.button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Name Input */}
              <div className="flex-1 w-full md:max-w-md mt-6">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProfileSave}
                disabled={loading.profile}
                className="mt-12 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading.profile ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {loading.profile ? "Saving..." : "Save"}
              </motion.button>
            </div>
          </motion.div>

          {/* Password Update Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-green-500/20"
          >
            <h2 className="text-xl font-semibold text-gray-300 uppercase tracking-wider mb-6">
              Update Password
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 ml-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        current: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 pr-12 bg-gray-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 ml-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords((prev) => ({ ...prev, new: e.target.value }))
                    }
                    className="w-full px-4 py-3 pr-12 bg-gray-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPasswords.new ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 ml-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        confirm: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 pr-12 bg-gray-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePasswordUpdate}
              disabled={
                loading.password ||
                !passwords.current ||
                !passwords.new ||
                !passwords.confirm
              }
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.password ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Lock size={16} />
              )}
              {loading.password ? "Updating..." : "Update Password"}
            </motion.button>
          </motion.div>

          {/* Delete Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-red-500/20"
          >
            <h2 className="text-xl font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Danger Zone
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              This action cannot be undone. This will permanently delete your
              account and all associated data.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDeleteModal(true)}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Delete Account
            </motion.button>
          </motion.div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle size={24} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Confirm Account Deletion
                  </h3>
                  <p className="text-gray-400 text-sm">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-6">
                Are you sure you want to delete your account? All your data will
                be permanently removed.
              </p>

              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccountDelete}
                  disabled={loading.delete}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading.delete ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  {loading.delete ? "Deleting..." : "Yes, Delete"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-green-400 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-emerald-300 rounded-full opacity-30"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-lime-400 rounded-full opacity-50"></div>
    </div>
  );
};

export default SettingsPage;
