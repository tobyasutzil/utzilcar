import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertVehicleSchema, type InsertVehicle } from "@shared/schema";
import { Barcode, Car, Calendar, Palette, CreditCard, User, Info, PlusCircle } from "lucide-react";

export default function RegistrationSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertVehicle>({
    resolver: zodResolver(insertVehicleSchema),
    defaultValues: {
      vin: "",
      model: "",
      year: new Date().getFullYear(),
      color: "",
      plates: "",
      owner: "",
      status: "active",
      walletAddress: ""
    }
  });

  const registerVehicleMutation = useMutation({
    mutationFn: async (data: InsertVehicle) => {
      const response = await apiRequest("POST", "/api/vehicles", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Vehículo registrado exitosamente!",
        description: "Su vehículo ha sido registrado en blockchain y el NFT ha sido creado.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/statistics"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error al registrar vehículo",
        description: error.message || "Ocurrió un error durante el registro",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertVehicle) => {
    registerVehicleMutation.mutate(data);
  };

  return (
    <section id="registro" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Registrar Vehículo
          </h2>
          <p className="text-lg text-gray-600">
            Complete la información para crear el NFT de su vehículo en blockchain
          </p>
        </div>
        
        <Card className="glass-effect shadow-xl">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="vin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <Barcode className="w-4 h-4 text-blue-600" />
                          Número VIN
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="1HGBH41JXMN109186"
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <Car className="w-4 h-4 text-blue-600" />
                          Marca y Modelo
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Toyota Corolla 2023"
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          Año de Fabricación
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="2023"
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <Palette className="w-4 h-4 text-blue-600" />
                          Color
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all">
                              <SelectValue placeholder="Seleccionar color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Blanco">Blanco</SelectItem>
                            <SelectItem value="Negro">Negro</SelectItem>
                            <SelectItem value="Gris">Gris</SelectItem>
                            <SelectItem value="Azul">Azul</SelectItem>
                            <SelectItem value="Rojo">Rojo</SelectItem>
                            <SelectItem value="Verde">Verde</SelectItem>
                            <SelectItem value="Amarillo">Amarillo</SelectItem>
                            <SelectItem value="Plateado">Plateado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="plates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          Placas
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ABC-123-XYZ"
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <User className="w-4 h-4 text-blue-600" />
                          Propietario
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Juan Pérez García"
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
                  <div className="flex items-start space-x-3">
                    <Info className="text-blue-600 mt-1 w-5 h-5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Información Importante</h4>
                      <p className="text-sm text-gray-600">
                        Al registrar su vehículo, se creará un NFT único en blockchain que servirá como 
                        certificado digital inmutable. Este proceso requiere una transacción en Ethereum.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-900 hover:bg-gray-50 transition-all"
                    onClick={() => form.reset()}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    disabled={registerVehicleMutation.isPending}
                    className="gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    {registerVehicleMutation.isPending ? 'Registrando...' : 'Registrar Vehículo'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
