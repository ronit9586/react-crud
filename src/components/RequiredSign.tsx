import { twMerge } from "tailwind-merge";

export type RequiredSignProps = {
  className?: string;
};

export const RequiredSign = ({ className }: RequiredSignProps) => {
  return (
    <div className={twMerge("text-sm font-medium text-error", className)}>
      *
    </div>
  );
};
