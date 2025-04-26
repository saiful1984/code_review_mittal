import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body against the schema
      const validatedData = contactSubmissionSchema.parse(req.body);
      
      // Store the submission
      // For now, we're just logging it since we're using in-memory storage
      console.log("Contact form submission:", validatedData);
      
      // In a real application, you would store this in a database
      // const submission = await storage.createContactSubmission(validatedData);
      
      return res.status(200).json({ 
        success: true, 
        message: "Thank you for your interest! We'll get back to you soon." 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Something went wrong. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
