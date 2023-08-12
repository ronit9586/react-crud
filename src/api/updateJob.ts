import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { MutationConfig, queryClient } from '../lib/react-query';
import { axios } from '../lib/axios';
import { Job } from '../types';

export type UpdateJobDTO = Job;
const key = 'job';

const updateJob = (data: UpdateJobDTO): Promise<Job> => {
  return axios.put(`/Job/${data.id}`, data);
};

type UseUpdateJobOptions = {
  config?: MutationConfig<typeof updateJob>;
};

export const useUpdateJob = ({ config }: UseUpdateJobOptions = {}) => {
  return useMutation({
    onMutate: async (updatingJob) => {
      await queryClient.cancelQueries([key, updatingJob.id]);
      const previousJob = queryClient.getQueryData<Job>(['id', updatingJob.id]);
      queryClient.setQueryData([key, updatingJob.id], {
        ...previousJob,
        ...updatingJob,
        id: updatingJob.id,
      });

      return { previousJob };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (_, __, context: any) => {
      if (context?.previousJob) {
        queryClient.setQueryData([key, context.previousJob.id], context.previousJob);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Job[]>('jobs', (old = []) =>
        old.map((job) => (job.id === data.id ? data : job))
      );
      toast.success('Job Updated');
    },
    ...config,
    mutationFn: updateJob,
  });
};
