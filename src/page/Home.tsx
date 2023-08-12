import { useState } from 'react';
import { useJobs } from '../api/getJobs';
import { JobCard } from '../components/JobCard';
import { Modal } from '../components/Modal';
import { SecondaryButton } from '../components/SecondaryButton';
import { Spinner } from '../components/Spinner';
import { ConfirmModal } from '../components/ConfirmModal';
import { Job } from '../types';

const Home = () => {
  const { data: jobs, isLoading, error } = useJobs();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [job, setJob] = useState<Job>();
  const [selectedId, setSelectedId] = useState<string | undefined>('');

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setJob(undefined);
  };

  return (
    <div className="mb-9 font-Poppins">
      <div className='bg-white   border-b-slate-300 py-4 border-b-2'>
        <div className='max-w-[95%] flex justify-end mx-auto px-4'>
          <SecondaryButton text="Create Job" onClick={openModal} />
        </div>
      </div>
      <div className="max-w-[95%] mx-auto px-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1  gap-[50.12px] md:grid-cols-2 mt-10  ">
            {!isLoading &&
              !error &&
              jobs &&
              jobs.map((job) => {
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    setOpenConfirm={setOpenConfirm}
                    setSelectedId={setSelectedId}
                    onEdit={(job) => {
                      setJob(job);
                      setIsOpen(true);
                    }}
                  ></JobCard>
                );
              })}
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} job={job} id={selectedId} />
      <ConfirmModal isOpen={openConfirm} id={selectedId} closeModal={() => setOpenConfirm(false)} />
    </div>
  );
};

export default Home;
