import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteFaqsHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (faqId) => {
      await axiosInstance.delete(`v1/faqs/delete/${faqId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      message.success("FAQ deleted successfully!");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Failed to delete FAQ.");
    },
  });

  return mutation;
};
