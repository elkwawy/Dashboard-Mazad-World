import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateFaqsHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (faqData) =>
      axiosInstance.post("v1/faqs/create", faqData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      message.success("FAQ added successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to add FAQ.";
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
