import { Button } from './Button';
import { ButtonProps } from './PrimaryButton';
import { Typography } from './Typography';

export const SecondaryButton = ({ text = 'TEXT', ...props }: ButtonProps) => {
  return (
    <Button
      type="secondary"
      children={
        <Typography
          fontSize="text-sm"
          fontWeight="font-normal"
          lineHeight="leading-8"
          // color="text-black"
          text={text}
        />
      }
      {...props}
    />
  );
};
