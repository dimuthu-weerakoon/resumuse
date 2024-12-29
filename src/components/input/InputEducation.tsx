import { useEffect, useState } from "react";
import { Location } from "../../types/Location";
import { useEdu } from "../../context/edu_context/EduContext";
import { Education } from "../../types/Education";
import InputLocation from "./InputLocation";


const InputEducation = () => {
    const [title, setTitle] = useState<string>("");
    const [institute, setInstitute] = useState<string>("");
    const [description, setDescription] = useState<string>("")
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string | null | "present">(null);
    const [studying, setStudying] = useState<boolean>(false);

    const [location, setLocation] = useState<Location>();


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


    const { addEducation, educations } = useEdu()
    useEffect(() => {
        setLocation({ state, city, country });
    }, [state, city, country]);

    const handlesubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addEducation(newEducation);
        console.log("educations ", educations);
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

    return (
        <div>


            <form >

                <div>
                    <label htmlFor="">Title</label>
                    <input type="text" id="resitent" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <div>
                        <label htmlFor="">Collage/Institute/University</label>
                        <input type="text" value={institute} onChange={e => setInstitute(e.target.value)} /></div>
                    <div>
                        <label htmlFor="">Description</label>
                        <textarea name="" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="">I'm currently follwing this</label>
                        <input type="checkbox" onChange={() => { if (!studying) setEndDate(""); setStudying(prevStudying => !prevStudying) }} id="" />
                    </div>
                    <div>
                        <label htmlFor="start-date">Start Date</label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}

                        />
                    </div>
                    <div>
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
                <InputLocation
                    location={location}
                    setCity={setCity}
                    setState={setState}
                    setCountry={setCountry} />

                <button type="button" onClick={handlesubmit}>add</button>
            </form>
        </div>


    )
}

export default InputEducation