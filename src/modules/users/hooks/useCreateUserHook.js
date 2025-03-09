import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateUserHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (userData) => axiosInstance.post("v1/users/create", userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("User added successfully!");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to add user.";
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
