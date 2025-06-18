import { motion } from "framer-motion";
function FloatingShape({ color, size, top, left, delay }) {
  return (
    <motion.div className={`absolute rounded-full ${color}`}>
      FloatingShape
    </motion.div>
  );
}

export default FloatingShape;
