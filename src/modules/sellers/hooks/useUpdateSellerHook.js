import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useUpdateSellerHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ sellerId, sellerData }) =>
      axiosInstance.post(`v1/featured-sellers/update/${sellerId}`, sellerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellers"] });
      message.success("Seller updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update seller.";
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
