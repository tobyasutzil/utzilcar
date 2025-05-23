import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { ShieldCheck, LogIn, Ban, History, FileText, Key } from "lucide-react";

const authorityLoginSchema = z.object({
  authorityId: z.string().min(1, "ID de autoridad requerido"),
  accessKey: z.string().min(1, "Clave de acceso requerida"),
});

type AuthorityLogin = z.infer<typeof authorityLoginSchema>;

const authorityTools = [
  {
    icon: Ban,
    title: "Suspender Vehículo",
    description: "Marcar vehículo como suspendido",
    color: "text-yellow-500"
  },
  {
    icon: History,
    title: "Historial Completo",
    description: "Ver historial detallado",
    color: "text-blue-400"
  },
  {
    icon: FileText,
    title: "Exportar Datos",
    description: "Generar reportes oficiales",
    color: "text-green-400"
  },
  {
    icon: Key,
    title: "Gestión de Permisos",
    description: "Administrar accesos",
    color: "text-purple-400"
  }
];

export default function AuthoritiesSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authorityInfo, setAuthorityInfo] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<AuthorityLogin>({
    resolver: zodResolver(authorityLoginSchema),
    defaultValues: {
      authorityId: "",
      accessKey: "",
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (data: AuthorityLogin) => {
      const response = await apiRequest("POST", "/api/authorities/login", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setAuthorityInfo(data.authority);
      toast({
        title: "Acceso autorizado",
        description: `Bienvenido, ${data.authority.name}`,
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Acceso denegado",
        description: "Credenciales inválidas o no autorizadas",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AuthorityLogin) => {
    loginMutation.mutate(data);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthorityInfo(null);
    toast({
      title: "Sesión cerrada",
      description: "Ha cerrado sesión exitosamente",
    });
  };

  return (
    <section id="autoridades" className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Panel de Autoridades
          </h2>
          <p className="text-lg text-gray-300">
            Acceso especial para verificadores oficiales y autoridades gubernamentales
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Authority Login */}
          <Card className="glass-effect-dark">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="text-white text-2xl w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {isLoggedIn ? 'Panel de Control' : 'Acceso Autoridades'}
                </h3>
              </div>
              
              {!isLoggedIn ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="authorityId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="ID de Autoridad"
                              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accessKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              type="password"
                              placeholder="Clave de Acceso"
                              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit"
                      disabled={loginMutation.isPending}
                      className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                    >
                      <LogIn className="mr-2 w-4 h-4" />
                      {loginMutation.isPending ? 'Verificando...' : 'Acceder'}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="space-y-4">
                  <div className="text-center text-white">
                    <p className="font-semibold">{authorityInfo?.name}</p>
                    <p className="text-sm text-gray-300">{authorityInfo?.department}</p>
                    <p className="text-xs text-gray-400 mt-1">Nivel: {authorityInfo?.accessLevel}</p>
                  </div>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Authority Features */}
          <Card className="md:col-span-2 glass-effect-dark">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Key className="w-5 h-5" />
                Herramientas de Autoridad
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {authorityTools.map((tool, index) => (
                  <button
                    key={index}
                    disabled={!isLoggedIn}
                    className={`bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer text-left ${
                      !isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => {
                      if (isLoggedIn) {
                        toast({
                          title: tool.title,
                          description: "Funcionalidad disponible para autoridades verificadas",
                        });
                      }
                    }}
                  >
                    <tool.icon className={`${tool.color} text-lg mb-2 w-6 h-6`} />
                    <h4 className="font-medium text-white">{tool.title}</h4>
                    <p className="text-sm text-gray-300 mt-1">{tool.description}</p>
                  </button>
                ))}
              </div>
              
              {!isLoggedIn && (
                <p className="text-center text-gray-400 mt-6 text-sm">
                  Inicie sesión con credenciales de autoridad para acceder a las herramientas
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
