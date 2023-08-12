import { Typography } from './Typography';

type RadioButtonProps = {
  options: { value: string; label: string }[];
  form: string;
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
};

export const RadioButton = ({ value, onChange, options, form, label }: RadioButtonProps) => {
  return (
    <>
      <Typography
        fontSize="text-sm"
        fontWeight="font-normal"
        lineHeight="leading-5"
        text={label}
        color="text-dark"
        className="mb-4"
      />

      <div className="mt-2 flex gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              className="hidden "
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              form={form}
            />
            <div className="w-5 h-5 border rounded-full border-gray-500 flex items-center justify-center mr-2">
              {value === option.value && <div className="w-3 h-3 rounded-full bg-gray-500" />}
            </div>
            <Typography
              fontSize="text-sm"
              fontWeight="font-normal"
              lineHeight="leading-5"
              text={option.label}
              color="text-grey"
            />
          </label>
        ))}
      </div>
    </>
  );
};
