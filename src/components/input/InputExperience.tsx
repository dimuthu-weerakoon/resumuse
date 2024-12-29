import { KeyboardEvent, useEffect, useState } from 'react';
import { useExp } from '../../context/exp_context/ExpContext';
import { useSkill } from '../../context/skill_context/SkillContext';
import InputSkills from './InputSkills';
import { Experience } from '../../types/Experience';




const InputExperience = () => {
    const { addExperience, experience } = useExp();
    const { selectedSkills, clearSelectedSkills } = useSkill();

    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<string>("Intership");
    const [company, setCompany] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [description, setDescription] = useState<string[]>([]);
    const [status, setStatus] = useState<boolean>(false);
    const [state, setState] = useState<string>("");
    const [city, setcity] = useState<string>("");
    const [currentInput, setCurrentInput] = useState<string>("");
    const [country, setCountry] = useState<string>("");



    const employeeTypes = ["Intership", "Contract", "Employee"];

    const newExp: Experience = {
        title: title,
        type: type,
        company: company,
        description: description,
        status: status,
        skills: selectedSkills,
        Dates: { startDate: startDate, endDate: endDate },
        location: {
            city: city,
            state: state,
            country: country
        },

    };

useEffect(()=>{
    console.log(experience)
})
    const clearExp = () => {
        setTitle("");
        setType(employeeTypes[0]);
        setCompany("");
        setStartDate("");
        setEndDate("");
        setDescription([]);
        clearSelectedSkills();
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
        addExperience(newExp);
        clearExp();
       
    };





    return (
        <div>
            <h4>Experience</h4>
            <form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="type">Type</label>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        {employeeTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="company">Company / Organization</label>
                    <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div>
                    <div>
                        <label htmlFor="company">State</label>
                        <input type="text" id="company" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="company">City</label>
                        <input type="text" id="company" value={city} onChange={(e) => setcity(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="company">Country</label>
                        <input type="text" id="company" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                </div>
                <div>
                    <input type="checkbox" id="current-job" checked={status} onChange={() => setStatus(!status)} />
                    <label htmlFor="current-job">I'm currently working here</label>
                </div>
                <div>
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
                            {status ? "End Date (Disabled)" : "End Date"}
                        </label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            disabled={status}
                            onChange={(e) => {status ? setEndDate("Present"): setEndDate(e.target.value)}}
                        />
                    </div>
                </div>

                <InputSkills />


                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyPress={handleKeyUp}
                        placeholder="Type and press Enter"
                    ></textarea>
                </div>
                <button type="button" onClick={handleSubmit}>
                    Add
                </button>
            </form>

        </div>
    );
};

export default InputExperience;
