import { Dates } from "../types/Dates";

export default function formattedDate(dates: Dates) {
  const startDateFormat = new Date(dates.startDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  );
  const endDateFormat = dates.endDate
    ? new Date(dates.endDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Present";

  return `${startDateFormat} - ${endDateFormat}`;
}
