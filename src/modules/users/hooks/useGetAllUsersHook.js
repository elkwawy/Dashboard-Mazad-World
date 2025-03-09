import axiosInstance from "@/hooks/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllUsersHook = () => {
  const queryClient = useQueryClient();

  const fetchUsers = async () => {
    const { data } = await axiosInstance.get("v1/users/getAllUsers");
    return data?.users ?? []; 
  };

  const {
    data: users = [],
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // اجعل البيانات صالحة لـ 5 دقائق
    cacheTime: 1000 * 60 * 10, // احتفظ بالكاش لمدة 10 دقائق
    refetchOnWindowFocus: false, // لا تقم بإعادة الجلب عند التركيز على النافذة
  });

  return {
    users,
    error,
    isLoading,
    isFetching, // مفيد في الواجهات لعرض حالة التحديث
    refetchUsers: () => queryClient.invalidateQueries({ queryKey: ["users"] }), // إعادة تحديث القائمة يدويًا
  };
};
