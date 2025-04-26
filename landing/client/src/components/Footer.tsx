import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { scrollToSection } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-6">
              <span className="text-blue-400 font-bold text-2xl mr-1">Code</span>
              <span className="text-white font-bold text-2xl">Sage</span>
            </div>
            <p className="text-slate-400">
              Smart, contextual code reviews powered by AI. Help your team ship better code, faster.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection("features")} className="text-slate-400 hover:text-white">Features</button></li>
              <li><button onClick={() => scrollToSection("workflow")} className="text-slate-400 hover:text-white">How it Works</button></li>
              <li><button onClick={() => scrollToSection("pricing")} className="text-slate-400 hover:text-white">Pricing</button></li>
              <li><a href="#" className="text-slate-400 hover:text-white">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white">Guides</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white">API Docs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white">Careers</a></li>
              <li><button onClick={() => scrollToSection("contact")} className="text-slate-400 hover:text-white">Contact</button></li>
              <li><a href="#" className="text-slate-400 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-400 text-sm text-center">
            &copy; {new Date().getFullYear()} CodeSage Technologies, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
