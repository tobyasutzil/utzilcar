import { Button } from "@/components/ui/button";
import { PlusCircle, QrCode } from "lucide-react";

export default function HeroSection() {
  const scrollToRegistration = () => {
    const element = document.getElementById('registro');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToScanner = () => {
    const element = document.getElementById('scanner');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Registro Vehicular
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {" "}en Blockchain
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Registra y verifica vehículos de forma segura e inmutable usando tecnología blockchain. 
            Genera códigos QR únicos y consulta información vehicular al instante.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToRegistration}
              className="gradient-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <PlusCircle className="mr-2 w-5 h-5" />
              Registrar Vehículo
            </Button>
            <Button 
              onClick={scrollToScanner}
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <QrCode className="mr-2 w-5 h-5" />
              Escanear QR
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating elements for visual appeal */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-600/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-600/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}
