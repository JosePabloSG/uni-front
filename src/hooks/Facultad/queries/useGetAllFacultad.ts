import { getAllFacultad } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllFacultad = () => {
  const {
    data: facultad,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["facultad"],
    queryFn: getAllFacultad,
  });

  return {
    facultad,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllFacultad;

