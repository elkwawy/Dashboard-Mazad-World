import axiosInstance from "@/hooks/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetLatestNewsHook = () => {
  const queryClient = useQueryClient();

  const fetchLatestNews = async () => {
    const { data } = await axiosInstance.get("v1/LatestNews");
    return data?.data ?? [];
  };

  const {
    data: latestNews = [],
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["latestNews"],
    queryFn: fetchLatestNews,
    staleTime: 1000 * 60 * 5, // اجعل البيانات صالحة لـ 5 دقائق
    cacheTime: 1000 * 60 * 10, // احتفظ بالكاش لمدة 10 دقائق
    refetchOnWindowFocus: false, // لا تقم بإعادة الجلب عند التركيز على النافذة
  });

  return {
    latestNews,
    error,
    isLoading,
    isFetching,
    refetchLatestNews: () =>
      queryClient.invalidateQueries({ queryKey: ["latestNews"] }),
  };
};
