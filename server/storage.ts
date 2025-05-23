import { vehicles, authorities, verifications, type Vehicle, type InsertVehicle, type Authority, type InsertAuthority, type Verification, type InsertVerification } from "@shared/schema";

export interface IStorage {
  // Vehicle operations
  getVehicle(id: number): Promise<Vehicle | undefined>;
  getVehicleByVin(vin: string): Promise<Vehicle | undefined>;
  getVehicleByPlates(plates: string): Promise<Vehicle | undefined>;
  getVehicleByNftId(nftId: string): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicleStatus(id: number, status: string): Promise<Vehicle | undefined>;
  getAllVehicles(): Promise<Vehicle[]>;
  
  // Authority operations
  getAuthority(id: number): Promise<Authority | undefined>;
  getAuthorityByAuthorityId(authorityId: string): Promise<Authority | undefined>;
  createAuthority(authority: InsertAuthority): Promise<Authority>;
  
  // Verification operations
  createVerification(verification: InsertVerification): Promise<Verification>;
  getVerificationsByVehicle(vehicleId: number): Promise<Verification[]>;
  
  // Statistics
  getStatistics(): Promise<{
    totalVehicles: number;
    verifiedVehicles: number;
    totalScans: number;
    activeUsers: number;
  }>;
}

export class MemStorage implements IStorage {
  private vehicles: Map<number, Vehicle>;
  private authorities: Map<number, Authority>;
  private verifications: Map<number, Verification>;
  private currentVehicleId: number;
  private currentAuthorityId: number;
  private currentVerificationId: number;

  constructor() {
    this.vehicles = new Map();
    this.authorities = new Map();
    this.verifications = new Map();
    this.currentVehicleId = 1;
    this.currentAuthorityId = 1;
    this.currentVerificationId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample vehicle
    const sampleVehicle: Vehicle = {
      id: this.currentVehicleId++,
      vin: "1HGBH41JXMN109186",
      model: "Toyota Corolla 2023",
      year: 2023,
      color: "Blanco",
      plates: "ABC-123-XYZ",
      owner: "Juan Pérez García",
      nftId: "1234",
      qrCode: "qr_1HGBH41JXMN109186",
      status: "active",
      registeredAt: new Date(),
      walletAddress: "0x1234567890123456789012345678901234567890"
    };
    this.vehicles.set(sampleVehicle.id, sampleVehicle);

    // Add sample authority
    const sampleAuthority: Authority = {
      id: this.currentAuthorityId++,
      authorityId: "AUTH001",
      name: "María González",
      department: "Tránsito Municipal",
      accessLevel: "officer",
      walletAddress: "0x0987654321098765432109876543210987654321"
    };
    this.authorities.set(sampleAuthority.id, sampleAuthority);
  }

  async getVehicle(id: number): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async getVehicleByVin(vin: string): Promise<Vehicle | undefined> {
    return Array.from(this.vehicles.values()).find(vehicle => vehicle.vin === vin);
  }

  async getVehicleByPlates(plates: string): Promise<Vehicle | undefined> {
    return Array.from(this.vehicles.values()).find(vehicle => vehicle.plates === plates);
  }

  async getVehicleByNftId(nftId: string): Promise<Vehicle | undefined> {
    return Array.from(this.vehicles.values()).find(vehicle => vehicle.nftId === nftId);
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = this.currentVehicleId++;
    const nftId = Math.floor(Math.random() * 100000).toString();
    const qrCode = `qr_${insertVehicle.vin}`;
    
    const vehicle: Vehicle = {
      ...insertVehicle,
      id,
      nftId,
      qrCode,
      status: "active",
      registeredAt: new Date(),
      walletAddress: insertVehicle.walletAddress || null
    };
    
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  async updateVehicleStatus(id: number, status: string): Promise<Vehicle | undefined> {
    const vehicle = this.vehicles.get(id);
    if (vehicle) {
      vehicle.status = status;
      this.vehicles.set(id, vehicle);
      return vehicle;
    }
    return undefined;
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values());
  }

  async getAuthority(id: number): Promise<Authority | undefined> {
    return this.authorities.get(id);
  }

  async getAuthorityByAuthorityId(authorityId: string): Promise<Authority | undefined> {
    return Array.from(this.authorities.values()).find(auth => auth.authorityId === authorityId);
  }

  async createAuthority(insertAuthority: InsertAuthority): Promise<Authority> {
    const id = this.currentAuthorityId++;
    const authority: Authority = { 
      ...insertAuthority, 
      id,
      walletAddress: insertAuthority.walletAddress || null
    };
    this.authorities.set(id, authority);
    return authority;
  }

  async createVerification(insertVerification: InsertVerification): Promise<Verification> {
    const id = this.currentVerificationId++;
    const verification: Verification = {
      ...insertVerification,
      id,
      verificationAt: new Date(),
      verifierAddress: insertVerification.verifierAddress || null
    };
    this.verifications.set(id, verification);
    return verification;
  }

  async getVerificationsByVehicle(vehicleId: number): Promise<Verification[]> {
    return Array.from(this.verifications.values()).filter(v => v.vehicleId === vehicleId);
  }

  async getStatistics(): Promise<{
    totalVehicles: number;
    verifiedVehicles: number;
    totalScans: number;
    activeUsers: number;
  }> {
    const totalVehicles = this.vehicles.size;
    const verifiedVehicles = Array.from(this.vehicles.values()).filter(v => v.status === "active").length;
    const totalScans = this.verifications.size * 5; // Simulated scan count
    const activeUsers = Math.floor(totalVehicles * 0.7); // Simulated active users
    
    return {
      totalVehicles,
      verifiedVehicles,
      totalScans,
      activeUsers
    };
  }
}

export const storage = new MemStorage();
