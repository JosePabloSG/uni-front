import { getAllDocenteCurso } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllDocenteCurso = () => {
  const {
    data: docenteCurso,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["docenteCurso"],
    queryFn: getAllDocenteCurso,
  });

  return {
    docenteCurso,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllDocenteCurso;