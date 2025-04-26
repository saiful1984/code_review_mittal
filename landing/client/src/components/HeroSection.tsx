import { Button } from "@/components/ui/button";
import Terminal from "@/components/Terminal";
import { FaGithub, FaGitlab, FaBitbucket } from "react-icons/fa";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="pt-24 sm:pt-32 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 mb-4">
              AI-Powered Code Review
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-slate-900">
              <span className="block mb-2">Smarter Code Reviews</span>
              <span className="text-primary">Powered by AI</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600">
              CodeSage analyzes your pull requests using contextual understanding and machine learning to provide meaningful, actionable code review feedback.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              variant="default" 
              className="bg-primary hover:bg-primary/90 text-white text-base px-6"
              onClick={() => scrollToSection("contact")}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-slate-300 text-slate-700 hover:bg-slate-50 text-base px-6"
              onClick={() => scrollToSection("workflow")}
            >
              How It Works
            </Button>
          </div>
          <div className="pt-4">
            <p className="text-slate-500 text-sm font-medium">Works with:</p>
            <div className="flex space-x-8 mt-3">
              <div className="flex items-center text-slate-700">
                <FaGithub className="text-xl mr-2" />
                <span className="font-medium">GitHub</span>
              </div>
              <div className="flex items-center text-slate-700">
                <FaGitlab className="text-xl mr-2" />
                <span className="font-medium">GitLab</span>
              </div>
              <div className="flex items-center text-slate-700">
                <FaBitbucket className="text-xl mr-2" />
                <span className="font-medium">Bitbucket</span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="shadow-xl rounded-lg overflow-hidden"
        >
          <Terminal />
        </motion.div>
      </div>
    </div>
  );
}
