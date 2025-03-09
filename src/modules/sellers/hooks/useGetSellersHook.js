import axiosInstance from "@/hooks/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetSellersHook = () => {
  const queryClient = useQueryClient();

  const fetchSellers = async () => {
    const { data } = await axiosInstance.get("v1/featured-sellers");
    return data?.data ?? [];
  };

  const {
    data: sellers = [],
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: fetchSellers,
    staleTime: 1000 * 60 * 5, // اجعل البيانات صالحة لـ 5 دقائق
    cacheTime: 1000 * 60 * 10, // احتفظ بالكاش لمدة 10 دقائق
    refetchOnWindowFocus: false, // لا تقم بإعادة الجلب عند التركيز على النافذة
  });

  return {
    sellers,
    error,
    isLoading,
    isFetching,
    refetchSellers: () =>
      queryClient.invalidateQueries({ queryKey: ["sellers"] }),
  };
};
