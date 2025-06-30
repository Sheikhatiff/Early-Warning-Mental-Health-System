import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const DashboardSideBar = ({ user }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const navigate = useNavigate();
  const handleSettings = () => {
    navigate("/settings");
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[600px] bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl border border-green-500/20 flex flex-col"
    >
      {/* Profile Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
        <div className="relative mb-8">
          {/* Profile Image Container */}
          <div className="w-34 h-34 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 p-1">
            <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              {console.log(user.photo)}
              {user.photo ? (
                <img
                  src={`http://localhost:5000/img/users/${user.photo}`}
                  alt={user.name}
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
          {/* Decorative floating elements */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full opacity-40"></div>
        </div>

        {/* User Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 capitalize">
            {user.name}
          </h2>
          <p className="text-gray-400 text-sm break-all">{user.email}</p>
        </div>
      </div>

      {/* Account Info Section */}
      <div className="px-8 py-6 space-y-6">
        <div>
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Last Logged In:
          </p>
          <p className="text-sm text-gray-400">{formatDate(user.lastLogin)}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Account Created:
          </p>
          <p className="text-sm text-gray-400">{formatDate(user.createdAt)}</p>
        </div>

        {/* Settings Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSettings}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 flex items-center justify-center gap-2"
        >
          Settings
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-4 w-1 h-1 bg-green-400 rounded-full opacity-50"></div>
      <div className="absolute top-1/3 right-8 w-2 h-2 bg-green-300 rounded-full opacity-30"></div>
      <div className="absolute bottom-1/3 left-4 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-40"></div>
    </motion.div>
  );
};

export default DashboardSideBar;
