import { MouseEvent, KeyboardEvent } from "react";

import { Card } from "Components/Card";
import { ArrowButton } from "Components/ArrowButton";
import classes from "./incident.module.css";

interface Props {
  title: string;
  count: number;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

export const Incident = ({
  title,
  count,
  className,
  onClick,
  onKeyUp,
}: Props) => (
  <Card title={title} className={className}>
    <div className={classes["incident"]}>
      <div className={classes["incident-body"]}>
        <span>Count:</span>
        <span>{count}</span>
      </div>
      {(onClick || onKeyUp) && count > 0 && (
        <div className={classes["incident-footer"]}>
          <ArrowButton direction="right" onClick={onClick} onKeyUp={onKeyUp} />
        </div>
      )}
    </div>
  </Card>
);
