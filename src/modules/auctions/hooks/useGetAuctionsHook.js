import axiosInstance from "@/hooks/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAuctionsHook = () => {
  const queryClient = useQueryClient();

  const fetchAuctions = async () => {
    const { data } = await axiosInstance.get("v1/auctions/show");
    return data?.auctions ?? [];
  };

  const {
    data: auctions = [],
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["auctions"],
    queryFn: fetchAuctions,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  

  return {
    auctions,
    error,
    isLoading,
    isFetching,
    refetchAuctions: () =>
      queryClient.invalidateQueries({ queryKey: ["auctions"] }),
  };
};
