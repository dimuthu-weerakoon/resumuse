export const phoneNumberAutoFormat = (phoneNumber: string): string => {
  // remove charactes except digits
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");
  // return first 3 digits XXX
  if (number.length < 4) return number;
  // if number length less than 7 get first 3 digits and next digit and add - to groups
  //  XXX-X or XXX-XXX
  if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  //if numbers less than 11 get first 3 digits  and next 3 digit and get next digit add - to groups
  //  XXX-XXX-XXXX
  if (number.length < 11)
    return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
  // if length 11 or more get first 3 digits and next 4 digits and next 4 digits and add - to groups
  //XXX-XXXX-XXXX
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};
