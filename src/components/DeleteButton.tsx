import { Button } from './Button';
import { Typography } from './Typography';

export type ButtonProps = {
    text?: string;
    form?: string;
    onClick?: () => void;
    isLoading?: boolean;
};

export const DeleteButton = ({ text = 'TEXT', form = '', isLoading = false, ...props }: ButtonProps) => {
    return (
        <Button
            type="delete"
            isLoading={isLoading}
            children={
                <Typography
                    fontSize="text-base"
                    fontWeight="font-normal"
                    lineHeight="leading-8"
                    color="text-white"
                    text={text}
                />
            }
            form={form}
            {...props}
        />
    );
};
