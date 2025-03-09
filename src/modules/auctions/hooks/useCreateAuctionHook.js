import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateAuctionHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (auctionData) =>
      axiosInstance.post("v1/auctions/create", auctionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
      message.success("Auction added successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to add auction.";
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