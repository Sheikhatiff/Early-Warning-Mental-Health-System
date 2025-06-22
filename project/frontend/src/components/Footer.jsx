import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  ArrowUpRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/psychepulse",
      icon: <Facebook className="w-4 h-4" />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/psychepulse",
      icon: <Twitter className="w-4 h-4" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/psychepulse",
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/psychepulse",
      icon: <Instagram className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#111827] via-[#0f172a] to-[#020617] text-white border-t border-emerald-500/30">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Section: Logo and Info */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src="/LOGO-1.svg"
              alt="Psyche Pulse Logo"
              className="w-80 h-20 object-cover"
            />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering mental wellness through innovative AI-driven solutions.
          </p>
          <a
            href="https://www.psychepulse.site"
            className="text-emerald-400 font-medium inline-flex items-center gap-1"
          >
            www.psychepulse.site
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Right Section: Contact & Social */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Connect</h3>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mb-4"></div>

          <div className="flex flex-col gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-400" />
              <span>hello@psychepulse.site</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-emerald-400" />
              <span>+92 316 3094030</span>
            </div>
          </div>

          <div>
            <p className="text-white font-medium text-sm mb-2">Follow Us</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:scale-105 transition-transform"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-12 pt-6 pb-8 px-6 text-gray-500 text-sm text-center">
        © {currentYear} Psyche Pulse. All rights reserved.
      </div>

      {/* Decorative Bubbles */}
      <div className="absolute top-10 right-10 w-1 h-1 bg-emerald-400 rounded-full opacity-20" />
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-emerald-600 rounded-full opacity-20" />
      <div className="absolute bottom-10 right-20 w-1 h-1 bg-green-300 rounded-full opacity-20" />
    </footer>
  );
};

export default Footer;
