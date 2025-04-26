import { useState } from "react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const handleNavigation = (id: string) => {
    scrollToSection(id);
    setMobileMenuVisible(false);
  };

  return (
    <nav className="fixed w-full bg-white z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-2xl mr-1">Code</span>
              <span className="text-foreground font-bold text-2xl">Sage</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              className="text-slate-600 hover:text-primary hover:bg-slate-50" 
              onClick={() => handleNavigation("features")}
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              className="text-slate-600 hover:text-primary hover:bg-slate-50" 
              onClick={() => handleNavigation("workflow")}
            >
              Workflow
            </Button>
            <Button 
              variant="ghost" 
              className="text-slate-600 hover:text-primary hover:bg-slate-50" 
              onClick={() => handleNavigation("evolution")}
            >
              Evolution
            </Button>
            <Button 
              variant="ghost" 
              className="text-slate-600 hover:text-primary hover:bg-slate-50" 
              onClick={() => handleNavigation("pricing")}
            >
              Pricing
            </Button>
            <Button 
              variant="default" 
              className="ml-2 bg-primary hover:bg-primary/90 text-white" 
              onClick={() => handleNavigation("contact")}
            >
              Get Started
            </Button>
          </div>
          <div className="flex md:hidden items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="text-slate-700 hover:bg-slate-100"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white shadow-md ${mobileMenuVisible ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Button 
            variant="ghost" 
            className="block w-full text-left px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-50" 
            onClick={() => handleNavigation("features")}
          >
            Features
          </Button>
          <Button 
            variant="ghost" 
            className="block w-full text-left px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-50" 
            onClick={() => handleNavigation("workflow")}
          >
            Workflow
          </Button>
          <Button 
            variant="ghost" 
            className="block w-full text-left px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-50" 
            onClick={() => handleNavigation("evolution")}
          >
            Evolution
          </Button>
          <Button 
            variant="ghost" 
            className="block w-full text-left px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-50" 
            onClick={() => handleNavigation("pricing")}
          >
            Pricing
          </Button>
          <Button 
            variant="default" 
            className="block w-full text-left px-3 py-2 mt-3 bg-primary hover:bg-primary/90 text-white" 
            onClick={() => handleNavigation("contact")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
