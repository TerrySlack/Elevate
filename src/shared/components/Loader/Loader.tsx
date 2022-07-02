import { ClimbingBoxLoader } from "Components/ClimbingBoxLoader";

import classes from "./loader.module.css";

interface Props {
  loading: boolean;
}
export const Loader = ({ loading }: Props) => (
  <div className={classes["loader-container"]}>
    <div className={classes["message"]}>
      <div className={classes["text-padding"]}>
        Hello, I'm your friendly incident reporter
      </div>

      <div className={classes["text-padding"]}>
        I'm busy loading the data for you to look at
      </div>
      <div className={classes["text-padding"]}>
        It won't be long. I just have to process the requests and then get busy
        <br />
        rendering the data out into some visual for you to take a look at
      </div>
    </div>
    <div className={classes["climbingbox-container"]}>
      <ClimbingBoxLoader loading={loading} color="rgba(30, 144, 255, 1)" />
    </div>
  </div>
);
