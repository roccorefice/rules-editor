import classNames from "classNames";
import { ReactNode } from "react";

const Title = ({ children, subTitle = false, className  }: { children: ReactNode; subTitle?: boolean, className?: string }) => {

    return (
      <div className={classNames("font-bold leading-[120%] not-italic", !subTitle ? "text-primary-0 text-2xl" : "text-primary-20 text-lg", className)}>
        {children}
      </div>
    );
  
};

export default Title;
