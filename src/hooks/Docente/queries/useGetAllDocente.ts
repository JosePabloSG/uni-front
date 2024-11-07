import { getAllDocente } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllDocente = () => {
  const {
    data: docente,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["docente"],
    queryFn: getAllDocente,
  });

  return {
    docente,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllDocente;
