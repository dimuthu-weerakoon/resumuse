import axios from "axios";
const apiKey = import.meta.env.VITE_CSC_API_KEY;

export const  fetchCountires = async () => {
  try {
    const res = await axios.get(
      "https://api.countrystatecity.in/v1/countries",
      {
        headers: {
          "X-CSCAPI-KEY": apiKey,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const  fetchStates = async (iso2:string) => {
  try {
    const res = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${iso2}/states`,
      {
        headers: {
          "X-CSCAPI-KEY": apiKey,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
