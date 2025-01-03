import { useEffect, useState } from "react";
import InputLocation from "./InputLocation";
import { Location } from "../../types/Location";
import ContactInfo from "../../types/ContactInfo";
import { useDispatch } from "react-redux";
import { addContactInfo } from "../../redux/slices/ContactInfoSlice";
import { Link, useNavigate } from "react-router";


const InputContactInfo = () => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const navigate = useNavigate();


    const handleDispatch = () => {

        dispatch(addContactInfo(updatedContactInfo))


    }

    const updatedLocation: Location = {
        city: city,
        state: state,
        country: country
    }

    const updatedContactInfo: ContactInfo = {
        address: address,
        location: updatedLocation,
        phone: phone,
        email: email
    };

    useEffect(() => {

        handleDispatch()
    })

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


            <InputLocation location={updatedLocation} setCity={setCity} setState={setState} setCountry={setCountry} />
            <div className="flex justify-between">
                <button onClick={() => navigate(-1)}>back</button>
                <button onClick={() => navigate("/create/social-link")}>next</button>
            </div>


        </div>
    );
};

export default InputContactInfo;