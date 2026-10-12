/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useHalo();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-[#12141F] text-white rounded-full halo-shadow-xl text-xs font-medium border border-white/10"
        >
          <div className="w-5 h-5 rounded-full bg-[#1F9D7A]/20 text-[#1F9D7A] flex items-center justify-center">
            <CheckCircle2 size={13} strokeWidth={2.5} />
          </div>
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
