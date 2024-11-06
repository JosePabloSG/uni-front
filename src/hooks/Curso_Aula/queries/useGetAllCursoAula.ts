import { getAllCursoAula } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllCursoAula = () => {
  const {
    data: cursoaula,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["CursoAula"],
    queryFn: getAllCursoAula,
  });

  return {
    cursoaula,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllCursoAula;
