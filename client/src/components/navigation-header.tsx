import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { Car, Bitcoin } from "lucide-react";

export default function NavigationHeader() {
  const { isConnected, walletAddress, connectWallet, isConnecting } = useWallet();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Car className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-900">UtzilCar</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('registro')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Registrar
            </button>
            <button 
              onClick={() => scrollToSection('verificar')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Verificar
            </button>
            <button 
              onClick={() => scrollToSection('scanner')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Escanear
            </button>
            <button 
              onClick={() => scrollToSection('autoridades')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Autoridades
            </button>
          </div>
          
          <Button 
            onClick={connectWallet}
            disabled={isConnecting}
            className={`gradient-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2 ${
              isConnected ? 'bg-green-600 hover:bg-green-700' : ''
            }`}
          >
            <Bitcoin className="w-4 h-4" />
            <span>
              {isConnecting ? 'Conectando...' : 
               isConnected ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}` : 
               'Conectar Wallet'}
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
