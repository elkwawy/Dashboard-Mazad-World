import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useUpdateAuctionHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ auctionId, auctionData }) =>
      axiosInstance.post(`v1/auctions/update/${auctionId}`, auctionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
      message.success("Auction updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update auction.";
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
