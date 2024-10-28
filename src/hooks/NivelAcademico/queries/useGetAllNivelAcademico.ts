import { getAllNivelAcademico } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllNivelAcademico = () => {
  const {
    data: nivelAcademicos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["nivelAcademicos"],
    queryFn: getAllNivelAcademico,
  });

  return {
    nivelAcademicos,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllNivelAcademico;
