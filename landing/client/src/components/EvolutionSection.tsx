import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

type FeatureCheckType = {
  text: string;
  available: boolean;
};

const linterFeatures: FeatureCheckType[] = [
  { text: 'Syntax checking', available: true },
  { text: 'Style enforcement', available: true },
  { text: 'No contextual understanding', available: false },
  { text: 'Limited to rigid rules', available: false },
  { text: 'No learning capability', available: false }
];

const staticAnalysisFeatures: FeatureCheckType[] = [
  { text: 'Bug detection', available: true },
  { text: 'Security scanning', available: true },
  { text: 'Complexity analysis', available: true },
  { text: 'Limited project context', available: false },
  { text: 'Generic recommendations', available: false }
];

const codeSageFeatures: FeatureCheckType[] = [
  { text: 'Full contextual understanding', available: true },
  { text: 'Team pattern recognition', available: true },
  { text: 'Actionable recommendations', available: true },
  { text: 'Continuous learning', available: true },
  { text: 'Detailed explanations', available: true }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function EvolutionSection() {
  return (
    <div id="evolution" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 mb-4">
            Evolution
          </span>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            <span className="block">The Evolution of</span>
            <span className="block text-primary">Code Review</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            See how CodeSage elevates code review beyond traditional tools.
          </p>
        </div>

        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Traditional Linters */}
          <motion.div 
            className="p-6 rounded-lg shadow-md bg-white border border-slate-200"
            variants={item}
          >
            <div className="h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 text-center mb-4">Traditional Linters</h3>
            <ul className="space-y-3 text-slate-700">
              {linterFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  {feature.available ? (
                    <Check className="h-5 w-5 text-emerald-500 mt-0.5 mr-2" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                  )}
                  {feature.text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Static Analysis Tools */}
          <motion.div 
            className="p-6 rounded-lg shadow-md bg-white border border-slate-200"
            variants={item}
          >
            <div className="h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 text-center mb-4">Static Analysis Tools</h3>
            <ul className="space-y-3 text-slate-700">
              {staticAnalysisFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  {feature.available ? (
                    <Check className="h-5 w-5 text-emerald-500 mt-0.5 mr-2" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                  )}
                  {feature.text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CodeSage */}
          <motion.div 
            className="p-6 rounded-lg shadow-xl bg-white border-2 border-primary transform scale-105 relative"
            variants={item}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs uppercase tracking-wider font-semibold rounded-full">
              Advanced
            </div>
            <div className="h-16 flex items-center justify-center">
              <div className="flex items-center">
                <span className="text-primary font-bold text-2xl mr-1">Code</span>
                <span className="text-slate-900 font-bold text-2xl">Sage</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 text-center mb-4">CodeSage</h3>
            <ul className="space-y-3 text-slate-700">
              {codeSageFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                  {feature.text}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
