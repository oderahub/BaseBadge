'use client';

import { motion } from 'framer-motion';

export function BadgeCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 bg-gradient-to-tr from-blue-600/10 to-blue-900/30 border border-blue-700 rounded-xl shadow-md text-white hover:scale-[1.02] transition-transform"
    >
      <h3 className="text-lg font-semibold mb-1">🏅 {title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </motion.div>
  );
}
