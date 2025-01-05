import { useEffect, useState } from "react";
import { Location } from "../../types/Location";
import { Education } from "../../types/Education";
import InputLocation from "./InputLocation";
import { useDispatch } from "react-redux";
import { addEducation } from "../../redux/slices/EducationSlice";
import { useNavigate } from "react-router";
import { generateQualifications } from "../../Ai/AiGeneratives";


const InputEducation = () => {
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
        const generatedEdu: string[] = await generateQualifications(title);
        setSuggestedEducations(generatedEdu)

    }

 



    useEffect(() => {
        setLocation({ state, city, country });
    }, [state, city, country]);

    const handlesubmit = (e: React.FormEvent) => {
        e.preventDefault()
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
        navigate("/create/experience");
      };
      const handleBack = () => {
        navigate("/create/social-link");
      };

    return (
        <div className="w-full">

            <form >



                <div className="">

                    <div className="input-div">
                        <label htmlFor="">Title</label>
                        <input type="text" id="" value={title} onChange={e => {
                            handleAiGenerateEducations()
                            setTitle(e.target.value)
                        }} />


                        {title && suggestedEducations.length > 0 && (
                            <ul className="shadow-xl bg-white w-full z-10 flex flex-col items-start overflow-y-auto max-h-40 absolute top-full left-0">
                                {suggestedEducations.map((edu, index) => (
                                    <li key={index} className="w-full cursor-pointer hover:bg-slate-100 hover:rounded">
                                        <button
                                            type="button"
                                            className="font-medium text-left w-full p-1"
                                            onClick={() => {
                                                setTitle(edu);

                                                setSuggestedEducations([]);
                                            }}
                                        >
                                            {edu}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}



                    </div>
                    <div>
                        <div className="input-div">
                            <label htmlFor="">Collage/Institute/University</label>
                            <input type="text" value={institute} onChange={e => { 
                                
                                setInstitute(e.target.value) }} />


                        </div>


                        <div className="input-div">
                            <label htmlFor="">Description</label>
                            <textarea name="" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-4 p-2 ">
                            <input type="checkbox" onChange={() => { if (!studying) setEndDate(""); setStudying(prevStudying => !prevStudying) }} id="" />
                            <p>I'm currently follwing this</p>
                        </div>
                        <div className="flex">
                            <div className="input-div">
                                <label htmlFor="start-date">Start Date</label>
                                <input
                                    type="date"
                                    id="start-date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}

                                />
                            </div>
                            <div className="input-div" hidden={studying}>
                                <label htmlFor="end-date">
                                    End Date
                                </label>
                                <input

                                    type="date"
                                    id="end-date"
                                    value={endDate !== "present" ? endDate || "" : ""}
                                    onChange={handleEndDate}
                                    disabled={studying}
                                />
                            </div>
                        </div>

                    </div>
                    <InputLocation
                        location={location}
                        setCity={setCity}
                        setState={setState}
                        setCountry={setCountry} />

                    <button type="button" onClick={handlesubmit}>add Education</button>
                </div>


            </form>

            <button onClick={handleBack}>back</button>
            <button onClick={handleNext}>next</button>

        </div>


    )
}

export default InputEducation