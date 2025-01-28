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
import { faArrowLeft, faArrowRight, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { phoneNumberAutoFormat } from "../../common_functions/phonenumberAutoFormat";


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



    const handleNext = () => {
        navigate(`/template/${templateId}/create/picture`);
    };

    const handleBack = () => {
        navigate(`/template/${templateId}/create/summery`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, }} className="w-full">

            <div className="flex justify-between mb-4">

                <Button size="sm" onPress={handleBack} variant="flat" className="input-nav-btn"> <FontAwesomeIcon icon={faArrowLeft} /> </Button>
                <Button size="sm" onPress={handleNext} variant="flat" className="input-nav-btn"> <FontAwesomeIcon icon={faArrowRight} /> </Button>

            </div>
            <div className="mb-4">
                <h2 className=" input-heading">Refrees</h2>
                <p className="input-sub-heading">Provide details of individuals who can vouch for your professional or academic background.</p>
            </div>
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
                        value={phone}
                        required
                        onChange={e =>{ 
                            const targetValue = e.target.value
                            setPhone(phoneNumberAutoFormat(targetValue))}} />


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

                    <Button variant="flat" color="secondary" onPress={handleSubmit} className="input-action-btn max-w-fit" type="button" >
                        <FontAwesomeIcon icon={faPlusCircle} />   Add Refree
                    </Button>
                </div>
            </form >



        </motion.div >


    )
}

export default InputRefrees