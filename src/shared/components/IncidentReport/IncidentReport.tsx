import { MouseEvent, KeyboardEvent, Children } from "react";

import { Card } from "Components/Card";
import {
  Denial,
  Executable,
  Intrusion,
  MisuseUnauthorized,
  Other,
  Probing,
} from "Containers/Home/actions";
import { ArrowButton } from "Components/ArrowButton";

import classes from "./incident.report.module.css";
import { dateFormatShortMonth, formatDate } from "Utils/dates";

interface EmployeeIncidents {
  empId: string;
  incidents: Array<
    Denial | Executable | Intrusion | MisuseUnauthorized | Probing | Other
  >;
}

interface Props {
  employeeIncidents: EmployeeIncidents[];
  onArrowClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onArrowKeyUp: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

export const IncidentReport = ({
  employeeIncidents,
  onArrowClick,
  onArrowKeyUp,
}: Props) => {
  return (
    <div className={`${classes["incidents-root"]}`}>
      <header className={`${classes["incident-header"]}`}>
        <div className={classes["incident-header-navigation"]}>
          <ArrowButton
            direction="left"
            onClick={onArrowClick}
            onKeyUp={onArrowKeyUp}
          />
          <span>Back</span>
        </div>
      </header>
      <div className={classes["incident-cards-root"]}>
        <div className={classes["incidents-center"]}>
          {Children.toArray(
            employeeIncidents.map(({ empId, incidents }) =>
              Children.toArray(
                incidents.map(({ priority, timestamp }) => (
                  <Card title={priority} className={priority}>
                    <div className={classes["incident-container"]}>
                      <div className={classes["incident"]}>
                        <span className={classes["incident-title"]}>
                          Employee Id:
                        </span>
                        <span className={classes["incident-title"]}>
                          {empId}
                        </span>
                      </div>
                      {timestamp && (
                        <div className={classes["incident"]}>
                          <span className={classes["incident-title"]}>
                            Incident Date:
                          </span>
                          <span className={classes["incident-title"]}>
                            {formatDate(timestamp * 1000, dateFormatShortMonth)}
                          </span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};
