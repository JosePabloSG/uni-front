import { getAllAula } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllAula = () => {
  const {
    data: aula,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Aula"],
    queryFn: getAllAula,
  });

  return {
    aula,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllAula;
