
import InputLocation from "./InputLocation";
import { useDispatch, useSelector } from "react-redux";
import { addContactInfo } from "../../redux/slices/ContactInfoSlice";
import { useNavigate } from "react-router";
import { Button, Input } from "@nextui-org/react";
import ContactInfo from "../../types/ContactInfo";
import { Location } from "../../types/Location";
import { motion } from "framer-motion";


const InputContactInfo = ({ templateId }: { templateId: number }) => {




    const contactInfo: ContactInfo = useSelector((state: any) => state.contactInfo)
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const handleNext = () => {
        navigate(`/template/${templateId}/create/social-link`);

    };
    const handleBack = () => {
        navigate(`/template/${templateId}/create`);

    };

    const handleDispatch = (key: keyof ContactInfo | keyof Location, value: string) => {

        if (key === "state" || key === "city" || key === "country") {
            dispatch(addContactInfo({
                ...contactInfo,
                location: {
                    ...contactInfo.location,
                    [key]: value
                }

            }))
        } else {
            dispatch(addContactInfo({
                ...contactInfo,
                [key]: value
            }))
        }
    }

    const updatedLocation: Location = {
        city: contactInfo.location.city,
        state: contactInfo.location.state,
        country: contactInfo.location.country
    }










    return (
        <motion.div initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, }}
            className="w-full ">
            <div className="flex max-lg:flex-wrap gap-3">


                <Input
                    size="md"
                    type="tel"
                    label="Phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={contactInfo.phone}
                    required
                    onChange={e => handleDispatch("phone", e.target.value)} />


                <Input
                    size="md"
                    type="email"
                    label="Email Address"
                    value={contactInfo.email}
                    required
                    errorMessage={"Please Enter valid Email Address"}
                    onChange={e => handleDispatch("email", e.target.value)} />

                <Input
                    size="md"
                    type="text"
                    label="Street No / Apartment No"
                    value={contactInfo.address}
                    required
                    onChange={e => handleDispatch("address", e.target.value)} />
            </div>


            <InputLocation location={updatedLocation}
                setCity={value => handleDispatch("city", value)}
                setState={value => handleDispatch("state", value)}
                setCountry={value => handleDispatch("country", value)} />

            <div className="flex justify-between mt-3">
                <Button variant="flat" color="secondary" onPress={handleBack}>back</Button>
                <Button variant="flat" color="secondary" onPress={handleNext}>next</Button>
            </div>


        </motion.div>
    );
};

export default InputContactInfo;