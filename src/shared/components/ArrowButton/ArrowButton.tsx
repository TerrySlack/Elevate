import { MouseEvent, KeyboardEvent } from "react";

import classes from "./arrow.button.module.css";

interface Props {
  direction: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

const getCirclePaddingClass = {
  left: "circle-padding-left",
  right: "circle-padding-right",
};

export const ArrowButton = ({ direction, onClick, onKeyUp }: Props) => (
  <div className={classes["circle-wrapper"]}>
    <div>
      <button
        className={`${classes["circle"]} ${getCirclePaddingClass[direction]}`}
        type="button"
        onClick={onClick}
        onKeyUp={onKeyUp}
      >
        <i className={`${classes["arrow"]} ${classes[direction]}`}></i>
      </button>
    </div>
  </div>
);
