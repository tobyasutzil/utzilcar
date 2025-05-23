import { useState, useEffect, useRef, RefObject } from "react";
import { useToast } from "@/hooks/use-toast";
import { parseVehicleQRData } from "@/lib/qr-utils";

interface QRScannerData {
  vin?: string;
  nftId?: string;
  verifyUrl?: string;
}

export function useQRScanner(videoRef: RefObject<HTMLVideoElement>) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<QRScannerData | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const startScanning = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera if available
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
        
        toast({
          title: "Escáner activado",
          description: "Apunte la cámara hacia el código QR del vehículo",
        });

        // Simulate QR code detection for demo
        // In a real implementation, you would use a QR code detection library like ZXing or jsQR
        setTimeout(() => {
          const mockQRData = {
            vin: "1HGBH41JXMN109186",
            nftId: "1234",
            verifyUrl: `${window.location.origin}/verify/1`
          };
          setScannedData(mockQRData);
          toast({
            title: "QR detectado",
            description: "Código QR del vehículo escaneado exitosamente",
          });
        }, 3000);
      }
    } catch (error: any) {
      let errorMessage = "No se pudo acceder a la cámara";
      
      if (error.name === 'NotAllowedError') {
        errorMessage = "Acceso a la cámara denegado. Por favor permita el acceso a la cámara.";
      } else if (error.name === 'NotFoundError') {
        errorMessage = "No se encontró ninguna cámara en el dispositivo.";
      } else if (error.name === 'NotSupportedError') {
        errorMessage = "El navegador no soporta acceso a la cámara.";
      }

      toast({
        title: "Error del escáner",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
    
    toast({
      title: "Escáner detenido",
      description: "El escáner QR ha sido desactivado",
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return {
    isScanning,
    scannedData,
    startScanning,
    stopScanning,
  };
}
