import axiosInstance from "@/hooks/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCategoriesHook = () => {
  const queryClient = useQueryClient();

  const fetchCategories = async () => {
    const { data } = await axiosInstance.get("v1/category/show");
    return data?.categories ?? [];
  };

  const {
    data: categories = [],
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // اجعل البيانات صالحة لـ 5 دقائق
    cacheTime: 1000 * 60 * 10, // احتفظ بالكاش لمدة 10 دقائق
    refetchOnWindowFocus: false, // لا تقم بإعادة الجلب عند التركيز على النافذة
  });

  return {
    categories,
    error,
    isLoading,
    isFetching, // مفيد في الواجهات لعرض حالة التحديث
    refetchCategories: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }), // إعادة تحديث القائمة يدويًا
  };
};
