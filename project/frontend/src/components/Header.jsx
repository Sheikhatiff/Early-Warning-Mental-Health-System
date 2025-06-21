import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

const Header = ({ logoSrc = null, handleLogout = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore(); // ✅ Auth check

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-green-500/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex space-x-3">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Logo"
                className="h-25 w-73 object-contain"
              />
            ) : (
              <>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-md opacity-50 -z-10"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white leading-tight">
                    Psyche
                  </span>
                  <span className="text-xl font-bold text-green-400 leading-tight -mt-1">
                    Pulse
                  </span>
                </div>
              </>
            )}
          </motion.div>

          {/* CTA Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 text-green-400 border-2 border-green-400 rounded-full font-semibold hover:bg-green-400 hover:text-white transition-all duration-300"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg shadow-green-500/30 transition-all duration-300"
              >
                Logout
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-300 hover:text-green-400 transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-gray-800/95 backdrop-blur-xl rounded-lg mt-2 border border-green-500/20"
        >
          <div className="px-4 py-6 space-y-4">
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-2.5 text-green-400 border-2 border-green-400 rounded-full font-semibold hover:bg-green-400 hover:text-white transition-all duration-300"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg shadow-green-500/30 transition-all duration-300"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full px-6 py-2.5 text-red-400 border-2 border-red-400 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Logout
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
