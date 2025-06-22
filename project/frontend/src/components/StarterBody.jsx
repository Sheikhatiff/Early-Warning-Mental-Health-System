import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Shield,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  BellIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Body = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Assessment",
      description:
        "Understand your mental health patterns with the help of advanced algorithms for better mental wellness.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: BellIcon,
      title: "Notification Support",
      description:
        "Receive timely notifications upon changes in your mental health.",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description:
        "Continuous tracking with real-time alerts and support whenever you need it.",
      color: "from-teal-400 to-cyan-500",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "24/7", label: "Support Available", icon: Clock },
    { number: "500+", label: "Licensed Professionals", icon: Shield },
  ];

  const benefits = [
    "Secure and confidential platform",
    "Mental health assessments",
    "Progress tracking and analytics",
    "Timely notifications",
    "Integration with healthcare providers",
    "Emergency crisis intervention",
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section id="home" className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Trusted by 50,000+ Users
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  Transform Your{" "}
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Mental Wellness
                  </span>{" "}
                  Journey
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-xl text-gray-300 leading-relaxed max-w-2xl"
                >
                  We provide a secure journaling platform to help you achieve
                  clarity and life perspective. Become more self-aware regarding
                  your mental health. Take control of your mental wellness right
                  now. your words stay yours. We never read them, never share
                  them. You're in control, always.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 border-2 border-green-400 text-green-400 rounded-full font-semibold text-lg hover:bg-green-400 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4"
              >
                {benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Main Circle */}
              <div className="relative w-96 h-96 mx-auto">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                />

                {/* Inner Circle */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-8 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
                />

                {/* Center Brain Icon */}
                {/* Center Massive, Bold, Tall Heartbeat Pulse Animation */}
                {/* Center Large, Bold, Tall Heartbeat Pulse Animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 400 100"
                    className="w-72 h-24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="pulseGradient4"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10b981"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="50%"
                          stopColor="#34d399"
                          stopOpacity="1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#10b981"
                          stopOpacity="0.8"
                        />
                      </linearGradient>
                    </defs>

                    {/* Pulse Line – Taller & Bolder */}
                    <g
                      stroke="url(#pulseGradient4)"
                      strokeWidth="6"
                      fill="none"
                    >
                      <path
                        d="
        M10 50 L40 50 
        L55 10 L70 90 
        L85 10 L100 90 
        L115 50 L145 50 
        L160 5 L175 95 
        L190 5 L205 95 
        L220 50 L260 50
        L275 10 L290 90 
        L305 10 L320 90 
        L335 50 L360 50
      "
                      >
                        <animate
                          attributeName="stroke-dasharray"
                          values="0 300;150 150;300 0;150 150;0 300"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.8;1;0.8"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>

                    {/* Heartbeat Dots (still visible & aligned to new Y) */}
                    <circle cx="55" cy="10" r="3" fill="#34d399" opacity="0.8">
                      <animate
                        attributeName="r"
                        values="3;4;3"
                        dur="0.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="85" cy="10" r="3" fill="#34d399" opacity="0.8">
                      <animate
                        attributeName="r"
                        values="3;4;3"
                        dur="0.8s"
                        begin="0.3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="275" cy="10" r="3" fill="#34d399" opacity="0.8">
                      <animate
                        attributeName="r"
                        values="3;4;3"
                        dur="0.8s"
                        begin="0.6s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="305" cy="10" r="3" fill="#34d399" opacity="0.8">
                      <animate
                        attributeName="r"
                        values="3;4;3"
                        dur="0.8s"
                        begin="0.9s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>

                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40"
                  >
                    <Brain className="w-12 h-12 text-white" />
                  </motion.div>
                </div> */}
                {/* Floating Elements */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    className={`absolute w-3 h-3 bg-green-400 rounded-full ${
                      i === 0
                        ? "top-10 left-10"
                        : i === 1
                        ? "top-20 right-10"
                        : i === 2
                        ? "bottom-20 right-20"
                        : i === 3
                        ? "bottom-10 left-20"
                        : i === 4
                        ? "top-1/2 left-0"
                        : "top-1/2 right-0"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-4">
                  <stat.icon className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Comprehensive Mental Health{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our platform combines advanced AI technology with personal
              insights to provide better understanding and awareness tailored to
              your unique needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group p-8 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 hover:border-green-500/30 transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  className="mt-6 flex items-center text-green-400 font-medium group-hover:text-green-300 transition-colors duration-300"
                  whileHover={{ x: 10 }}
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Mental Health?
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of users who have already started their journey to
              become a better version of themselves. Get started today with our
              free assessment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                >
                  Start Free Assessment
                </motion.button>
              </Link>

              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-green-400 text-green-400 rounded-full font-semibold text-lg hover:bg-green-400 hover:text-white transition-all duration-300"
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Body;
