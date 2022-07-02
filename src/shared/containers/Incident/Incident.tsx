import { MouseEvent, KeyboardEvent } from "react";

import { Incident } from "Components/Incident";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getIncidentsByType } from "Containers/Home";

interface Props {
  title: string;
  count: number;
  className?: string;
}

const IncidentContainer = ({ title, count, className }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goNavigate = (title: string) => {
    dispatch(getIncidentsByType(title));
    navigate(`/incidentreport?title=${title}`);
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    goNavigate(title);
  };

  const onKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.code === "NumpadEnter" || e.code === "Enter") goNavigate(title);
  };

  return (
    <Incident
      title={title}
      count={count}
      className={className}
      onClick={onClick}
      onKeyUp={onKeyUp}
    />
  );
};
export { IncidentContainer as Incident };
