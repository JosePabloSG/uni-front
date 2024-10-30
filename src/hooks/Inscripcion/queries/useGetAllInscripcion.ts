import { getAllInscripcion } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllInscripcion = () => {
  const {
    data: inscripcion,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["inscripcion"],
    queryFn: getAllInscripcion,
  });

  return {
    inscripcion,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllInscripcion;

