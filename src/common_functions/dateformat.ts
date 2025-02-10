import { Dates } from "../types/Dates";

//function to format date to show in resume
//pass Dates object
export default function formattedDate(dates: Dates) {
  //if has start date prop in Dates object
  if (dates.startDate) {
    // convert start date to local date string
    const startDateFormat = new Date(dates.startDate).toLocaleDateString(
      "en-US", // locales
      {
        month: "short", //request month as short month
        year: "numeric", // request year as numeric
      }
    );
    //end date of Dates object
    //if end date given convert it to localedate string if not set it as present
    const endDateFormat = dates.endDate
      ? new Date(dates.endDate).toLocaleDateString("en-US", {
          month: "short", //request month as short month
          year: "numeric", // request year as numeric
        })
      : "Present"; // if not end date set it to present

    return `${startDateFormat} - ${endDateFormat}`; // return converted start date and enddate
  }
}
