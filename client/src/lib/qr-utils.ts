// QR Code utilities for generation and parsing

// Simple QR code generation using a public API
export const generateQRCode = (data: string, size: number = 128): string => {
  const encodedData = encodeURIComponent(data);
  // Using QR Server API for QR code generation
  return `<img src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}" alt="QR Code" class="w-full h-full object-contain" />`;
};

// Parse QR code data for vehicle verification
export const parseVehicleQRData = (qrData: string): { vin?: string; nftId?: string; verifyUrl?: string } | null => {
  try {
    const parsed = JSON.parse(qrData);
    if (parsed.vin && parsed.nftId) {
      return parsed;
    }
    return null;
  } catch (error) {
    // Try to parse as simple VIN
    if (typeof qrData === 'string' && qrData.length === 17) {
      return { vin: qrData };
    }
    return null;
  }
};

// Validate VIN format
export const isValidVIN = (vin: string): boolean => {
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
  return vinRegex.test(vin);
};

// Generate verification URL for QR codes
export const generateVerificationURL = (vehicleId: number, baseUrl?: string): string => {
  const base = baseUrl || window.location.origin;
  return `${base}/verify/${vehicleId}`;
};

// Extract vehicle ID from verification URL
export const extractVehicleIdFromURL = (url: string): number | null => {
  const match = url.match(/\/verify\/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};
