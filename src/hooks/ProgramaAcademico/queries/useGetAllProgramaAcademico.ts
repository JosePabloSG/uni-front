import { getAllProgramaAcademico } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllProgramaAcademico = () => {
  const {
    data: programaAcademico,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["programaAcademico"],
    queryFn: getAllProgramaAcademico,
  });

  return {
    programaAcademico,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllProgramaAcademico;
