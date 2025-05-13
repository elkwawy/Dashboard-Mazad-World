import axiosInstance from "@/hooks/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetContactUSHook = (isRead) => {
  const queryClient = useQueryClient();

  const fetchContactUS = async () => {
    const queryParam = typeof isRead === "number" ? `?is_read=${isRead}` : "";
    const { data } = await axiosInstance.get(`v1/contact${queryParam}`);
    return data?.data ?? [];
  };

  const {
    data: contactUS = [],
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["contactUS", isRead],
    queryFn: fetchContactUS,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return {
    contactUS,
    error,
    isLoading,
    isFetching,
    refetchContactUS: () =>
      queryClient.invalidateQueries({ queryKey: ["contactUS", isRead] }),
  };
};
