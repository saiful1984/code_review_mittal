import { motion } from 'framer-motion';
import ArchitectureDiagram from './ArchitectureDiagram';

const workflowSteps = [
  {
    number: '1',
    title: 'Pull Request Creation',
    description: 'When a developer opens or updates a PR, GitHub triggers CodeSage\'s webhook server, initiating the review process.'
  },
  {
    number: '2',
    title: 'Code Fetch & Analysis',
    description: 'CodeSage fetches the PR diff and passes it to the LLM Code Analyzer, which examines the changes with contextual understanding.'
  },
  {
    number: '3',
    title: 'Contextual Understanding',
    description: 'The system connects to your repository to understand your code architecture, patterns, and team history for better analysis.'
  },
  {
    number: '4',
    title: 'Feedback Generation',
    description: 'CodeSage generates constructive, actionable feedback with specific recommendations and explanations of best practices.'
  },
  {
    number: '5',
    title: 'Feedback Delivery',
    description: 'Review comments are posted directly to GitHub and can also be sent via email, integrating seamlessly with your workflow.'
  },
  {
    number: '6',
    title: 'Continuous Learning',
    description: 'CodeSage learns from each review, tracking metrics and improving suggestions over time based on your team\'s practices.'
  }
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

export default function WorkflowSection() {
  return (
    <div id="workflow" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 mb-4">
            Workflow
          </span>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            <span className="block">How CodeSage</span>
            <span className="block text-primary">Transforms Code Reviews</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            A seamless workflow that integrates with your existing development process.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-white p-4 rounded-lg shadow-md border border-slate-100"
        >
          <ArchitectureDiagram />
        </motion.div>

        <motion.div 
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {workflowSteps.map((step, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition duration-300"
              variants={item}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary font-semibold mr-3">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
              </div>
              <p className="text-slate-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
