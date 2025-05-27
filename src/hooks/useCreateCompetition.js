 import { useMutation } from '@tanstack/react-query';
import { createCompetition } from  '../services/api-serives';

export function useCreateCompetition() {
  return useMutation(createCompetition);
}