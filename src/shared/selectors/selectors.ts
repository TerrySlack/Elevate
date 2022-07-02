export const incidentCountsSelector = ({ home: { counts, data } }) => ({
  counts,
  dataLength: data.length,
});
export const dataSelector = ({ home: { data } }) => data;

export const incidentsByTypeSelector = ({ home: { incidentData } }) =>
  incidentData;
