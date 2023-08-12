import { twMerge } from 'tailwind-merge';
import { Typography } from './Typography';
import { RequiredSign } from './RequiredSign';

export type InputFieldProps = {
  placeholder?: string;
  label?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  type?: string;
};

export const InputField = ({
  placeholder,
  label = '',
  required = false,
  value,
  onChange,
  onBlur,
  type = 'text',
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex">
        <Typography
          fontSize="text-sm"
          fontWeight="font-medium"
          lineHeight="leading-5"
          text={label}
          color="text-dark"
          className={`${label === '' && 'mt-5'}`}
        />
        {required && <RequiredSign />}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={twMerge(
          'flex items-start w-full border border-card-border bg-white outline-none rounded-[0.3125rem] px-3 py-2 text-sm font-normal text-dark'
        )}
      />
    </div>
  );
};
