import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { generateQRCode } from "@/lib/qr-utils";
import { Search, Info, Shield, ExternalLink, QrCode } from "lucide-react";
import type { Vehicle } from "@shared/schema";

export default function VerificationSection() {
  const [searchType, setSearchType] = useState<"vin" | "plates" | "nft">("vin");
  const [searchValue, setSearchValue] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState<Vehicle | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string>("");
  const { toast } = useToast();

  const searchMutation = useMutation({
    mutationFn: async () => {
      const endpoint = `/api/search/${searchType}/${encodeURIComponent(searchValue)}`;
      const response = await apiRequest("GET", endpoint);
      return response.json();
    },
    onSuccess: (data: Vehicle) => {
      setVehicleInfo(data);
      // Generate QR code for the vehicle
      const qrData = JSON.stringify({
        vin: data.vin,
        nftId: data.nftId,
        verifyUrl: `${window.location.origin}/verify/${data.id}`
      });
      setQrCodeData(generateQRCode(qrData));
      toast({
        title: "Vehículo encontrado",
        description: "Información del vehículo cargada exitosamente",
      });
    },
    onError: () => {
      setVehicleInfo(null);
      setQrCodeData("");
      toast({
        title: "Vehículo no encontrado",
        description: "No se encontró ningún vehículo con los criterios especificados",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor ingrese un valor para buscar",
        variant: "destructive",
      });
      return;
    }
    searchMutation.mutate();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-300">✓ Verificado</Badge>;
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">⚠ Suspendido</Badge>;
      case "stolen":
        return <Badge className="bg-red-100 text-red-800 border-red-300">🚨 Reportado</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  return (
    <section id="verificar" className="py-20 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Verificación de Vehículos
          </h2>
          <p className="text-lg text-gray-600">
            Consulte la información de cualquier vehículo registrado en la plataforma
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Search Form */}
          <Card className="glass-effect">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Buscar Vehículo
              </h3>
              
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-900 mb-2">
                    Buscar por:
                  </Label>
                  <Select value={searchType} onValueChange={(value: "vin" | "plates" | "nft") => setSearchType(value)}>
                    <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vin">Número VIN</SelectItem>
                      <SelectItem value="plates">Placas</SelectItem>
                      <SelectItem value="nft">ID de NFT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Input 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Ingrese el valor a buscar..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={searchMutation.isPending}
                  className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <Search className="mr-2 w-4 h-4" />
                  {searchMutation.isPending ? 'Buscando...' : 'Buscar Vehículo'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Results Panel */}
          <Card className="glass-effect">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Información del Vehículo
              </h3>
              
              {vehicleInfo ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">{vehicleInfo.model}</h4>
                      <p className="text-gray-600 font-mono text-sm">VIN: {vehicleInfo.vin}</p>
                    </div>
                    {getStatusBadge(vehicleInfo.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Año:</span>
                      <p className="font-medium">{vehicleInfo.year}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Color:</span>
                      <p className="font-medium">{vehicleInfo.color}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Placas:</span>
                      <p className="font-medium font-mono">{vehicleInfo.plates}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Propietario:</span>
                      <p className="font-medium">{vehicleInfo.owner}</p>
                    </div>
                  </div>
                  
                  <Card className="bg-blue-50 border-l-4 border-blue-600">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="text-blue-600 mt-1 w-5 h-5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-gray-900">Información Blockchain</h5>
                          <p className="text-sm text-gray-600 mt-1">
                            NFT ID: #{vehicleInfo.nftId} | Registrado: {new Date(vehicleInfo.registeredAt!).toLocaleDateString()} | 
                            <a href="#" className="text-blue-600 hover:underline ml-1">
                              <ExternalLink className="inline w-3 h-3 ml-1" />
                              Ver en Etherscan
                            </a>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* QR Code Display */}
                  {qrCodeData && (
                    <div className="text-center pt-4">
                      <div className="inline-block bg-white p-4 rounded-xl border shadow-sm">
                        <div 
                          className="w-32 h-32 border rounded flex items-center justify-center bg-white"
                          dangerouslySetInnerHTML={{ __html: qrCodeData }}
                        />
                        <p className="text-xs text-gray-600 mt-2 flex items-center justify-center gap-1">
                          <QrCode className="w-3 h-3" />
                          Código QR del vehículo
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Ingrese los datos de búsqueda para mostrar la información del vehículo</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
