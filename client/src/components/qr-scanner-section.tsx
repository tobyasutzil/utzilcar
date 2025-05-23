import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQRScanner } from "@/hooks/use-qr-scanner";
import { Camera, Play, Square, CheckCircle } from "lucide-react";

export default function QRScannerSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isScanning, startScanning, stopScanning, scannedData } = useQRScanner(videoRef);

  return (
    <section id="scanner" className="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Escáner de Códigos QR
          </h2>
          <p className="text-lg text-purple-200">
            Escanee el código QR del vehículo para verificar su autenticidad e información
          </p>
        </div>
        
        <Card className="glass-effect-dark">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-black/50 rounded-2xl p-8 text-center">
                  <div className="w-full h-64 bg-gray-800 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-600 relative overflow-hidden">
                    {isScanning ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera className="text-gray-400 text-4xl mb-4 w-16 h-16 mx-auto" />
                        <p className="text-gray-400">Cámara se activará aquí</p>
                        <p className="text-sm text-gray-500 mt-2">Permita acceso a la cámara</p>
                      </div>
                    )}
                  </div>
                  <Button 
                    onClick={isScanning ? stopScanning : startScanning}
                    className={`mt-4 px-6 py-2 rounded-lg transition-colors ${
                      isScanning 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isScanning ? (
                      <>
                        <Square className="mr-2 w-4 h-4" />
                        Detener Escáner
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 w-4 h-4" />
                        Iniciar Escáner
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-white/20 border-white/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Cómo Usar el Escáner
                    </h3>
                    <ul className="space-y-3 text-purple-100">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="text-green-400 mt-1 w-4 h-4 flex-shrink-0" />
                        <span>Permite acceso a la cámara cuando se solicite</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="text-green-400 mt-1 w-4 h-4 flex-shrink-0" />
                        <span>Enfoca el código QR del vehículo</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="text-green-400 mt-1 w-4 h-4 flex-shrink-0" />
                        <span>La información se mostrará automáticamente</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/20 border-white/30">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-white mb-3">Último Escaneo:</h4>
                    {scannedData ? (
                      <div className="text-purple-200 text-sm space-y-1">
                        <p>VIN: <span className="text-white font-mono">{scannedData.vin}</span></p>
                        <p>NFT ID: <span className="text-white font-mono">#{scannedData.nftId}</span></p>
                        <p>Estatus: <span className="text-green-400 font-semibold">✓ Verificado</span></p>
                      </div>
                    ) : (
                      <p className="text-purple-200 text-sm">No hay escaneos recientes</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
