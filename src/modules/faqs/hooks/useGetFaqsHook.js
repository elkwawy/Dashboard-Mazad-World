import axiosInstance from "@/hooks/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFaqsHook = () => {
  const queryClient = useQueryClient();

  const fetchFaqs = async () => {
    const { data } = await axiosInstance.get("v1/faqs");
    return data ?? [];
  };

  const {
    data: faqs = [],
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
    staleTime: 1000 * 60 * 5, // اجعل البيانات صالحة لـ 5 دقائق
    cacheTime: 1000 * 60 * 10, // احتفظ بالكاش لمدة 10 دقائق
    refetchOnWindowFocus: false, // لا تقم بإعادة الجلب عند التركيز على النافذة
  });

  return {
    faqs,
    error,
    isLoading,
    isFetching,
    refetchFaqs: () =>
      queryClient.invalidateQueries({ queryKey: ["faqs"] }),
  };
};
