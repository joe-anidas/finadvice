import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div
          className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${
            isUser ? 'ml-3 bg-primary-100' : 'mr-3 bg-secondary-100'
          }`}
        >
          {isUser ? (
            <User className="h-4 w-4 text-primary-700" />
          ) : (
            <Bot className="h-4 w-4 text-secondary-700" />
          )}
        </div>
        <div>
          <div
            className={`rounded-2xl px-4 py-2 ${
              isUser
                ? 'bg-primary-600 text-white rounded-tr-none'
                : 'bg-accent-100 text-accent-900 rounded-tl-none'
            }`}
          >
            {message.content}
          </div>
          <div
            className={`text-xs text-accent-500 mt-1 ${
              isUser ? 'text-right' : 'text-left'
            }`}
          >
            {/* Only render timestamp on client side */}
            {mounted
              ? message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
          </div>
        </div>
      </div>
    </motion.div>
  );
}