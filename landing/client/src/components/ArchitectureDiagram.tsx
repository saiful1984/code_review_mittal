import { motion } from 'framer-motion';

export default function ArchitectureDiagram() {
  return (
    <svg className="w-full h-auto" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
      {/* Nodes */}
      {/* GitHub */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        transform="translate(100, 150)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="35" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">GitHub Repo</text>
      </motion.g>
      
      {/* Webhook Server */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        transform="translate(280, 150)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="28" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">Webhook Server</text>
        <text x="60" y="46" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#64748b" textAnchor="middle">(FastAPI/Lambda)</text>
      </motion.g>
      
      {/* PR Diff Fetcher */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        transform="translate(460, 150)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="35" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">PR Diff Fetcher</text>
      </motion.g>
      
      {/* LLM Code Analyzer */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        transform="translate(640, 150)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="35" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">LLM Code Analyzer</text>
      </motion.g>
      
      {/* Contextual Analysis */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        transform="translate(640, 270)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="28" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">Contextual</text>
        <text x="60" y="46" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">Analysis</text>
      </motion.g>
      
      {/* Feedback Generator */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        transform="translate(460, 270)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="35" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">Feedback Generator</text>
      </motion.g>
      
      {/* GitHub Commenter */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        transform="translate(280, 270)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="35" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">GitHub Commenter</text>
      </motion.g>
      
      {/* Email Sender */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        transform="translate(100, 270)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="35" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">Email Sender</text>
      </motion.g>
      
      {/* Team Learning Loop */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
        transform="translate(460, 390)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="28" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">Team Learning</text>
        <text x="60" y="46" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">Loop</text>
      </motion.g>
      
      {/* Metrics Module */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.0 }}
        transform="translate(640, 390)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="28" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">Metrics &</text>
        <text x="60" y="46" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">Insights Engine</text>
      </motion.g>
      
      {/* Repo Connector */}
      <motion.g 
        className="node" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.1 }}
        transform="translate(820, 270)"
      >
        <rect x="0" y="0" width="120" height="60" rx="8" fill="#f0f4f8" stroke="#3172d9" strokeWidth="2"/>
        <text x="60" y="28" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="500">Repo Connector</text>
        <text x="60" y="46" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#64748b" textAnchor="middle">(GitHub, GitLab)</text>
      </motion.g>
      
      {/* Flow Lines */}
      <motion.path 
        d="M 220 180 L 280 180" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.path 
        d="M 400 180 L 460 180" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.path 
        d="M 580 180 L 640 180" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.path 
        d="M 700 210 L 700 270" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.path 
        d="M 640 300 L 580 300" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      <motion.path 
        d="M 460 300 L 400 300" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      />
      <motion.path 
        d="M 280 300 L 220 300" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.path 
        d="M 640 330 L 640 360 L 580 360 L 580 390" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      />
      <motion.path 
        d="M 520 390 L 520 330 L 670 330 L 670 210" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      />
      <motion.path 
        d="M 700 330 L 700 390" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      />
      <motion.path 
        d="M 820 300 L 760 300" 
        stroke="#3172d9" 
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />
    </svg>
  );
}
