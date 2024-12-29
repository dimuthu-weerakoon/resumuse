import { FormEvent, useEffect, useState } from "react";
import InputLocation from "./InputLocation";
import { Location } from "../../types/Location";
import ContactInfo from "../../types/ContactInfo";
import { useContactInfo } from "../../context/contact_info_context/ContactInfoContext";

const InputContactInfo = () => {
    const { addContactInfo, contactInfo } = useContactInfo();
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [location, setLocation] = useState<Location | undefined>(undefined);
    const [phone, setPhone] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!address || !location || !phone) {
            // Handle validation if needed
            console.log("Please fill in all fields");
            return;
        }

        const contactInfo: ContactInfo = {
            address: address,
            location: location,
            phone: phone
        };

        addContactInfo(contactInfo);
        console.log(contactInfo); // For debugging purposes
    };

    useEffect(() => {
        if (city && state && country) {
            setLocation({ city, state, country });
        }
    }, [city, state, country]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="address">Street No / Apartment No</label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="123-4567-8901"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <InputLocation location={location} setCity={setCity} setState={setState} setCountry={setCountry} />
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>

            <div>
                <h3>Result</h3>
                <div>
                    <p>{contactInfo?.address}</p>
                    <p>{contactInfo?.location?.city}</p>
                </div>
            </div>
        </div>
    );
};

export default InputContactInfo;
