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






const InputExperience = () => {

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
        navigate("/create/summery");
      };
      const handleBack = () => {
        navigate("/create/education");
      };


    return (
        <div className='w-full'>

            <form>
                <div className=''>
                    <div className='input-div'>
                        <label htmlFor="title">Podition / Job Role</label>
                        <input type="text" id="title" value={title} onChange={(e) => {
                            handleAiSuggestTitle()
                            setTitle(e.target.value)
                        }} />


                        {title && suggestedJobRoles.length > 0 && (
                            <ul className="shadow-xl bg-white w-full z-10 flex flex-col items-start overflow-y-auto max-h-40 absolute top-full left-0">
                                {suggestedJobRoles.map((job, index) => (
                                    <li key={index} className="w-full cursor-pointer hover:bg-slate-100 hover:rounded">
                                        <button
                                            type="button"
                                            className="font-medium text-left w-full p-1"
                                            onClick={() => {
                                                setTitle(job);

                                                setSuggestedJobRoles([]);
                                            }}
                                        >
                                            {job}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}



                    </div>
                    <div className='input-div'>
                        <label htmlFor="type">Type</label>
                        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                            {employeeTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='input-div'>
                        <label htmlFor="company">Company / Organization</label>
                        <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>

                    <InputLocation
                        location={location}
                        setCity={setCity}
                        setState={setState}
                        setCountry={setCountry} />

                    <div className='flex gap-4 p-2'>
                        <input type="checkbox" id="current-job" checked={status} onChange={() => setStatus(!status)} />

                        <p >I'm currently working here</p>
                    </div>
                    <div className='flex'>
                        <div className='input-div'>
                            <label htmlFor="start-date">Start Date</label>
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}

                            />
                        </div>
                        <div className='input-div' hidden={status}>
                            <label htmlFor="end-date">
                                End Date
                            </label>
                            <input

                                type="date"
                                id="end-date"
                                value={endDate !== "present" ? endDate || "" : ""}
                                onChange={handleEndDate}
                                disabled={status}
                            />
                        </div>
                    </div>

                    <InputSkills jobRole={title} />

                    <div className='input-div'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyUp={handleKeyUp}
                            placeholder="- Enter some decriptions about your work and press Enter"
                        ></textarea>
                    </div>
                    <div className='p-2'>
                        <button type="button" className='bg-black text-white rounded p-2' onClick={handleSubmit}>
                            Add experience
                        </button>
                    </div>
                </div>
            </form>
            <button onClick={handleBack}>back</button>
            <button onClick={handleNext}>next</button>
        </div>
    );
};

export default InputExperience;
