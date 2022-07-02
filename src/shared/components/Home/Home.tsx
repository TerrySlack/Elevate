import classes from "./home.module.css";

import { Incident } from "Containers/Incident";
import { Counts } from "Containers/Home/actions";

interface Props {
  counts: Counts;
}

export const Home = ({ counts: { low, medium, high, critical } }: Props) => (
  <>
    <div className={classes["incidents"]}>
      <div className={classes["triangle"]}></div>
      <span className={classes["incidents-title"]}>Incidents Viewer</span>
    </div>

    <div className={classes["incidents"]}>
      <Incident title="low" count={low} className="low" />
      <Incident title="medium" count={medium} className="medium" />
      <Incident title="high" count={high} className="high" />
      <Incident title="critical" count={critical} className="critical" />
    </div>
  </>
);
