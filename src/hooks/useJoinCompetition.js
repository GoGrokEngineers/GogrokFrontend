import { useMutation } from 'react-query';
import axios from 'axios';

export function useJoinCompetition() {
  return useMutation((payload) =>
    axios.post('http://139.162.134.90:8000/api/competition/join/', payload).then((res) => res.data)
  );
}