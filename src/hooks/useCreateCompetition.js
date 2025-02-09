import { useMutation } from "@tanstack/react-query";
import ApiService from "../services/api-serives";

export const useCreateCompetition = () => {
  return useMutation({ mutationFn: ApiService.createCompetition });
};
