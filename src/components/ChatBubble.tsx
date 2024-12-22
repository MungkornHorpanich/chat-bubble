import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatBubbleProps {
  message: string;
  onRemove: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div className="max-w-xl w-full mx-auto">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white text-black text-xl px-3 py-2 rounded-lg max-w-xl shadow-lg w-fit"
        >
          {message}

          <div className="absolute top-[23%] left-[-4px] translate-y-[-50%] w-0 h-0 border-r-[10px] border-r-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent"></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChatBubble;
