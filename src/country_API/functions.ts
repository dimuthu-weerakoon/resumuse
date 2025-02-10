import axios from "axios"; //import axios
//import api key from env 
const apiKey = import.meta.env.VITE_CSC_API_KEY;

//function to fetch countries
export const  fetchCountries = async () => {
  try {
    // get request to fetch countries
    const res = await axios.get(
      "https://api.countrystatecity.in/v1/countries",
      {
        headers: {
          "X-CSCAPI-KEY": apiKey, 
        },
      }
    );
    // fetched result 
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//function to fetch states
//pass selected country iso2 to fetch states by country
export const  fetchStates = async (iso2:string) => {
  try {
    const res = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${iso2}/states`, //set iso2 to url
      {
        headers: {
          "X-CSCAPI-KEY": apiKey,
        },
      }
    );
    //fetched data
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//function to fetch cities 
// fetch cities by states paas country iso and state iso2 fetch cities
export const  fetchCities = async (countryIso2:string,stateIso2:string) => {
  try {
    
    const res = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateIso2}/cities`,
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
