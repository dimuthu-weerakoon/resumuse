import { useEffect, useState } from "react";
import { LocationProps } from "../../types/Location";
import { fetchCities, fetchCountires, fetchStates } from "../../country_API/functions";
import { Select, SelectItem } from "@nextui-org/react";

const InputLocation = ({ location, setCity, setCountry, setState }: LocationProps) => {
  const [countries, setCountries] = useState<{ name: string; iso2: string }[]>([]);
  const [countryIso2, setCountryIso2] = useState<string>(location?.country || "");
  const [states, setStates] = useState<{ name: string; iso2: string }[]>([]);
  const [stateIso2, setStateIso2] = useState<string>(location?.state || "");
  const [cities, setCities] = useState<{ name: string }[]>([]);

  async function handleCountries() {
    try {
      const fetchedCountries = await fetchCountires();
      const simplifiedCountries = fetchedCountries.map((c: any) => ({
        name: c.name,
        iso2: c.iso2,
      }));
      setCountries(simplifiedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  async function handleStates(iso2: string) {
    try {
      if (iso2) {
        const fetchedStates = await fetchStates(iso2);
        const simplifiedStates = fetchedStates.map((s: any) => ({
          name: s.name,
          iso2: s.iso2,
        }));
        setStates(simplifiedStates);
      } else {
        setStates([]);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  }

  async function handleCities(iso2: string, stateIso2: string) {
    try {
      if (iso2 && stateIso2) {
        const fetchedCities = await fetchCities(iso2, stateIso2);
        setCities(fetchedCities);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  useEffect(() => {
    handleCountries();
  }, []);

  useEffect(() => {
    if (countryIso2) {
      handleStates(countryIso2);
    } else {
     
      setStates([]);
      setStateIso2("");
      setCities([]);
      setCity("");
      setState("");
    }
  }, [countryIso2]);

  useEffect(() => {
    if (stateIso2) {
      handleCities(countryIso2, stateIso2);
    } else {
      
      setCities([]);
      setCity("");
    }
  }, [stateIso2, countryIso2]);

  return (
    <div className="flex max-lg:flex-wrap gap-3">
    
      <Select
        value={countryIso2}
        onChange={(e) => {
          const selectedCountry = countries.find((c) => c.name === e.target.value);
          setCountry(e.target.value);
          setCountryIso2(selectedCountry?.iso2 || "");
        }}
        label="Select Country"
      >
        {countries.map((country) => (
          <SelectItem value={country.name} key={country.name}>
            {country.name}
          </SelectItem>
        ))}
      </Select>

      <Select
        value={stateIso2}
        onChange={(e) => {
          const selectedState = states.find((s) => s.name === e.target.value);
          setState(e.target.value);
          setStateIso2(selectedState?.iso2 || "");
        }}
        label="Select State / Province"
        isDisabled={!countryIso2} 
      >
        {states.map((state) => (
          <SelectItem value={state.name} key={state.name}>
            {state.name}
          </SelectItem>
        ))}
      </Select>

    
      <Select
        value={location?.city || ""}
        onChange={(e) => setCity(e.target.value)}
        label="Select City"
        isDisabled={!stateIso2} 
      >
        {cities.map((city) => (
          <SelectItem value={city.name} key={city.name}>
            {city.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default InputLocation;
