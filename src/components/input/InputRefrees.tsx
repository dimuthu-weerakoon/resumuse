import { useEffect, useMemo, useState } from "react";
import { Location } from "../../types/Location";
import InputLocation from "./InputLocation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Form, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Refree } from "../../types/Refree";
import {
    addRefrees,
    clearEditingRefree,
    updateRefree,
} from "../../redux/slices/RefreeSlice";
import {
    faArrowLeft,
    faArrowRight,
    faPlusCircle,
    faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { phoneNumberAutoFormat } from "../../common_functions/phonenumberAutoFormat";

const InputRefrees = ({ templateId }: { templateId: number }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [refreeName, setRefreeName] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [institute, setInstitute] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [location, setLocation] = useState<Location | null>();
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const validateEmail = (value: string) =>
        value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    const isInvalidEmail = useMemo(() => {
        if (email.trim() === "") return true;
        return validateEmail(email) ? false : true;
    }, [email]);

    if (templateId === 1) {
        navigate(`/templates/template/1/create`);
    }

    const editMode: boolean = useSelector((state: any) => state.editmode);
    const {
        editingRefree,
    }: {
        editingRefree: Refree | null;
    } = useSelector((state: any) => state.refree);

    const clearForm = () => {
        setRefreeName("");
        setPosition("");
        setInstitute("");
        setEmail("");
        setPhone("");
        setLocation(null);
    };

    useMemo(() => {
        if (editMode && editingRefree) {
            setRefreeName(editingRefree.refreeName);
            setPosition(editingRefree.positions);
            setInstitute(editingRefree.institute);
            setEmail(editingRefree.email);
            setPhone(editingRefree.phone);
            setLocation(editingRefree.location);
        }
    }, [editMode, editingRefree]);

    useEffect(() => {
        setLocation({ state, city, country });
    }, [state, city, country]);

    useEffect(() => {
        if (!editMode) {
            dispatch(clearEditingRefree());
            clearForm();
        }
    }, [editMode, dispatch]);

    const handleSubmit = () => {
        const newRefree: Refree = {
            refreeName: refreeName,
            positions: position,
            institute: institute,
            location: location,
            email: email,
            phone: phone,
        };
        if (
            !isInvalidEmail &&
            refreeName.trim() !== "" &&
            position.trim() !== "" &&
            phone.trim() !== ""
        ) {
            editMode
                ? dispatch(updateRefree(newRefree))
                : dispatch(addRefrees(newRefree));
        } else {
            return
        }
        clearForm();
    };

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
            transition={{ duration: 0.8 }}
            className="w-full"
        >
            <div className="flex justify-between mb-4">
                <Button
                    size="sm"
                    onPress={handleBack}
                    variant="flat"
                    className="input-nav-btn"
                >
                    {" "}
                    <FontAwesomeIcon icon={faArrowLeft} />{" "}
                </Button>
                <Button
                    size="sm"
                    onPress={handleNext}
                    variant="flat"
                    className="input-nav-btn"
                >
                    {" "}
                    <FontAwesomeIcon icon={faArrowRight} />{" "}
                </Button>
            </div>
            <div className="mb-4">
                <h2 className=" input-heading">Refrees</h2>
                <p className="input-sub-heading">
                    Provide details of individuals who can vouch for your professional or
                    academic background.
                </p>
            </div>
            <Form validationBehavior="native">
                <div className="flex flex-col gap-3 w-full">
                    <Input
                        label="Refree Mr/Mrs"
                        value={refreeName}
                        isRequired
                        validate={(value) => {
                            if (value.trim() === "") {
                                return "Please fill this field";
                            }
                        }}
                        
                        onChange={(e) => {
                            setRefreeName(e.target.value);
                        }}
                        size={"sm"}
                        type="text"
                    />

                    <Input
                        label="Position / Job Role"
                        value={position}
                        onChange={(e) => {
                            setPosition(e.target.value);
                        }}
                        validate={(value) => {
                            if (value.trim() === "") {
                                return "Please fill this field";
                            }
                        }} isRequired
                        size={"sm"}
                        type="text"
                    />

                    <Input
                        label="Institute / Comapany"
                        value={institute}
                        onChange={(e) => {
                            setInstitute(e.target.value);
                        }} 
                        
                        size={"sm"}
                        validate={(value) => {
                            if (value.trim() === "") {
                                return "Please fill this field";
                            }
                        }}
                        type="text"
                    />

                    <Input
                        size="sm"
                        type="tel"
                        label="Phone"
                        value={phone}
                         isRequired
                        validate={(value) => {
                            if (value.trim() === "") {
                                return "Please fill this field";
                            }
                        }}
                        required
                        onChange={(e) => {
                            const targetValue = e.target.value;
                            setPhone(phoneNumberAutoFormat(targetValue));
                        }}
                    />

                    <Input
                        size="sm"
                        type="email"
                        label="Email Address"
                        value={email}
                        isRequired
                        isInvalid={isInvalidEmail}
                        errorMessage={"Please Enter valid Email Address"}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputLocation
                        location={location}
                        setCity={setCity}
                        setState={setState}
                        setCountry={setCountry}
                    />

                    <Button
                    size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={handleSubmit}
                        className="input-action-btn max-w-fit"
                        type="button"
                    >
                        <FontAwesomeIcon icon={editMode ? faRepeat : faPlusCircle} />{" "}
                        {editMode ? "Update" : "Add Refree"}
                    </Button>
                </div>
            </Form>
        </motion.div>
    );
};

export default InputRefrees;
