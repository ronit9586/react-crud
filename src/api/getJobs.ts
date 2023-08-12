import { useQuery } from 'react-query';
import { axios } from "../lib/axios";
import { QueryConfig } from "../lib/react-query";
import { Job } from '../types';

const key = "jobs";

const getJobs = (): Promise<Job[]> => {
  return axios.get('/Job');
};

type QueryFnType = typeof getJobs;

type UseJobsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useJobs = ({ config }: UseJobsOptions = {}) => {
  return useQuery<Awaited<ReturnType<QueryFnType>>>({
    ...config,
    queryKey: [key],
    queryFn: () => getJobs(),
  });
};