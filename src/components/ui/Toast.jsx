import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function Toast({ message, type = "success", isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-xl border border-brand-accent min-w-[300px]"
        >
          {type === "success" ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <AlertCircle className="w-6 h-6 text-red-500" />
          )}
          <span className="flex-1 font-medium text-slate-700">{message}</span>
          <button onClick={onClose} className="p-1 hover:bg-brand-accent rounded-full text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
