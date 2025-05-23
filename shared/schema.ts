import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  vin: text("vin").notNull().unique(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  color: text("color").notNull(),
  plates: text("plates").notNull(),
  owner: text("owner").notNull(),
  nftId: text("nft_id").unique(),
  qrCode: text("qr_code"),
  status: text("status").notNull().default("active"), // active, suspended, stolen
  registeredAt: timestamp("registered_at").defaultNow(),
  walletAddress: text("wallet_address"),
});

export const authorities = pgTable("authorities", {
  id: serial("id").primaryKey(),
  authorityId: text("authority_id").notNull().unique(),
  name: text("name").notNull(),
  department: text("department").notNull(),
  accessLevel: text("access_level").notNull(), // admin, officer, verifier
  walletAddress: text("wallet_address"),
});

export const verifications = pgTable("verifications", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").notNull(),
  verifierAddress: text("verifier_address"),
  verificationAt: timestamp("verification_at").defaultNow(),
  result: text("result").notNull(), // verified, suspicious, stolen
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  nftId: true,
  qrCode: true,
  registeredAt: true,
});

export const insertAuthoritySchema = createInsertSchema(authorities).omit({
  id: true,
});

export const insertVerificationSchema = createInsertSchema(verifications).omit({
  id: true,
  verificationAt: true,
});

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertAuthority = z.infer<typeof insertAuthoritySchema>;
export type Authority = typeof authorities.$inferSelect;
export type InsertVerification = z.infer<typeof insertVerificationSchema>;
export type Verification = typeof verifications.$inferSelect;
