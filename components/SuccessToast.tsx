"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function SuccessToast({ show, onClose }: Props) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-white shadow-2xl rounded-2xl px-8 py-6 text-right max-w-sm w-full border border-gray-200">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-lg font-semibold mb-2">
              הפרטים נשלחו בהצלחה!
            </h3>
            <p className="text-sm text-gray-600">
              ניצור איתך קשר בהקדם.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
