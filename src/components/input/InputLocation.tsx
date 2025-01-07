import { useEffect, useState } from "react";
import { LocationProps } from "../../types/Location";
import { fetchCountires, fetchStates } from "../../country_API/functions";
import { Input, Select, SelectItem } from "@nextui-org/react";

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


    useEffect(() => {
        handleCountries();
    }, []);


    useEffect(() => {
        handleStates(countryIso2);
    }, [countryIso2]);

    return (
        <div className="flex max-lg:flex-wrap mt-4 gap-3">


            <Select className="" value={location?.country}
                onChange={(e) => {
                    const selectedCountry = countries.find((c) => c.name === e.target.value);
                    setCountry(e.target.value);
                    setCountryIso2(selectedCountry?.iso2 || "");
                }}
                label="Select Country">
                {countries.map((country) => (
                    <SelectItem value={country.name} key={country.name}>{country.name}</SelectItem>
                ))}
            </Select>


            <Select className="" value={location?.state} 
            onChange={e => setState(e.target.value)} label="Select State / Province">
                {states.map((state) => (
                    <SelectItem value={state.name} key={state.name}>{state.name}</SelectItem>
                ))}
            </Select>


            <Input
                label="City"
                value={location?.city}
                onChange={e => setCity(e.target.value)}
                size={"md"}
                type="text"

            />


        </div>
    );
};

export default InputLocation;
