import { useEffect, useState, useRef, useMemo } from "react";
import { LocationProps } from "../../types/Location";
import { fetchCities, fetchCountries, fetchStates } from "../../country_API/functions";
import { Select, SelectItem } from "@nextui-org/react";
import { useSelector } from "react-redux";

const InputLocation = ({ location, setCity, setCountry, setState }: LocationProps) => {
  const [countries, setCountries] = useState<{ name: string; iso2: string }[]>([]);
  const [countryIso2, setCountryIso2] = useState<string | null>(null);
  const [states, setStates] = useState<{ name: string; iso2: string }[]>([]);
  const [stateIso2, setStateIso2] = useState<string | null>(null);
  const [cities, setCities] = useState<{ name: string }[]>([]);
  const editMode: boolean = useSelector((state: any) => state.editmode);

  const locationRef = useRef(location);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const fetchedCountries = await fetchCountries();
        setCountries(fetchedCountries.map((c: any) => ({ name: c.name, iso2: c.iso2 })));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountriesData();
  }, []);

  // Fetch states when countryIso2 changes
  useEffect(() => {
    const fetchStatesData = async () => {
      if (!countryIso2) return;
      try {
        const fetchedStates = await fetchStates(countryIso2);
        setStates(fetchedStates.map((s: any) => ({ name: s.name, iso2: s.iso2 })));
        if (location?.state) {
          const selectedStateIso = fetchedStates.find((s: any) => s.name === location.state)?.iso2;
          setStateIso2(selectedStateIso || null);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStatesData();
  }, [countryIso2]);

  // Fetch cities when stateIso2 changes
  useEffect(() => {
    const fetchCitiesData = async () => {
      if (!countryIso2 || !stateIso2) return;
      try {
        const fetchedCities = await fetchCities(countryIso2, stateIso2);
        setCities(fetchedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCitiesData();
  }, [stateIso2, countryIso2]);

  // Handle edit mode
  useEffect(() => {
    if (editMode && location) {
      const prevLocation = locationRef.current;

      if (prevLocation !== location) {
        setCountry(location.country);
        setState(location.state);
        setCity(location.city);

        const countryIso = countries.find((c) => c.name === location.country)?.iso2;
        if (countryIso) setCountryIso2(countryIso);
        const stateIso = states.find((s) => s.name === location.country)?.iso2;
        if (stateIso) setCountryIso2(stateIso2);
        locationRef.current = location;
      }
    }
  }, [editMode, location, countries, setCountry, setState, setCity]);

  // Memoize the country options
  const countryOptions = useMemo(() => {
    return countries.map((country) => (
      <SelectItem key={country.name} value={country.name}>
        {country.name}
      </SelectItem>
    ));
  }, [countries]);

  // Memoize the state options
  const stateOptions = useMemo(() => {
    return states.map((state) => (
      <SelectItem key={state.name} value={state.name}>
        {state.name}
      </SelectItem>
    ));
  }, [states]);

  // Memoize the city options
  const cityOptions = useMemo(() => {
    return cities.map((city) => (
      <SelectItem key={city.name} value={city.name}>
        {city.name}
      </SelectItem>
    ));
  }, [cities]);

  return (
    <div className="flex max-lg:flex-wrap gap-3">
      {/* Country Select */}
      <Select
        label="Select Country"
        selectedKeys={new Set(location?.country ? [location.country] : [])}
        onChange={(e) => {
          const selectedCountry = countries.find((c) => c.name === e.target.value);
          setCountry(e.target.value);
          setCountryIso2(selectedCountry?.iso2 || "");
        }}
      >
        {countryOptions}
      </Select>

      {/* State Select */}
      <Select
        label="Select State / Province"
        selectedKeys={new Set(location?.state ? [location.state] : [])}
        onChange={(e) => {
          const selectedState = states.find((s) => s.name === e.target.value);
          setState(e.target.value);
          setStateIso2(selectedState?.iso2 || "");
        }}
        isDisabled={!countryIso2}
      >
        {stateOptions}
      </Select>

      {/* City Select */}
      <Select
        label="Select City"
        selectedKeys={new Set(location?.city ? [location.city] : [])}
        onChange={(e) => setCity(e.target.value)}
        isDisabled={!stateIso2}
      >
        {cityOptions}
      </Select>
    </div>
  );
};

export default InputLocation;