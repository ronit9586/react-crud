import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { MutationConfig, queryClient } from '../lib/react-query';
import { axios } from '../lib/axios';
import { Job } from '../types';

// export type CreateJobDTO = Omit<Job, "id">;
export type CreateJobDTO = Job;
const key = 'jobs';

const createJob = (data: CreateJobDTO): Promise<Job> => {
  return axios.post(`/Job`, data);
};

type UseCreateJobOptions = {
  config?: MutationConfig<typeof createJob>;
};

export const useCreateJob = ({ config }: UseCreateJobOptions = {}) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(key);
      const previousJobs = queryClient.getQueryData<Job[]>(key);
      return { previousJobs };
    },
    onError: (_, __, context: any) => {
      if (context?.previousJobs) {
        queryClient.setQueryData(key, context.previousJobs);
      }
    },
    onSuccess: (newJob) => {
      queryClient.invalidateQueries(key);
      toast.success('Job Created');
      const previousJobs = queryClient.getQueryData<Job[]>(key);
      queryClient.setQueryData(key, [...(previousJobs || []), newJob]);
    },
    ...config,
    mutationFn: createJob,
  });
};
