import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Home } from "Components/Home";
import { getIncidents } from "./actions";
import { Loader } from "Components/Loader";
import { areEqual } from "Utils/equalityChecks";
import { incidentCountsSelector } from "../../selectors";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const { counts, dataLength } = useSelector(incidentCountsSelector, areEqual);

  useEffect(() => {
    dispatch(getIncidents());
  }, []);

  return dataLength === 0 ? (
    <Loader loading={dataLength === 0} />
  ) : (
    <Home counts={counts} />
  );
};

export { HomeContainer as Home };
