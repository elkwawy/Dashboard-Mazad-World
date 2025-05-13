import axiosInstance from "@/hooks/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBidsHook = (isRead) => {
  const queryClient = useQueryClient();

  const fetchBids = async () => {
    const queryParam = typeof isRead === "number" ? `?is_read=${isRead}` : "";
    const { data } = await axiosInstance.get(`v1/bids${queryParam}`);
    return data?.data ?? [];
  };

  const {
    data: bids = [],
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["bids", isRead],
    queryFn: fetchBids,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return {
    bids,
    error,
    isLoading,
    isFetching,
    refetchBids: () =>
      queryClient.invalidateQueries({ queryKey: ["bids", isRead] }),
  };
};
