import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { MutationConfig, queryClient } from '../lib/react-query';
import { axios } from '../lib/axios';
import { Job } from '../types';

const key = 'jobs';

const deleteJob = (id: string): Promise<Job> => {
  return axios.delete(`/Job/${id}`);
};

type UseDeleteJobOptions = {
  config?: MutationConfig<typeof deleteJob>;
};

export const useDeleteJob = ({ config }: UseDeleteJobOptions = {}) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(key);
      const previousJobs = queryClient.getQueryData<Job[]>(key);
      return { previousJobs };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (_: any, __: any, context: any) => {
      if (context.previousJobs) {
        queryClient.setQueryData(key, context.previousJobs);
      }
    },
    onSuccess: (data: Job) => {
      queryClient.invalidateQueries(key);
      const previousJobs = queryClient.getQueryData<Job[]>(key);
      queryClient.setQueryData(
        key,
        previousJobs?.filter((job) => job.id !== data?.id)
      );
      toast.success('Job Deleted');
    },
    ...config,
    mutationFn: deleteJob,
  });
};
