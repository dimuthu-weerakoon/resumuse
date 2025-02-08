import InputLocation from "./InputLocation"; // Import the InputLocation component for location input
import { useDispatch, useSelector } from "react-redux"; // Redux hooks to interact with the Redux store
import { addContactInfo } from "../../redux/slices/ContactInfoSlice"; // Redux action to update contact info
import { useNavigate } from "react-router"; // Hook to navigate between pages
import { Button, Input } from "@nextui-org/react"; // Importing Button and Input components from NextUI library
import ContactInfo from "../../types/ContactInfo"; // Type definition for ContactInfo
import { Location } from "../../types/Location"; // Type definition for Location
import { motion } from "framer-motion"; // Import motion for animations
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon for icons
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import left and right arrow icons
import { phoneNumberAutoFormat } from "../../common_functions/phonenumberAutoFormat"; // Function to auto-format phone number

const InputContactInfo = ({ templateId }: { templateId: number }) => {
    {
        /* contact info global stse from redux store */
    }
    const contactInfo: ContactInfo = useSelector(
        (state: any) => state.contactInfo
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    {
        /* naviagte to next component  */
    }
    const handleNext = () => {
        navigate(`/template/${templateId}/create/social-link`);
    };
    {
        /* naviagte back to previous component */
    }
    const handleBack = () => {
        navigate(`/template/${templateId}/create`);
    };

    {
        /* handling location values and input values for dispatch actions*/
    }

    const handleDispatch = (
        key: keyof ContactInfo | keyof Location,
        value: string
    ) => {
        {
            /* checking if keys are belongs to location info either if (state,city,country) */
        }

        if (key === "state" || key === "city" || key === "country") {
            {
                /* dispatch action from redux store  copying exiting props of contactinfo to new object and
                   conditionaly update values if location object props chanage its only update location object of contact info 
                   and if other props of contact info change its only update contactinfo props
                   */
            }

            dispatch(
                addContactInfo({
                    ...contactInfo,
                    location: {
                        ...contactInfo.location,
                        [key]: value,
                    },
                })
            );
        } else {
            dispatch(
                addContactInfo({
                    ...contactInfo,
                    [key]: value,
                })
            );
        }
    };

    const updatedLocation: Location = {
        city: contactInfo.location.city,
        state: contactInfo.location.state,
        country: contactInfo.location.country,
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="w-full "
        >
            <div className="flex justify-between mb-3">
                <Button
                    variant="flat"
                    size="sm"
                    className="input-nav-btn"
                    onPress={handleBack}
                >
                    {" "}
                    <FontAwesomeIcon icon={faArrowLeft} />{" "}
                </Button>
                <Button
                    variant="flat"
                    size="sm"
                    className="input-nav-btn"
                    onPress={handleNext}
                >
                    {" "}
                    <FontAwesomeIcon icon={faArrowRight} />{" "}
                </Button>
            </div>
            <div className="mb-4">
                <h2 className=" input-heading">Contact Information</h2>
                <p className="input-sub-heading">Fill in your contact information</p>
            </div>
            <div className="flex flex-col max-lg:flex-wrap gap-3 mb-3">
                <Input
                    size="sm"
                    type="tel"
                    label="Phone"
                    value={contactInfo.phone}
                    required
                    onChange={(e) => {
                        const targetValue = e.target.value;
                        handleDispatch("phone", phoneNumberAutoFormat(targetValue));
                    }}
                />

                <Input
                    size="sm"
                    type="email"
                    label="Email Address"
                    value={contactInfo.email}
                    required
                    errorMessage={"Please Enter valid Email Address"}
                    onChange={(e) => handleDispatch("email", e.target.value)}
                />

                <Input
                    size="sm"
                    type="text"
                    label="Street No / Apartment No"
                    value={contactInfo.address}
                    required
                    onChange={(e) => handleDispatch("address", e.target.value)}
                />
            </div>

            <InputLocation
                location={updatedLocation}
                setCity={(value) => handleDispatch("city", value)}
                setState={(value) => handleDispatch("state", value)}
                setCountry={(value) => handleDispatch("country", value)}
            />
        </motion.div>
    );
};

export default InputContactInfo;
