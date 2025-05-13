import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteContactUSHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (contactUSId) => {
      await axiosInstance.delete(`v1/contact/${contactUSId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactUS"] });
      message.success("ContactUS deleted successfully!");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Failed to delete contactUS.");
    },
  });

  return mutation;
};
