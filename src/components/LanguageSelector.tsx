import React from 'react'
import { motion } from 'framer-motion'

interface LanguageSelectorProps {
  languages: { code: string; name: string; flag: string }[];
  currentLang: string;
  handleLanguageSelect: (langCode: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, currentLang, handleLanguageSelect }) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Select Your Language</h2>
      <div className="grid grid-cols-2 gap-4">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`py-4 px-6 rounded-xl shadow-md transition duration-300 text-lg font-medium flex items-center justify-center space-x-2 ${
              currentLang === lang.code ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span>{lang.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector
