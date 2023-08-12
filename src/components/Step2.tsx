import { InputField } from './InputField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RadioButton } from './RadioButton';

const applyTypeOptions = [
  { value: 'apply', label: 'Quick apply' },
  { value: 'external', label: 'External apply' },
];
export type Step2FormValues = {
  experienceMinimum?: number;
  experienceMaximum?: number;
  salaryMinimum?: number;
  salaryMaximum?: number;
  totalEmployee?: number;
  applyType?: string;
};

const stepTwoSchema = yup.object().shape({
  experienceMinimum: yup.number().default(0),
  experienceMaximum: yup
    .number()
    .default(Number.MAX_VALUE)
    .when(['experienceMinimum'], (data: number[], schema) => {
      const [experienceMinimum] = data;
      return experienceMinimum
        ? schema.min(experienceMinimum, 'Minimum ≤ Maximum Experience')
        : schema;
    }),
  salaryMinimum: yup.number().default(0),
  salaryMaximum: yup
    .number()
    .default(Number.MAX_VALUE)
    .when(['salaryMinimum'], (data: number[], schema) => {
      const [salaryMinimum] = data;
      return salaryMinimum ? schema.min(salaryMinimum, 'Minimum ≤ Maximum Salary') : schema;
    })
    .default(0),
  totalEmployee: yup.number().default(0),
  applyType: yup.string().default(''),
});

export type Step2Props = {
  onSubmit: (data: Step2FormValues) => void;
  defaultValues?: Step2FormValues;
};

export const Step2 = ({ onSubmit, defaultValues }: Step2Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver<Step2FormValues>(stepTwoSchema),
  });

  return (
    <form id="step2Form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6 ">
      <div className="flex gap-6">
        <div>
          <Controller
            name="experienceMinimum"
            control={control}
            render={({ field }) => (
              <InputField {...field} type="number" placeholder="Minimum" label="Experience" />
            )}
          />
        </div>
        <div>
          <Controller
            name="experienceMaximum"
            control={control}
            render={({ field }) => (
              <InputField {...field} type="number" placeholder="Maximum" label="" />
            )}
          />
          {errors.experienceMaximum && (
            <p className="text-error">{errors.experienceMaximum.message}</p>
          )}
        </div>
      </div>
      <div className="flex gap-6">
        <div>
          <Controller
            name="salaryMinimum"
            control={control}
            render={({ field }) => (
              <InputField {...field} type="number" placeholder="Minimum" label="Salary" />
            )}
          />
        </div>
        <div>
          <Controller
            name="salaryMaximum"
            control={control}
            render={({ field }) => (
              <InputField {...field} type="number" placeholder="Maximum" label="" />
            )}
          />
          {errors.salaryMaximum && <p className="text-error">{errors.salaryMaximum.message}</p>}
        </div>
      </div>
      <Controller
        name="totalEmployee"
        control={control}
        render={({ field }) => (
          <InputField {...field} placeholder="ex. 100" label="Total employee" />
        )}
      />

      <div className="mt-4">
        <Controller
          name="applyType"
          control={control}
          render={({ field }) => (
            <RadioButton
              {...field}
              options={applyTypeOptions}
              form="step2Form"
              label="Apply type"
            />
          )}
        />
      </div>
    </form>
  );
};
