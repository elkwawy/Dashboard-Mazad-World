import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useMarkAsReadContactUS = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (contactUSId) => axiosInstance.post(`v1/contact/${contactUSId}/mark-as-read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactUS"] });
      message.success("ContactUS marked as read successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to mark contactUS as read.";
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
