import { useEffect, useState } from "react";
import { LocationProps } from "../../types/Location";
import { fetchCountires, fetchStates } from "../../country_API/functions";

const InputLocation = ({ location, setCity, setCountry, setState }: LocationProps) => {
    const [countries, setCountries] = useState<{ name: string; iso2: string }[]>([]);
    const [countryIso2, setCountryIso2] = useState<string>("");
    const [states, setStates] = useState<{ id: string; name: string }[]>([]);


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
                setStates(fetchedStates);
            } else {
                setStates([]);
            }
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    }

    // Initial fetch for countries
    useEffect(() => {
        handleCountries();
    }, []);

    // Fetch states when countryIso2 changes
    useEffect(() => {
        handleStates(countryIso2);
    }, [countryIso2]);

    return (
        <div className="flex max-lg:flex-wrap">
        
            <div className="input-div">
                <label htmlFor="city">City</label>
                <input
                    id="city"
                    type="text"
                    value={location?.city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

      
            <div className="input-div">
                <label htmlFor="state">State</label>
                <select
                    id="state"
                    value={location?.state}
                    onChange={(e) => setState(e.target.value)}
                >
                    <option value="" disabled>
                        Select State
                    </option>
                    {states.map((state) => (
                        <option key={state.id} value={state.name}>
                            {state.name}
                        </option>
                    ))}
                </select>
            </div>

         
            <div className="input-div">
                <label htmlFor="country">Country</label>
                <select
                    id="country"
                    value={location?.country}
                    onChange={(e) => {
                        const selectedCountry = countries.find((c) => c.name === e.target.value);
                        setCountry(e.target.value);
                        setCountryIso2(selectedCountry?.iso2 || ""); 
                    }}
                >
                    <option value="" disabled>
                        Select Country
                    </option>
                    {countries.map((country, index) => (
                        <option key={index} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default InputLocation;
