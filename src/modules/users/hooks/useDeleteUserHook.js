import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteUserHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userId) => {
      await axiosInstance.delete(`v1/users/delete/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); 
      message.success("User deleted successfully!");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Failed to delete user.");
    },
  });

  return mutation;
};
