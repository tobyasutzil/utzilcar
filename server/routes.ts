import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVehicleSchema, insertAuthoritySchema, insertVerificationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Vehicle routes
  app.post("/api/vehicles", async (req, res) => {
    try {
      const vehicleData = insertVehicleSchema.parse(req.body);
      
      // Check if VIN already exists
      const existingVehicle = await storage.getVehicleByVin(vehicleData.vin);
      if (existingVehicle) {
        return res.status(400).json({ error: "Vehicle with this VIN already exists" });
      }
      
      const vehicle = await storage.createVehicle(vehicleData);
      res.json(vehicle);
    } catch (error) {
      res.status(400).json({ error: "Invalid vehicle data" });
    }
  });

  app.get("/api/vehicles/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const vehicle = await storage.getVehicle(id);
    
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    
    res.json(vehicle);
  });

  app.get("/api/vehicles", async (req, res) => {
    const vehicles = await storage.getAllVehicles();
    res.json(vehicles);
  });

  // Vehicle search routes
  app.get("/api/search/vin/:vin", async (req, res) => {
    const vehicle = await storage.getVehicleByVin(req.params.vin);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json(vehicle);
  });

  app.get("/api/search/plates/:plates", async (req, res) => {
    const vehicle = await storage.getVehicleByPlates(req.params.plates);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json(vehicle);
  });

  app.get("/api/search/nft/:nftId", async (req, res) => {
    const vehicle = await storage.getVehicleByNftId(req.params.nftId);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json(vehicle);
  });

  // Vehicle status update (for authorities)
  app.patch("/api/vehicles/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!["active", "suspended", "stolen"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      
      const vehicle = await storage.updateVehicleStatus(id, status);
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      
      res.json(vehicle);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Authority routes
  app.post("/api/authorities", async (req, res) => {
    try {
      const authorityData = insertAuthoritySchema.parse(req.body);
      const authority = await storage.createAuthority(authorityData);
      res.json(authority);
    } catch (error) {
      res.status(400).json({ error: "Invalid authority data" });
    }
  });

  app.post("/api/authorities/login", async (req, res) => {
    try {
      const { authorityId, accessKey } = req.body;
      
      const authority = await storage.getAuthorityByAuthorityId(authorityId);
      if (!authority) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // In a real app, you'd verify the access key
      // For now, we'll accept any non-empty key
      if (!accessKey) {
        return res.status(401).json({ error: "Access key required" });
      }
      
      res.json({ authority, token: "mock_jwt_token" });
    } catch (error) {
      res.status(400).json({ error: "Invalid login data" });
    }
  });

  // Verification routes
  app.post("/api/verifications", async (req, res) => {
    try {
      const verificationData = insertVerificationSchema.parse(req.body);
      const verification = await storage.createVerification(verificationData);
      res.json(verification);
    } catch (error) {
      res.status(400).json({ error: "Invalid verification data" });
    }
  });

  app.get("/api/vehicles/:id/verifications", async (req, res) => {
    const vehicleId = parseInt(req.params.id);
    const verifications = await storage.getVerificationsByVehicle(vehicleId);
    res.json(verifications);
  });

  // Statistics route
  app.get("/api/statistics", async (req, res) => {
    const stats = await storage.getStatistics();
    res.json(stats);
  });

  // QR code generation route
  app.get("/api/vehicles/:id/qr", async (req, res) => {
    const id = parseInt(req.params.id);
    const vehicle = await storage.getVehicle(id);
    
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    
    // Return QR data for frontend to generate QR code
    const qrData = {
      vin: vehicle.vin,
      nftId: vehicle.nftId,
      verifyUrl: `${req.protocol}://${req.get('host')}/verify/${vehicle.id}`
    };
    
    res.json(qrData);
  });

  const httpServer = createServer(app);
  return httpServer;
}
