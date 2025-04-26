import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: ""
    }
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest("POST", "/api/contact", data);
      const result = await response.json();
      
      toast({
        title: "Success!",
        description: result.message || "Thank you for your interest! We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There was a problem submitting your form. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div id="contact" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 mb-4">
            Contact
          </span>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            <span className="block">Ready to Transform</span>
            <span className="block text-primary">Your Code Reviews?</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Get started with CodeSage today or schedule a demo with our team.
          </p>
        </div>

        <motion.div 
          className="mt-16 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800 font-medium">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800 font-medium">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="you@example.com" 
                            className="border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800 font-medium">Company</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your company" 
                            className="border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800 font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[120px] border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Get Started"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
