import { useState, MouseEvent, KeyboardEvent } from "react";

import { IncidentReport } from "Components/IncidentReport";
import { useNavigate } from "react-router-dom";
import { incidentsByTypeSelector } from "../../selectors/";
import { useSelector } from "react-redux";
import { areEqual } from "Utils/equalityChecks";

import { Pagination } from "Components/Pagination";

const IncidentReportContainer = () => {
  const incidentsByType = useSelector(incidentsByTypeSelector, areEqual);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;

  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = incidentsByType.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(incidentsByType.length / recordsPerPage);

  const navigate = useNavigate();

  const goNavigate = () => {
    navigate("/");
  };
  const onArrowClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    goNavigate();
  };

  const onArrowKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.code === "NumpadEnter" || e.code === "Enter") goNavigate();
  };

  return (
    incidentsByType?.length > 0 && (
      <>
        <IncidentReport
          onArrowClick={onArrowClick}
          onArrowKeyUp={onArrowKeyUp}
          employeeIncidents={currentRecords}
        />
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    )
  );
};
export { IncidentReportContainer as IncidentReport };
