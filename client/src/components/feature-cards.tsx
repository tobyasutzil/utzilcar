import { Shield, QrCode, Smartphone, Search, Users, Bitcoin } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Seguridad Blockchain",
    description: "Registro inmutable y descentralizado que garantiza la autenticidad de la información vehicular.",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: QrCode,
    title: "Códigos QR Únicos",
    description: "Generación automática de QR codes vinculados al NFT del vehículo para verificación instantánea.",
    gradient: "from-green-500 to-green-600"
  },
  {
    icon: Smartphone,
    title: "Escáner Integrado",
    description: "Scanner QR nativo en la aplicación web para verificación rápida desde cualquier dispositivo.",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: Search,
    title: "Consulta Instantánea",
    description: "Acceso inmediato a información vehicular: VIN, estatus legal, propietario y historial.",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    icon: Users,
    title: "Sistema de Roles",
    description: "Diferentes niveles de acceso para ciudadanos, autoridades y verificadores oficiales.",
    gradient: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Bitcoin,
    title: "MetaMask Integration",
    description: "Conexión directa con MetaMask para transacciones seguras y gestión de identidad digital.",
    gradient: "from-red-500 to-red-600"
  }
];

export default function FeatureCards() {
  return (
    <section className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Características Principales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una plataforma completa para la gestión vehicular moderna con tecnología blockchain
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-effect p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-white text-2xl w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
