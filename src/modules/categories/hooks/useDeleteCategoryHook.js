import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteCategoryHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryId) => {
      await axiosInstance.delete(`v1/category/delete/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); 
      message.success("Category deleted successfully!");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Failed to delete category.");
    },
  });

  return mutation;
};
