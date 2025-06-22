import { motion } from "framer-motion";
import { PenTool, Rocket, Sparkles, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashboardMain = ({ user }) => {
  const navigate = useNavigate();
  const handleWriteThought = () => {
    navigate("/journal-entry");
  };

  const handleComingSoon = () => {
    // Show coming soon message
    toast.success("Coming soon feature");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full h-[600px] bg-gray-800 bg-opacity-40 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl border border-green-500/10 flex flex-col p-12"
    >
      {/* Welcome Section */}
      <div className="mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text mb-4 capitalize"
        >
          Welcome Back, {user.name}! 👑
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 text-lg"
        >
          What's on your mind today?
        </motion.p>
      </div>

      {/* Action Cards */}
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Write New Thought Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWriteThought}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Write New Entry
              </h3>
              <p className="text-white text-opacity-80 text-sm mb-4">
                Communicate your thoughts and feelings in a safe environment
              </p>
              <div className="flex items-center text-white text-opacity-70 group-hover:text-opacity-100 transition-all">
                <span className="text-sm mr-2">Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
          </motion.div>

          {/* Coming Soon Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.01 }}
            onClick={handleComingSoon}
            className="bg-gray-800 bg-opacity-60 rounded-2xl p-6 cursor-pointer shadow-lg border border-green-500/30 hover:border-green-500/50 transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-200 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-400 text-sm">
              Exciting features in development
            </p>

            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-green-500 bg-opacity-5 rounded-full translate-y-8 translate-x-8"></div>
          </motion.div>

          {/* Coming Soon Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.01 }}
            onClick={handleComingSoon}
            className="bg-gray-800 bg-opacity-60 rounded-2xl p-6 cursor-pointer shadow-lg border border-green-500/30 hover:border-green-500/50 transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-200 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-400 text-sm">More tools coming your way</p>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500 bg-opacity-5 rounded-full -translate-y-6 -translate-x-6"></div>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-gray-800 bg-opacity-40 rounded-xl p-4 border border-green-500/20 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">12</div>
            <div className="text-xs text-gray-400">Entries Recorded</div>
          </div>

          <div className="bg-gray-800 bg-opacity-40 rounded-xl p-4 border border-green-500/20 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">7</div>
            <div className="text-xs text-gray-400">Days Active</div>
          </div>

          <div className="bg-gray-800 bg-opacity-40 rounded-xl p-4 border border-green-500/20 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">98%</div>
            <div className="text-xs text-gray-400">Productivity Score</div>
          </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-16 right-16 w-2 h-2 bg-green-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-8 w-1 h-1 bg-emerald-400 rounded-full opacity-50"></div>
      <div className="absolute bottom-1/4 left-8 w-1.5 h-1.5 bg-green-300 rounded-full opacity-40"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-500 rounded-full opacity-60"></div>
    </motion.div>
  );
};

export default DashboardMain;
