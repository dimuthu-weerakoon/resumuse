import { useEffect, useState } from 'react';
import { useExp } from '../../context/exp_context/ExpContext';
import { useSkill } from '../../context/skill_context/SkillContext';
import InputSkills from './InputSkills';
import { Experience } from '../../types/Experience';
import formattedDate from '../../common_functions/dateformat';

const InputExperience = () => {
    const { addExperience, experience } = useExp();
    const { selectedSkills, clearSelectedSkills } = useSkill();

    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<string>("Intership");
    const [company, setCompany] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<boolean>(false);

    const employeeTypes = ["Intership", "Contract", "Employee"];

    const newExp: Experience = {
        title,
        type,
        company,
        description,
        status,
        skills: selectedSkills,
        Dates: { startDate: startDate, endDate: endDate }
    };

    const clearExp = () => {
        setTitle("");
        setType(employeeTypes[0]);
        setCompany("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        clearSelectedSkills();
        setStatus(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addExperience(newExp);
        clearExp();
    };


    useEffect(() => {
        console.log("EXP ", experience);

    }, [experience])
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
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <InputSkills />


                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="button" onClick={handleSubmit}>
                    Add
                </button>
            </form>
            {experience &&
                experience.map((exp, index) => (
                    <ul key={index}>
                        <li>{exp.title}</li>
                        <li>{exp.company}</li>
                        <li>{formattedDate(exp.Dates)}</li>
                        <li>{exp.description}</li>
                        {exp.skills && exp.skills.map(skill => (
                            <li key={skill.id}>{skill.skill}</li>
                        ))}
                    </ul>
                ))}
        </div>
    );
};

export default InputExperience;
