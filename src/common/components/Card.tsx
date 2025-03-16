import classNames from "classNames";
import { CardProps } from "../models/CardProps";

export const Card = ({ children, className}: CardProps) => {
  return (
    <div className={classNames("p-4 rounded-2xl bg-neutral-100 shadow-drop-4", className)}>
      {children}
    </div>
  );
};
