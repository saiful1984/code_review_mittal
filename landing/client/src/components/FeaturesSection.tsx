import { Brain, History, MessageSquare, GitBranch, LineChart, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'Contextual Understanding',
    description: 'Analyzes code in the context of your entire codebase, not just isolated snippets. Understands project architecture and design patterns.'
  },
  {
    icon: <History className="h-6 w-6" />,
    title: 'Historical Learning',
    description: 'Learns from past reviews and feedback to provide increasingly relevant suggestions tailored to your team\'s practices and preferences.'
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Actionable Feedback',
    description: 'Goes beyond finding issues by suggesting specific improvements with explanations and examples of best practices.'
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: 'Multi-Repository Support',
    description: 'Works seamlessly with GitHub, GitLab, and Bitbucket. Integrates into your existing workflow without disruption.'
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: 'Metrics & Insights',
    description: 'Tracks code quality metrics over time, identifying trends and providing actionable insights to improve your development process.'
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Team Learning',
    description: 'Facilitates knowledge sharing across the team with detailed explanations that help junior developers learn from feedback.'
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

export default function FeaturesSection() {
  return (
    <div id="features" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 mb-4">
            Features
          </span>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            <span className="block">Advanced Features for</span>
            <span className="block text-primary">Intelligent Code Reviews</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            CodeSage goes beyond traditional linters and static analysis tools.
          </p>
        </div>

        <motion.div 
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition duration-300"
              variants={item}
            >
              <div className="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
