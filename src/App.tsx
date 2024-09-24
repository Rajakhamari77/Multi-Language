import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';


const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const translations = {
  en: "Welcome to our multi-language website!",
  es: "¡Bienvenido a nuestro sitio web multilingüe!",
  hi: "हमारी बहुभाषी वेबसाइट पर आपका स्वागत है!",
  pt: "Bem-vindo ao nosso site multilíngue!",
  zh: "欢迎来到我们的多语言网站！",
  fr: "Bienvenue sur notre site web multilingue !",
};

export default function Home() {
  const [currentLang, setCurrentLang] = useState('en');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');
  const [authStep, setAuthStep] = useState('input');
  const [authInput, setAuthInput] = useState('');
  const [otp, setOtp] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLang(langCode);
    setShowAuthModal(true);
    setAuthStep('input');
    setAuthInput('');
    setOtp('');
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authStep === 'input') {
      setIsLoading(true);
      console.log(`OTP sent to ${selectedLang === 'fr' ? 'email' : 'phone'}: ${authInput}`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setAuthStep('otp');
      setIsLoading(false);

      // Automatically fill and verify OTP after a delay
      setTimeout(() => {
        setOtp('1234');
        setTimeout(() => verifyOtp('1234'), 1000); // Auto-verify OTP
      }, 1500);
    }
  };

  const verifyOtp = (inputOtp: string) => {
    if (inputOtp === '1234') {
      setCurrentLang(selectedLang);
      setShowAuthModal(false);
      setShowSuccess(true);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Multi-language Experience
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Select Your Language</h2>
              <div className="grid grid-cols-2 gap-4">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`py-4 px-6 rounded-xl shadow-md transition duration-300 text-lg font-medium flex items-center justify-center space-x-2 ${
                      currentLang === lang.code
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Translated Content</h2>
              <div className="bg-gray-100 rounded-xl p-6">
                <p className="text-2xl text-gray-700">
                  {translations[currentLang as keyof typeof translations]}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showAuthModal && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
              >
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                  {authStep === 'input' ? 'Verify Your Identity' : 'Enter OTP'}
                </h2>
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                  {authStep === 'input' ? (
                    <div>
                      <label htmlFor="authInput" className="block text-sm font-medium text-gray-700 mb-2">
                        {selectedLang === 'fr' ? 'Email Address' : 'Phone Number'}
                      </label>
                      <input
                        type={selectedLang === 'fr' ? 'email' : 'tel'}
                        id="authInput"
                        value={authInput}
                        onChange={(e) => setAuthInput(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder={selectedLang === 'fr' ? 'Enter your email' : 'Enter your phone number'}
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                        One-Time Password
                      </label>
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter the OTP"
                      />
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    className="w-full bg-teal-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:bg-teal-600 transition duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                    ) : authStep === 'input' ? 'Send OTP' : 'Verify OTP'}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              Language successfully changed to {languages.find((lang) => lang.code === currentLang)?.name}!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
