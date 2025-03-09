import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteProductHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (productId) => {
      await axiosInstance.delete(`v1/products/delete/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Product deleted successfully!");
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Failed to delete product."
      );
    },
  });

  return mutation;
};
