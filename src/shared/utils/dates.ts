import { format } from "date-fns";

export const dateFormatFullMonth = "MMMM d, yyyy 'at' hh:mm a";
export const dateFormatShortMonth = "MMM d, yyyy 'at' hh:mm:ss a";
export const formatDate = (dateString: string | number, dateFormat: string) =>
  format(new Date(dateString), dateFormat);
