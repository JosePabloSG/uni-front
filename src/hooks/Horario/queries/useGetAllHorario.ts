import { getAllHorario } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllHorario = () => {
  const {
    data: horario,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Horario"],
    queryFn: getAllHorario,
  });

  return {
    horario,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllHorario;
