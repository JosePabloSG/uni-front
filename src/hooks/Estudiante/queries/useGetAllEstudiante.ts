import { getAllEstudiante } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllEstudiante = () => {
  const {
    data: estudiante,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["estudiante"],
    queryFn: getAllEstudiante,
  });

  return {
    estudiante,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllEstudiante;