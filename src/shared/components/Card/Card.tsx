import { ReactNode } from "react";
import classes from "./card.module.css";

interface Props {
  title: string;
  className?: string;
  children: ReactNode | ReactNode[];
}

export const Card = ({ title, className, children }: Props) => {
  return (
    <div
      className={`${classes["card-container"]} ${className ? className : ""}`}
    >
      <div className={classes["card-title-wrapper"]}>
        <h1>{title}</h1>
      </div>
      <div className={classes["card-data-wrapper"]}>{children}</div>
    </div>
  );
};
