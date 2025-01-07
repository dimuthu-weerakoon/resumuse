import { useEffect, useMemo, useState } from "react";
import InputLocation from "./InputLocation";
import { useDispatch } from "react-redux";
import { addContactInfo } from "../../redux/slices/ContactInfoSlice";
import { useNavigate } from "react-router";
import { Button, Input } from "@nextui-org/react";


const InputContactInfo = () => {

    const dispatch = useDispatch()
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const navigate = useNavigate();
    const handleNext = () => {
        navigate("/create/social-link");
    };
    const handleBack = () => {
        navigate(("/create"), { state: { preserveState: true }, replace: false });
    };

    const handleDispatch = () => {

        dispatch(addContactInfo(updatedContactInfo))


    }

    const updatedLocation = useMemo(
        () => ({ city, state, country }),
        [city, state, country]
    );

    const updatedContactInfo = useMemo(
        () => ({ address, location: updatedLocation, phone, email }),
        [address, updatedLocation, phone, email]
    );

    useEffect(() => {

        handleDispatch()
    }, [dispatch, updatedContactInfo])

    return (
        <div className="w-full ">
            <div className="flex max-lg:flex-wrap gap-3">


                <Input
                    size="md"
                    type="tel"
                    label="Phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={phone}
                    required
                    onChange={e => setPhone(e.target.value)} />


                <Input
                    size="md"
                    type="email"
                    label="Email Address"
                    pattern="example@mail.com"
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)} />

                <Input
                    size="md"
                    type="text"
                    label="Street No / Apartment No"
                    value={address}
                    required
                    errorMessage={"Please Enter valid Email Address"}
                    onChange={e => setAddress(e.target.value)} />



            </div>


            <InputLocation location={updatedLocation} setCity={setCity} setState={setState} setCountry={setCountry} />
            <div className="flex justify-between mt-3">
                <Button variant="flat" color="secondary" onPress={handleBack}>back</Button>
                <Button variant="flat" color="secondary" onPress={handleNext}>next</Button>
            </div>


        </div>
    );
};

export default InputContactInfo;