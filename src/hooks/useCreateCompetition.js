import { useMutation } from "@tanstack/react-query";
import ApiService from "../services/api-serives";
import { toast } from "react-toastify";

export const useCreateCompetition = () => {
  return useMutation({
    mutationFn: ApiService.createCompetition,
    onError: (error) => {
      console.error("CreateCompetition Error:", error);
      toast.warn(/* … */);
    }
  });
};