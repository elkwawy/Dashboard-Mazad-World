import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useUpdateUserHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ userId, userData }) =>
      axiosInstance.post(`v1/users/update/${userId}`, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("User added successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update user.";
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
