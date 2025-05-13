import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteBidHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (bidId) => {
      await axiosInstance.delete(`v1/bids/${bidId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bids"] }); 
      message.success("Bid deleted successfully!");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Failed to delete bid.");
    },
  });

  return mutation;
};