import { useEffect, useState } from "react";
import InputLocation from "./InputLocation";
import { Location } from "../../types/Location";
import ContactInfo from "../../types/ContactInfo";
import { useDispatch } from "react-redux";
import { addContactInfo } from "../../redux/slices/ContactInfoSlice";


const InputContactInfo = () => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [location, setLocation] = useState<Location | undefined>(undefined);
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");


    useEffect(() => {


        setLocation({ city, state, country });
        const updatedContactInfo: ContactInfo = {
            address: address,
            location: location,
            phone: phone,
            email: email
        };
       
            dispatch(addContactInfo(updatedContactInfo))
        
    }, [ address,email,location,phone,dispatch])

  

    return (
        <div className="w-full ">
            <div className="flex max-lg:flex-wrap">
                <div className="input-div" >
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        className="flex"
                        id="phone"
                        type="tel"
                        placeholder="123-4567-8901"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div className="input-div" >
                    <label htmlFor="email">Email Address</label>
                    <input
                        className="flex"
                        id="email"
                        type="email"
                        placeholder="mail@example.com"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-div ">
                    <label htmlFor="address">Street No / Apartment No</label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>
      
            </div>


            <InputLocation location={location} setCity={setCity} setState={setState} setCountry={setCountry} />

        </div>
    );
};

export default InputContactInfo;
