import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Home } from "Containers/Home";
import { IncidentReport } from "Containers/IncidentReport";
const history = createBrowserHistory();

interface Props {}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/incidentreport" element={<IncidentReport />} />
        <Route>404: Page not found</Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes, history };
