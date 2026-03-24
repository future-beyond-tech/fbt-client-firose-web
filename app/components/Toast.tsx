'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MOTION_EASE } from '@/lib/motion';

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

type ToastEntry = {
  id: number;
  message: string;
};

let toastId = 0;

export function ToastProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const showToast = useCallback((message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message }]);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts }: Readonly<{ toasts: ToastEntry[] }>) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed bottom-20 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className="pointer-events-auto rounded-full border border-[#e0c89352] bg-[linear-gradient(140deg,rgba(241,221,180,0.95)_0%,rgba(216,179,114,0.95)_49%,rgba(185,142,74,0.95)_100%)] px-5 py-2.5 text-sm font-medium text-[#22190d] shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.3, ease: MOTION_EASE }}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
