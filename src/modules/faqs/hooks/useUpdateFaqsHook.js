import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useUpdateFaqsHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ faqId, faqData }) =>
      axiosInstance.post(`v1/faqs/update/${faqId}`, faqData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      message.success("FAQ updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update FAQ.";
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
