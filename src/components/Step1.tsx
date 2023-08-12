import { InputField } from './InputField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
export type Step1FormValues = {
  jobTitle: string;
  companyName: string;
  industry: string;
  location?: string;
  remoteType?: string;
};
// Define your validation schemas
const stepOneSchema = yup.object().shape({
  jobTitle: yup.string().required('Job title is required'),
  companyName: yup.string().required('Company name is required'),
  industry: yup.string().required('Industry is required'),
  location: yup.string().optional().default(''),
  remoteType: yup.string().optional().default(''),
});
export type Step1Props = {
  onSubmit: (data: Step1FormValues) => void;
  defaultValues?: Step1FormValues;
};

export const Step1 = ({ onSubmit, defaultValues }: Step1Props) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver<Step1FormValues>(stepOneSchema),
  });

  return (
    <>
      <form id="step1Form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6 ">
        <div>
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                placeholder="ex. UX UI Designer"
                label="Job title"
                required={true}
              />
            )}
          />
          {errors.jobTitle && <p className="text-error">{errors.jobTitle.message}</p>}
        </div>
        <div>
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                placeholder="ex. Google"
                label="Company name"
                required={true}
              />
            )}
          />
          {errors.companyName && <p className="text-error">{errors.companyName.message}</p>}
        </div>
        <div>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                placeholder="ex. Information Technology"
                label="Industry"
                required={true}
              />
            )}
          />
          {errors.industry && <p className="text-error">{errors.industry.message}</p>}
        </div>
        <div className="flex gap-6">
          <div className="w-full">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <InputField {...field} placeholder="ex. Chennai" label="Location" />
              )}
            />
          </div>
          <div className="w-full">
            <Controller
              name="remoteType"
              control={control}
              render={({ field }) => (
                <InputField {...field} placeholder="ex. In-office" label="Remote type" />
              )}
            />
          </div>
        </div>
      </form>
    </>
  );
};
