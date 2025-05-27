 import { useMutation } from '@tanstack/react-query';
import { joinCompetition } from '../services/api-service';

export function useJoinCompetition() {
  return useMutation(joinCompetition);
}