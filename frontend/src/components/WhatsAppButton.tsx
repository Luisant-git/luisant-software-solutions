/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone } from "lucide-react";
import { motion } from "motion/react";

export default function WhatsAppButton() {
  const whatsappLink = "https://api.whatsapp.com/message/LPC5UPPQG7TWM1?autoload=1&app_absent=0";

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg shadow-green-500/50 transition-all flex items-center justify-center group"
    >
      <Phone size={28} />
      <span className="absolute right-16 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>
    </motion.a>
  );
}
