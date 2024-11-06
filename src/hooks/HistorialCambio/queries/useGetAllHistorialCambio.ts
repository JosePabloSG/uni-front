import { getHistorialCambio } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllHistorialCambio = () => {
  const {
    data: historialCambio,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["historialCambio"],
    queryFn: getHistorialCambio,
  });

  return {
    historialCambio,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllHistorialCambio;