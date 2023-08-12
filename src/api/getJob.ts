import { useQuery } from "react-query";
import { QueryConfig } from "../lib/react-query";
import { axios } from "../lib/axios";
import { Job } from "../types";

const key = "job";

const getJob = (jobId: string): Promise<Job> => {
  return axios.get(`/Job/${jobId}`);
};

type QueryFnType = typeof getJob;

type UseJobOptions = {
  jobId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useJob = ({ jobId, config }: UseJobOptions) => {
  return useQuery<Awaited<ReturnType<QueryFnType>>>({
    ...config,
    queryKey: [key, jobId],
    queryFn: () => getJob(jobId),
  });
};
