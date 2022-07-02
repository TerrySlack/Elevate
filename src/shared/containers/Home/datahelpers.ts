import {
  SetAll,
  Denial,
  Executable,
  Intrusion,
  MisuseUnauthorized,
  Probing,
  Other,
  Identities,
  IncidentResult,
  EmployeeIncidents,
  MergedData as MD,
} from "./actions";

const isIpAddress = (ip: string | number) => {
  // Regular expression to check if string is a IP address
  const regexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  return regexExp.test(ip.toString());
};

const addIncidents = (
  store: IncidentResult,
  identities: Identities,
  elem: Denial | Executable | Intrusion | MisuseUnauthorized | Probing | Other,
  property: string,
  empId: string | number,
  type: string,
  isIdentityLookUp: boolean
) => {
  //Do we need to look up the property to see if it exists, as an employee id, in the identities array?
  const lookUpId = isIdentityLookUp
    ? identities[elem[property]]
    : elem[property];

  if (lookUpId === empId) {
    //add the type
    elem["type"] = type;
    //Determine it's priority
    //NOTE:  if there is no priority, add it to the low
    switch (elem.priority) {
      case "low":
        const { low } = store.priorities;
        low.count = low.count + 1;

        low.incidents.push(elem);
        break;
      case "medium":
        const { medium } = store.priorities;
        medium.count = medium.count + 1;
        medium.incidents.push(elem);
        break;
      case "high":
        const { high } = store.priorities;
        high.count = high.count + 1;
        high.incidents.push(elem);
        break;
      default: //critical
        const { critical } = store.priorities;
        critical.count = critical.count + 1;
        critical.incidents.push(elem);
        break;
    }
  }
};

export const processData = (data: SetAll) => {
  const {
    identities,
    denial,
    executable,
    intrusion,
    misuse,
    unauthorized,
    probing,
    other,
  } = data;

  //Arbitrarily iterate through the denial array.  Inside reduce, we will also iterate through the other arrays, in the search for incidents related to an employee.
  const mergedData = denial.reduce<MD>(
    (acc, incident) => {
      //Get the employee id from the incident.  As the data was not normalized, based on the instructions these are the columns to look for.
      const empId: string | number =
        incident["reported_by"] ||
        incident["employee_id"] ||
        incident["ip"] ||
        incident["machine_ip"] ||
        incident["internal_ip"] ||
        incident["identifier"];

      //Let's check to see if the empId is an ipaddress.  This will determin if whether or not the empID needs to be looked up in the identies array
      const isIp: boolean = isIpAddress(empId);

      //if we have an ip address, look up the related employee id, otherwise, use empId
      const lookUpEmployeeId = isIp ? identities[empId] : empId;

      //If it's not undefined, we have an employee id
      if (lookUpEmployeeId) {
        //Default store, for individual employee incidents.  Will be used to render output
        const employeeIncidents: EmployeeIncidents = {
          empId: lookUpEmployeeId as number,
          priorities: {
            low: { count: 0, incidents: [] },
            medium: { count: 0, incidents: [] },
            high: { count: 0, incidents: [] },
            critical: { count: 0, incidents: [] },
          },
        };

        //Althrough we are currently iterating through denial and could get the array parameter from reduce, for clarity I iterate directly on the denial array here.
        denial.reduce<IncidentResult>((acc: IncidentResult, elem: Denial) => {
          //Perform a check to see if an incident will be added.
          addIncidents(
            acc,
            identities,
            elem,
            "reported_by",
            lookUpEmployeeId,
            "denial",
            isIp
          );

          return acc;
        }, employeeIncidents);

        executable.reduce<IncidentResult>(
          (acc: IncidentResult, elem: Executable) => {
            //Perform a check to see if an incident will be added.
            addIncidents(
              acc,
              identities,
              elem,
              "machine_ip",
              lookUpEmployeeId,
              "executable",
              isIp
            );
            return acc;
          },
          employeeIncidents
        );

        intrusion.reduce<IncidentResult>(
          (acc: IncidentResult, elem: Intrusion) => {
            //Perform a check to see if an incident will be added.
            addIncidents(
              acc,
              identities,
              elem,
              "internal_ip",
              lookUpEmployeeId,
              "executable",
              isIp
            );

            //Two look ups, as their are multiple IP addresses within the executible employee object
            addIncidents(
              acc,
              identities,
              elem,
              "source_ip",
              lookUpEmployeeId,
              "executable",
              isIp
            );
            return acc;
          },
          employeeIncidents
        );

        misuse.reduce<IncidentResult>(
          (acc: IncidentResult, elem: MisuseUnauthorized) => {
            //Perform a check to see if an incident will be added.
            addIncidents(
              acc,
              identities,
              elem,
              "employee_id",
              lookUpEmployeeId,
              "misuse",
              isIp
            );
            return acc;
          },
          employeeIncidents
        );

        unauthorized.reduce<IncidentResult>(
          (acc: IncidentResult, elem: MisuseUnauthorized) => {
            //Perform a check to see if an incident will be added.
            addIncidents(
              acc,
              identities,
              elem,
              "employee_id",
              lookUpEmployeeId,
              "unauthorized",
              isIp
            );
            return acc;
          },
          employeeIncidents
        );

        probing.reduce<IncidentResult>((acc: IncidentResult, elem: Probing) => {
          //Perform a check to see if an incident will be added.
          addIncidents(
            acc,
            identities,
            elem,
            "ip",
            lookUpEmployeeId,
            "probing",
            isIp
          );
          return acc;
        }, employeeIncidents);

        other.reduce<IncidentResult>((acc: IncidentResult, elem: Other) => {
          //Perform a check to see if an incident will be added.
          addIncidents(
            acc,
            identities,
            elem,
            "identifier",
            lookUpEmployeeId,
            "other",
            isIp
          );
          return acc;
        }, employeeIncidents);

        //Increment the total counts for each incident.  This is used to render the home screen cards
        const {
          priorities: {
            low: { count: lowCount },
            medium: { count: mediumCount },
            high: { count: highCount },
            critical: { count: criticalCount },
          },
        } = employeeIncidents;

        acc.counts.low += lowCount;
        acc.counts.medium += mediumCount;
        acc.counts.high += highCount;
        acc.counts.critical += criticalCount;

        acc.data.push(employeeIncidents);
      }

      return acc;
    },
    { counts: { low: 0, medium: 0, high: 0, critical: 0 }, data: [] }
  );

  return mergedData;
};
