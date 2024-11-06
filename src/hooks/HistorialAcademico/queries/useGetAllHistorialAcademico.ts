
import { getAllHistorialAcademico } from "@/services/HistorialAcademico/queries/getAllHistorialAcademico";
import { useQuery } from "@tanstack/react-query";

const useGetAllHistorialAcademico = () => {
  const {
    data: HistorialAcademico =[] ,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["historialAcademico"],
    queryFn: getAllHistorialAcademico,
  });

  return {
    HistorialAcademico,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllHistorialAcademico;

