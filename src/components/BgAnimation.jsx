import React from 'react';
import { motion } from 'framer-motion';
const BgAnimation = () => {
  return (
    <>
        {/* <motion.div
            className="absolute w-40 h-40 bg-purple-300 rounded-full top-10 left-10 opacity-30"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
        /> */}
        {/* <motion.div
        className="absolute w-32 h-32 bg-green-200 rounded-full bottom-10 right-10 opacity-20"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        /> */}
        {/* <motion.div
        className="absolute w-24 h-24 bg-pink-200 rounded-full top-1/2 left-1/3 opacity-20"
        animate={{ y: [0, 40, 0], x: [0, -25, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        /> */}
    
        {/* New coin animation */}
        <motion.div
        className="absolute w-16 h-16 bg-yellow-300- rounded-full top-10 left-30 bottom-1/4- opacity-50"
        animate={{ y: [0, 5, 0], x: [0, 60, 0], rotate: [0, 60, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        >
        <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="opacity-40"
        >
            {/* Outer coin circle */}
            <circle cx="50" cy="50" r="45" fill="#FFD700" stroke="#DAA520" strokeWidth="5" />
            {/* Inner shine ring */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="#FFF8DC" strokeWidth="3" strokeDasharray="6 6" />
            {/* Rupee Sign */}
            <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="32"
            fontWeight="bold"
            fill="#B8860B"
            fontFamily="Arial"
            >
            ₹
            </text>
        </svg>
    
        </motion.div>
    
        {/* New money animation */}
        <motion.div
        className="absolute w-20 h-20 rounded-full top-20 right-10 opacity-50"
        animate={{ y: [0, -40, 0], x: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        >
    
        <svg
            width="90"
            height="60"
            viewBox="0 0 120 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="opacity-40"
        >
            {/* Note body */}
            <rect x="2" y="2" width="116" height="56" rx="8" fill="#A8E6CF" stroke="#34A853" strokeWidth="4" />
    
            {/* Center circle */}
            <circle cx="60" cy="30" r="12" fill="#34A853" opacity="0.2" />
    
            {/* Rupee symbol */}
            <text x="60" y="35" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#388E3C" fontFamily="Arial"
            >
            ₹
            </text>
    
            {/* Left eye */}
            <circle cx="20" cy="30" r="5" fill="#34A853" />
    
            {/* Right eye */}
            <circle cx="100" cy="30" r="5" fill="#34A853" />
        </svg>
    
        </motion.div>
        
        {/* Animated Blobs */}
        <motion.div
        className="absolute top-1 left-5 w-40 h-40 bg-yellow-300 rounded-full opacity-60 blur-2xl"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* <motion.div
        className="absolute top-[60%] left-[20%] w-32 h-32 bg-green-400 rounded-full opacity-40 blur-2xl"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        /> */}
        {/* <motion.div
        className="absolute bottom-10 right-10 w-52 h-52 bg-blue-400 rounded-full opacity-30 blur-3xl"
        animate={{ y: [0, 15, 0], x: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        /> */}
        <motion.div
        className="absolute bottom-[20%] left-[70%] w-24 h-24 bg-emerald-500 rounded-full opacity-40 blur-2xl"
        animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
    </>
);
};
    
export default BgAnimation;