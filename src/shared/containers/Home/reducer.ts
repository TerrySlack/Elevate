// types
import {
  GET_INCIDENT_TYPE,
  SET_DATA,
  CLEAR_DATA,
  EmployeeIncidents,
  MergedData,
  MergedDataPayload,
  IncidentPayload,
} from "./actions";

// state
const initialState = {
  incidentTypes: [
    "All Employees",
    "Denial",
    "Executable",
    "Intrusion",
    "Misuse",
    "Unauthorized",
    "Probing",
    "Other",
  ],
  data: [],
  counts: { low: 0, medium: 0, high: 0, critical: 0 },
  incidentData: [],
};

export const HomeReducer = (
  state = initialState,
  action: IncidentPayload | MergedDataPayload
) => {
  switch (action.type) {
    case SET_DATA: {
      const { counts, data } = action.payload as MergedData;
      return {
        ...state,
        counts,
        data: [...state.data, ...data],
      };
    }

    case GET_INCIDENT_TYPE: {
      //Find all employees, based on incident type:  low, medium, high, or critical
      const incidentType = action.payload as string;

      const incidentsByType = state.data.reduce(
        (acc, incident: EmployeeIncidents) => {
          const { empId, priorities } = incident;
          const { incidents } = priorities[incidentType];
          if (incidents?.length > 0) {
            acc.push({ empId, incidents });
          }

          return acc;
        },
        []
      );

      return {
        ...state,
        incidentData: incidentsByType.length
          ? incidentsByType
          : state.incidentData,
      };
    }

    case CLEAR_DATA: {
      return initialState;
    }

    default:
      return state;
  }
};
