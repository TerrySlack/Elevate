import { processData } from "./datahelpers";

export const CLEAR_DATA = "CLEAR_DATA";
export const SET_DATA = "SET_DATA";
export const GET_INCIDENT_TYPE = "GET_INCIDENT_TYPE";

/*
  TODO:  Delete this.  Temporary until I hear back regarding the api issues with Cors
*/
import { data } from "../../../mockData/data";

export interface Identities {
  [key: string]: number;
}
interface TimeStamp {
  timestamp: number;
}
interface Priority {
  priority: string;
}
interface EmployeeId {
  employee_id: number;
}
interface SourceIp {
  source_ip: string;
}
export interface MisuseUnauthorized extends Priority, EmployeeId, TimeStamp {}

export interface Denial extends Priority, SourceIp, TimeStamp {
  reported_by: number;
}
export interface Intrusion extends Priority, SourceIp, TimeStamp {
  internal_ip: string;
}
export interface Executable extends Priority, TimeStamp {
  machine_ip: string;
}

export interface Probing extends Priority, TimeStamp {
  ip: string;
}
export interface Other extends Priority, TimeStamp {
  identifier: string | number;
}

export interface SetAll {
  identities: Identities;
  denial: Denial[];
  executable: Executable[];
  intrusion: Intrusion[];
  misuse: MisuseUnauthorized[];
  unauthorized: MisuseUnauthorized[];
  probing: Probing[];
  other: Other[];
}

export interface PriorityType {
  count: number;
  incidents: Array<
    Denial | Executable | Intrusion | MisuseUnauthorized | Probing | Other
  >;
}

export interface Priorities {
  low: PriorityType;
  medium: PriorityType;
  high: PriorityType;
  critical: PriorityType;
}
export interface IncidentResult {
  priorities: Priorities;
}

export interface PriorityIncident {
  [key: string]: number;
}

export interface EmployeeIncidents extends IncidentResult {
  empId: number;
}

interface ActionTypes {
  // SET_DATA: IncidentResult[];
  SET_DATA: MergedData;
  CLEAR_DATA: void;
  GET_INCIDENT_TYPE: string;
}

interface Payload {}

export interface MergedData {
  counts: Counts;
  data: Array<
    | Identities
    | Denial
    | Executable
    | Intrusion
    | MisuseUnauthorized
    | Probing
    | Other
    | SetAll
    | IncidentResult
  >;
}

export interface MergedDataPayload {
  type: keyof ActionTypes;
  payload: MergedData;
}

export interface IncidentPayload {
  type: keyof ActionTypes;
  payload: string;
}

export interface Counts {
  low: number;
  medium: number;
  high: number;
  critical: number;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload:
    | string
    | Counts
    | MergedData
    | Array<
        | Identities
        | Denial
        | Executable
        | Intrusion
        | MisuseUnauthorized
        | Probing
        | Other
        | SetAll
        | IncidentResult
      >;
}

export type HomeActionsTypes = MessageAction;

export const getIncidents =
  () =>
  //Redux typings for dispatch is any
  async (dispatch: any, _getState: Function) => {
    //Pull what we need out of the mock data.
    const processed = processData(data);

    dispatch({ type: "SET_DATA", payload: processed });

    //NOTE:  For failed calls, use this  https://www.npmjs.com/package/axios-retry

    //make the api calls

    //Note:  Attach a catch to each one, so I can retry any of the request that fail.
    //Keep it simple and just redo invividual requests.  Then append to data.

    // const identities = await api.get("/identities").catch((e: any) => {
    //   //debugger;
    //   return { error: "identities", e };
    // });
    // const denial = api.get("/denial");
    // const intrusion = api.get("/intrusion");
    // const executable = api.get("/executable");
    // const misuse = api.get("/misuse");
    // const unauthorized = api.get("/unauthorized");
    // const probing = api.get("/probing");
    // const other = api.get("/other");
    // const data = await Promise.allSettled([
    //   identities,
    //   denial,
    //   intrusion,
    //   executable,
    //   misuse,
    //   unauthorized,
    //   probing,
    //   other,
    // ]);

    // dispatch({ type: "SET_ALL", payload: [] });

    // getCommits(owner, repo, page)
    //   .then(({ data: commits }: GitApiResponseData) => {
    //     //Increment the page, for the next call
    //     const newPageNumber = page + 1;

    //     //Send our data off to the store
    //     dispatch({
    //       type: SET_COMMITS,
    //       payload: {
    //         commits,
    //         page: newPageNumber,
    //         navigateUrl: "/commits",
    //         owner,
    //         repo,
    //       },
    //     });
    //   })
    //   .catch(() => {
    //     //Save the owner/repo entries
    //     dispatch({
    //       type: SET_OWNER_REPO,
    //       payload: {
    //         owner,
    //         repo,
    //       },
    //     });
    //     //The owner and/or repo does not exist.  Lets Navigate
    //     dispatch(setNavigation("/does/not/exist"));
    //   });
  };

export const getIncidentsByType = (incidentType: string) => ({
  type: GET_INCIDENT_TYPE,
  payload: incidentType,
});

export const clearData = () => ({ type: CLEAR_DATA });
