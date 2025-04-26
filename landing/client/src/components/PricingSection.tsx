import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/utils";

type PricingPlan = {
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started with AI-powered code reviews.",
    price: "$49",
    features: [
      "Up to 5 developers",
      "100 PR reviews per month",
      "GitHub integration",
      "Email notifications",
      "Basic insights"
    ],
    ctaLabel: "Start Free Trial"
  },
  {
    name: "Team",
    description: "Advanced features for growing development teams.",
    price: "$149",
    popular: true,
    features: [
      "Up to 15 developers",
      "500 PR reviews per month",
      "GitHub + GitLab integration",
      "Advanced learning model",
      "Full metrics dashboard",
      "Slack integration"
    ],
    ctaLabel: "Start Free Trial"
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large engineering organizations.",
    price: "Custom",
    features: [
      "Unlimited developers",
      "Unlimited PR reviews",
      "All integrations",
      "Custom learning models",
      "Advanced analytics",
      "Priority support",
      "Dedicated account manager"
    ],
    ctaLabel: "Contact Sales"
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

export default function PricingSection() {
  return (
    <div id="pricing" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 mb-4">
            Pricing
          </span>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            <span className="block">Simple, Transparent</span>
            <span className="block text-primary">Pricing</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Choose the plan that fits your team's needs.
          </p>
        </div>

        <motion.div 
          className="mt-16 grid gap-6 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`bg-white p-8 rounded-lg ${plan.popular 
                ? 'shadow-xl border-2 border-primary transform scale-105 relative z-10' 
                : 'shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300'}`}
              variants={item}
            >
              {plan.popular && (
                <Badge className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary hover:bg-primary text-white px-4 py-1 rounded-full">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
              <p className="mt-4 text-slate-600">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-slate-500">/month</span>}
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-6 w-6 text-emerald-500 mt-0.5 mr-2" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-white' 
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => scrollToSection("contact")}
                >
                  {plan.ctaLabel}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
