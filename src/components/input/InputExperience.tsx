import { useEffect, useState } from 'react';
import InputSkills from './InputSkills';
import { Experience } from '../../types/Experience';
import InputLocation from './InputLocation';
import { Location } from '../../types/Location';
import { useDispatch, useSelector } from 'react-redux';
import { addExperience } from '../../redux/slices/ExpSlice';
import { clearSelectedSkills } from '../../redux/slices/SkillsSlice';
import { useNavigate } from 'react-router';
import { suggestJobRole } from '../../Ai/AiGeneratives';
import { Button, Input, Textarea, Listbox, ListboxItem, Select, SelectItem, Checkbox } from '@nextui-org/react';






const InputExperience = ({templateId}:{templateId:number}) => {

    const { selectedSkills } = useSelector((state: any) => state.skills);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<string>("Intership");
    const [company, setCompany] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [description, setDescription] = useState<string[]>([]);
    const [status, setStatus] = useState<boolean>(false);
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [currentInput, setCurrentInput] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [location, setLocation] = useState<Location>()
    const [suggestedJobRoles, setSuggestedJobRoles] = useState<string[]>([]);

    const employeeTypes = ["Intership", "Contract", "Employee"];

    const newExp: Experience = {
        title: title,
        type: type,
        company: company,
        description: description,
        status: status,
        skills: selectedSkills,
        dates: { startDate: startDate, endDate: endDate },
        location: location,

    };

    async function handleAiSuggestTitle() {
        const aiSuggestJobRoles: string[] = await suggestJobRole(title)
        setSuggestedJobRoles(aiSuggestJobRoles);
    }



    useEffect(() => {
        setLocation({ state, city, country });
    }, [state, city, country]);

    const clearExp = () => {
        setTitle("");
        setType(employeeTypes[0]);
        setCompany("");
        setStartDate("");
        setEndDate("");
        setDescription([]);
        setStatus(false);

    };




    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === ("Enter")) {
            const value = e.currentTarget.value.trim()

            if (value !== "") {
                setDescription(prevDesc => [...prevDesc, value])
                setCurrentInput("")
            }
            e.preventDefault()
            console.log(description);

        }


    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addExperience(newExp))
        clearExp();
        dispatch(clearSelectedSkills())
        console.log(newExp.skills);

    };


    const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {

        const selectedEndDate = e.target.value;
        if (new Date(selectedEndDate) >= new Date(startDate)) {
            setEndDate(selectedEndDate);
        } else {
            alert("End date cannot be earlier than the start date.");
        }

        if (status) {
            setEndDate("Present")
        }
    }


  const handleNext = () => {
        navigate(`/templates/template/${templateId}/create/custom-section`);

    
    };
    const handleBack = () => {
        navigate(`/templates/template/${templateId}/create/education`);
    };


    return (
        <div className='w-full'>

            <form>
                <div className='flex flex-col gap-3'>


                    <Input type="text" label="Podition / Job Role" value={title} onChange={(e) => {
                        handleAiSuggestTitle()
                        setTitle(e.target.value)
                    }} />

                    {title && suggestedJobRoles.length > 0 && (
                        <Listbox className='max-h-40' onAction={key => {

                            setTitle(key as string)
                            setSuggestedJobRoles([])
                        }}>
                            {suggestedJobRoles.map((job) => (
                                <ListboxItem key={job} textValue={job}>{job}</ListboxItem>
                            ))}
                        </Listbox>)}
                    <Select label="Select Employment Type" value={type} onChange={e => setType(e.target.value)}>
                        {employeeTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </Select>


                    <Input type="text" label="Company / Organization" value={company} onChange={(e) => {
                        setCompany(e.target.value)
                    }} />

                    <InputLocation
                        location={location}
                        setCity={setCity}
                        setState={setState}
                        setCountry={setCountry} />


                    <Checkbox type="checkbox" id="current-job" checked={status} onChange={() => setStatus(!status)} >I'm currently working here</Checkbox>



                    <div className='flex gap-2 flex-nowrap'>

                        <Input
                            label="Start Date"
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}

                        />


                        {!status &&
                            <Input
                                hidden={status}
                                label="End Date"
                                type="date"
                                id="end-date"
                                value={endDate !== "present" ? endDate || "" : ""}
                                onChange={handleEndDate}
                                disabled={status}
                            />}

                    </div>

                    <InputSkills jobRole={title} />

                    <div className='input-div'>

                        <Textarea
                            label="Description"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyUp={handleKeyUp}
                            placeholder="- Enter some decriptions about your work as a list and press Enter"
                        ></Textarea>
                    </div>
                    <div className='p-2'>
                        <button type="button" className='bg-black text-white rounded p-2' onClick={handleSubmit}>
                            Add experience
                        </button>
                    </div>
                </div>
            </form>

            <div className="flex justify-between">
                <Button onPress={handleBack} variant="flat">back</Button>
                <Button onPress={handleNext} variant="flat">next</Button>
            </div>
        </div>
    );
};

export default InputExperience;
