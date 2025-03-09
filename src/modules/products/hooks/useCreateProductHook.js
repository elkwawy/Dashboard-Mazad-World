import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateProductHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productData) =>
      axiosInstance.post("v1/products/create", productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Product added successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to add product.";
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
