import React from 'react'
import { motion } from 'framer-motion'

const SuccessMessage: React.FC = () => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg text-lg font-medium"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
    >
      Language switched successfully!
    </motion.div>
  )
}

export default SuccessMessage
