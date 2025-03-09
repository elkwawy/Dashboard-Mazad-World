import axiosInstance from "@/hooks/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCustomersHook = () => {
  const queryClient = useQueryClient();

  const fetchCustomers = async () => {
    const { data } = await axiosInstance.get("v1/customers");
    return data?.customers ?? [];
  };

  const {
    data: customers = [],
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false, 
  });

  return {
    customers,
    error,
    isLoading,
    isFetching, 
    refetchCustomers: () =>
      queryClient.invalidateQueries({ queryKey: ["customers"] }), 
  };
};
