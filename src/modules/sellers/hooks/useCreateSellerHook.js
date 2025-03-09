import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateSellerHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (sellerData) =>
      axiosInstance.post("v1/featured-sellers/create", sellerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellers"] });
      message.success("Seller added successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to add seller.";
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
