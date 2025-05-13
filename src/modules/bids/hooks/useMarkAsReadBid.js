import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useMarkAsReadBid = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (bidId) => axiosInstance.post(`v1/bids/${bidId}/mark-as-read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bids"] });
      message.success("Bid marked as read successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to mark bid as read.";
      if (typeof errorMessage === "object") {
        Object.values(errorMessage)
          .flat()
          .forEach((msg) => message.error(msg));
      } else {
        message.error(errorMessage);
      }
    },
  });

  return mutation;
};
