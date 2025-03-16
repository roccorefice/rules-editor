import { ButtonProps } from "../models/ButtonProps";
import classNames from "classNames";


const Button = ({
    type,
    text,
    action,
    className = "",
    form = "",
    disabled,
}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={action}
            className={classNames(
                className,
                disabled ? "bg-secondary-95 text-secondary-30 cursor-not-allowed" : ""
            )}
            form={form || undefined}
        >
            {text}
        </button>
    );
};

export default Button;
