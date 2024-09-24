import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface AuthModalProps {
  selectedLang: string;
  authStep: string;
  authInput: string;
  otp: string;
  isLoading: boolean;
  setAuthStep: (step: string) => void;
  setAuthInput: (input: string) => void;
  setOtp: (otp: string) => void;
  handleAuthSubmit: (e: React.FormEvent) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  selectedLang,
  authStep,
  authInput,
  otp,
  isLoading,
  setAuthInput,
  setOtp,
  handleAuthSubmit
}) => {
  return (
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
            {isLoading ? 'Sending OTP...' : authStep === 'input' ? 'Send OTP' : 'Verify OTP'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default AuthModal
