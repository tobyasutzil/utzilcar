import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Car, CheckCircle, QrCode, Users } from "lucide-react";

const defaultStats = {
  totalVehicles: 0,
  verifiedVehicles: 0,
  totalScans: 0,
  activeUsers: 0,
};

export default function StatsSection() {
  const { data: stats = defaultStats } = useQuery({
    queryKey: ["/api/statistics"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const statItems = [
    {
      icon: Car,
      value: stats.totalVehicles.toLocaleString(),
      label: "Vehículos Registrados",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: CheckCircle,
      value: stats.verifiedVehicles.toLocaleString(),
      label: "Verificaciones Exitosas",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: QrCode,
      value: stats.totalScans.toLocaleString(),
      label: "Escaneos QR",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      value: stats.activeUsers.toLocaleString(),
      label: "Usuarios Activos",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Estadísticas de la Plataforma
          </h2>
          <p className="text-lg text-gray-600">
            Transparencia total en el registro vehicular
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {statItems.map((stat, index) => (
            <Card key={index} className="glass-effect hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-white text-2xl w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
