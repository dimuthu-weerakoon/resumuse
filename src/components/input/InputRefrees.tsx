import { useEffect, useState } from "react";
import { Location } from "../../types/Location";
import InputLocation from "./InputLocation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Refree } from "../../types/Refree";
import { addRefrees } from "../../redux/slices/RefreeSlice";


const InputRefrees = ({ templateId }: { templateId: number }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [refreeName, setRefreeName] = useState<string>("");
    const [position, setPosition] = useState<string>("")
    const [institute, setInstitute] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("")
    const [location, setLocation] = useState<Location>();
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("");

    if (templateId === 1) {
        navigate(`/templates/template/1/create`);
    }


    const newRefree: Refree = {
        refreeName: refreeName,
        positions: position,
        institute: institute,
        location: location,
        email: email,
        phone: phone
    }

    useEffect(() => {
        setLocation({ state, city, country });
    }, [state, city, country]);


    const handleSubmit = () => {
        dispatch(addRefrees(newRefree))
    }




    const handleBack = () => {
        navigate(`/templates/template/${templateId}/create/summery`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, }} className="w-full">

            <form >
                <div className="flex flex-col gap-3">

                    <Input label="Refree Mr/Mrs"
                        value={refreeName}
                        onChange={(e) => {

                            setRefreeName(e.target.value)
                        }}
                        size={"md"}
                        type="text" />

                    <Input label="Position / Job Role"
                        value={position}
                        onChange={(e) => {
                            setPosition(e.target.value)
                        }}
                        size={"md"}
                        type="text" />

                    <Input label="Institute / Comapany"
                        value={institute}
                        onChange={(e) => {
                            setInstitute(e.target.value)
                        }}
                        size={"md"}
                        type="text" />

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
                        value={email}
                        required
                        errorMessage={"Please Enter valid Email Address"}
                        onChange={e => setEmail(e.target.value)} />


                    <InputLocation
                        location={location}
                        setCity={setCity}
                        setState={setState}
                        setCountry={setCountry} />

                    <Button variant="flat" color="secondary" onPress={handleSubmit} className="max-w-fit" type="button" >add Refree</Button>
                </div>
            </form >

            <div className="flex justify-between mt-3">
                <Button onPress={handleBack} variant="flat">back</Button>
            </div>


        </motion.div >


    )
}

export default InputRefrees