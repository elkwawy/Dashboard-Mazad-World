import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteAuctionHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (auctionId) => {
      await axiosInstance.delete(`v1/auctions/delete/${auctionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] }); 
      message.success("Auction deleted successfully!");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Failed to delete auction.");
    },
  });

  return mutation;
};