import { twMerge } from 'tailwind-merge';
import { Spinner } from './Spinner';

const variants = {
  primary: 'rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-primary-color hover:bg-white hover:text-black hover:border hover:border-primary-color text-white active:scale-x-75	',
  secondary: 'border border-primary-color rounded-[0.3125rem] bg-white hover:bg-primary-color hover:text-white  active:scale-x-75	',
  delete: 'rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-error'
};

export type ButtonProps = {
  type?: keyof typeof variants;
  children: React.ReactNode;
  form?: string;
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
};

export const Button = ({ type = 'primary', children, form = '', isLoading = false, className = '', ...props }: ButtonProps) => {
  return (
    <button
      type={'submit'}
      form={form}
      className={twMerge(`flex justify-center px-4 py-2 items-center `, variants[type], className)}
      {...props}
    >
      {isLoading ? (
        <div className='flex gap-2 items-center'>
          {children} <Spinner size='sm' variant="light" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
