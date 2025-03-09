import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteSellerHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (sellerId) => {
      await axiosInstance.delete(`v1/featured-sellers/delete/${sellerId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellers"] }); 
      message.success("Seller deleted successfully!");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Failed to delete seller.");
    },
  });

  return mutation;
};
