import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateCategoryHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (categoryData) =>
      axiosInstance.post("v1/category/create", categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      message.success("Category added successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to add category.";
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
