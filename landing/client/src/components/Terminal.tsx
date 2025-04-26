import React from 'react';
import { motion } from 'framer-motion';

export default function Terminal() {
  return (
    <div className="bg-[#F8F9FC] rounded-lg shadow-lg overflow-hidden border border-slate-200">
      <div className="bg-[#F1F5F9] p-2 flex items-center border-b border-slate-200">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <div className="ml-4 text-sm text-slate-600 font-medium">codesage analyze</div>
      </div>
      <div className="p-6 text-sm">
        <motion.p 
          className="text-green-600 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          $ <span className="text-slate-800 font-mono">codesage analyze pull/42</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-mono"
        >
          <p className="text-slate-600 mt-2">Analyzing PR #42: Feature - Add user authentication</p>
          <p className="text-slate-600 mt-1">→ Fetching PR diff</p>
          <p className="text-slate-600 mt-1">→ Understanding context</p>
          <p className="text-slate-600 mt-1">→ Analyzing code patterns</p>
          <p className="text-slate-600 mt-1">→ Applying team learning model</p>
          <p className="text-slate-600 mt-1">→ Generating feedback</p>
        </motion.div>
        <motion.div
          className="mt-3 text-slate-800 font-mono bg-white p-4 rounded-md border border-slate-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-amber-600 font-semibold">⚠ auth.js:78</p>
          <p className="ml-4 text-slate-800">Consider using a JWT refresh token strategy</p>
          <p className="ml-4 text-slate-500 text-xs">Your team typically implements refresh tokens for extended sessions.</p>
          
          <p className="mt-2 text-red-600 font-semibold">❌ users.js:142</p>
          <p className="ml-4 text-slate-800">Potential SQL injection vulnerability</p>
          <p className="ml-4 text-slate-500 text-xs">User input should be parameterized.</p>
          
          <p className="mt-2 text-emerald-600 font-semibold">✓ models/user.js</p>
          <p className="ml-4 text-slate-800">Great job implementing the repository pattern!</p>
          <p className="ml-4 text-slate-500 text-xs">This follows the team's established architecture.</p>
        </motion.div>
        <motion.p 
          className="text-green-600 mt-4 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          $ <span className="text-slate-800 typing-animation font-mono">_</span>
        </motion.p>
      </div>
    </div>
  );
}
