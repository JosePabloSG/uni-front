"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import usePostLogin from "@/hooks/auth/usePostLogin";
import { Eye, EyeOff } from "lucide-react";
import Spinner from "@/components/ui/spinner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, errors, onSubmit, isLoading, error } = usePostLogin();
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Iniciar Sesión
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <div>
            <label
              htmlFor="idUsuario"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Id
            </label>
            <input
              type="text"
              placeholder="Escribe tu id aquí"
              id="idUsuario"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              {...register("idUsuario")}
            />
            {errors.idUsuario && (
              <p className="text-red-500 text-xs mt-1">
                {errors.idUsuario.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Escribe tu contraseña aquí"
                id="contraseña"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                {...register("contraseña")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.contraseña && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contraseña.message}
              </p>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
