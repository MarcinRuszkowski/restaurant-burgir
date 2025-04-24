import React from "react";
import { motion } from "framer-motion";
import { AlertStatus } from "../types/types";

interface AlertProps {
  status: AlertStatus;
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ status, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`${
        status === "fail" ? "bg-red-500" : "bg-green-500"
      } px-5 py-2 rounded-4xl text-white shadow-md`}
    >
      {message}
    </motion.div>
  );
};
