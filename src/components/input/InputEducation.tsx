import { useEffect, useState } from "react";
import { Location } from "../../types/Location";
import { Education } from "../../types/Education";
import InputLocation from "./InputLocation";
import { useDispatch } from "react-redux";
import { addEducation } from "../../redux/slices/EducationSlice";
import { useNavigate } from "react-router";
import { generateQualifications } from "../../Ai/AiGeneratives";
import { Checkbox, Input, Listbox, ListboxItem, Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";


const InputEducation = ({templateId}:{templateId:number}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState<string>("");
    const [institute, setInstitute] = useState<string>("");
    const [description, setDescription] = useState<string>("")
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [studying, setStudying] = useState<boolean>(false);
    const [location, setLocation] = useState<Location>();
    const [suggestedEducations, setSuggestedEducations] = useState<string[]>([])

    const newEducation: Education = {
        title: title,
        institute: institute,
        description: description,
        dates: {
            startDate: startDate,
            endDate: endDate
        },
        location: location,
        studying: studying
    }


    const handleAiGenerateEducations = async () => {
        try {
            const generatedEdu: string[] = await generateQualifications(title);
            setSuggestedEducations(generatedEdu);
        } catch (error) {
            console.error("Error generating qualifications:", error);
            setSuggestedEducations([]);
        }
    };



    useEffect(() => {
        setLocation({ state, city, country });
    }, [state, city, country]);

    const handlesubmit = () => {

        dispatch(addEducation(newEducation))
    }


    const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {

        const selectedEndDate = e.target.value;
        if (new Date(selectedEndDate) >= new Date(startDate)) {
            setEndDate(selectedEndDate);
        } else {
            alert("End date cannot be earlier than the start date.");
        }

        if (studying) {
            setEndDate("Present")
        }

    }
    const handleNext = () => {
        navigate(`/templates/template/${templateId}/create/experience`);

    
    };
    const handleBack = () => {
        navigate(`/templates/template/${templateId}/create/social-link`);
    };

    return (
        <div className="w-full">

            <form >



                <div className="flex flex-col gap-3">

                    <Input label="Qualification / Certifications"
                        value={title}
                        onChange={(e) => {
                            handleAiGenerateEducations()
                            setTitle(e.target.value)
                        }}
                        size={"md"}
                        type="text" />
                    {title && suggestedEducations.length > 0 && (
                        <Listbox

                            selectionMode="single" onAction={(key) => {

                                setTitle(key as string)
                                setSuggestedEducations([])

                            }
                            }>

                            {suggestedEducations.map((edu: string) => (

                                <ListboxItem textValue={edu} key={edu}>{edu}</ListboxItem>
                            ))}
                        </Listbox>)}






                    <Input label="Institute / Collage"
                        value={institute}
                        onChange={(e) => {
                            setInstitute(e.target.value)
                        }}
                        size={"md"}
                        type="text" />


                    <div>

                        <Checkbox onChange={() => {
                            if (!studying) setEndDate("");
                            setStudying(prev => !prev)
                        }} >I'm currently follwing this</Checkbox>


                        <div className="flex gap-3 flex-nowrap">






                            <Input
                                label="Start Date"
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}

                            />
                            {!studying &&

                                <Input
                                    label="End Date"
                                    type="date"
                                    id="end-date"
                                    value={endDate !== "present" ? endDate || "" : ""}
                                    onChange={handleEndDate}
                                    disabled={studying}
                                    hidden={studying}
                                />


                            }

                        </div>

                    </div>
                    <InputLocation
                        location={location}
                        setCity={setCity}
                        setState={setState}
                        setCountry={setCountry} />

                    <Textarea label="Description - (optional)" onChange={e => setDescription(e.target.value)} />

                    <Button variant="flat" color="secondary" className="max-w-fit" type="button" onPress={handlesubmit}>add Education</Button>
                </div>


            </form >

            <div className="flex justify-between mt-3">
                <Button onPress={handleBack} variant="flat">back</Button>
                <Button onPress={handleNext} variant="flat">next</Button>
            </div>


        </div >


    )
}

export default InputEducation