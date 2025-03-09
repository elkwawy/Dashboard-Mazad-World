import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteLatestNewsHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newsId) => {
      await axiosInstance.delete(`v1/LatestNews/delete/${newsId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestNews"] }); 
      message.success("News deleted successfully!");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Failed to delete news.");
    },
  });

  return mutation;
};
