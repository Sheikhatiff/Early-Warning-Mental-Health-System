import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore.js";
// import { formatDate } from "../utils/date.js";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardSideBar from "../components/DashboardSideBar";
import DashboardMainContent from "../components/DashboardMainContent";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex flex-col relative overflow-hidden">
      {/* Background floating shapes - matching your App.jsx design */}
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
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute w-32 h-32 bg-lime-500 rounded-full opacity-20 blur-3xl top-1/2 -left-16"
        />
      </div>

      {/* Header */}
      <Header logoSrc={"/LOGO-1.svg"} handleLogout={handleLogout} />

      {/* Main Dashboard Content */}
      <main className="flex-1 container mx-auto px-4 pt-24 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Sidebar - 30% width on large screens */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[30%] flex-shrink-0"
          >
            <DashboardSideBar user={user} />
          </motion.div>

          {/* Main Content - 70% width on large screens */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-[70%] flex-1"
          >
            <DashboardMainContent user={user} />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-green-400 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-emerald-300 rounded-full opacity-30"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-lime-400 rounded-full opacity-50"></div>
    </div>
  );
};

export default DashboardPage;
