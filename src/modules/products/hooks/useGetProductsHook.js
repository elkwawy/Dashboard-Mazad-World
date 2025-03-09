import axiosInstance from "@/hooks/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProductsHook = () => {
  const queryClient = useQueryClient();

  const fetchProducts = async () => {
    const { data } = await axiosInstance.get("v1/products");
    return data ?? [];
  };

  const {
    data: products = [],
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return {
    products,
    error,
    isLoading,
    isFetching,
    refetchProducts: () =>
      queryClient.invalidateQueries({ queryKey: ["products"] }),
  };
};