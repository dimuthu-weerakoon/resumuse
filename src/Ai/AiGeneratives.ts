import { GoogleGenerativeAI } from "@google/generative-ai";

import { Experience } from "../types/Experience";
import Skill from "../types/Skill";
import { isCancel } from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAiSummery = async (experience: Experience[]) => {
  const jobRoles = experience.flatMap((exp) => exp.title).join(", ");

  const yearOfExperience = experience
    .flatMap((exp) => exp.dates.startDate)
    .join(", ");

  const skills = experience
    .flatMap((exp) => exp.skills)
    .map((skill) => skill.skill)
    .join(", ");

  const prompt = `Generate a job-winning interactive resume summary correctly using these experiences details:
  - worked job roles ${jobRoles}
  - Analyze years of experience by start dates of each work companies: ${yearOfExperience}
    - Highlight improved skills: ${skills}`;

  try {
    const res = await model.generateContent(prompt);
    return res.response.text();
  } catch (err) {
    console.error(err);
  }
};

export const generateSkills = async (jobrole: string, input: string) => {
  const prompt = `Suggest relevant skills for the job role "${jobrole}" that start with or include the letter/word "${input}". 
  Provide a concise list of skills in a comma-separated format. 
  Focus on skills directly related to the job role and the provided input. 
  Do not return any output if "${input}" is not related to the job role "${jobrole}".`;

  try {
    const res = await model.generateContent(prompt);
    const outputText: string = res.response.text();

    const skills: Skill[] = outputText
      .split(",")
      .map((skill) => ({ skill: skill.trim() }));
    return skills;
  } catch (err) {
    console.error.apply(err);
    return [];
  }
};

export const suggestJobRole = async (input: string) => {
  

  const prompt = `Suggest relevant job positions that start with or include the letter/word "${input}". 
    Provide a concise list of job positions in a comma-separated format. 
    Do not return anything when "${input}" is empty.
    `;
  try {

    if (input.trim() !== "") {
      const res = await model.generateContent(prompt);

    const output = res.response.text();

    const suggestedRole: string[] = output.split(",");
    return suggestedRole;
    }else{
      return []
    }
    
  } catch (err) {
    console.error.apply(err);
    return [];
  }
};

export const generateQualifications = async (input: string) => {
  

  const prompt = `Suggest relevant education or professional qualifications or certifications that start with or include the letter/word "${input}". 
    Provide a concise list of qualifications in a comma-separated format. 
   deeply analyze what is trying to enter in ${input}
    Do not return anything when "${input}" is empty.`;

  try {
    if (input.trim() !== "") {
      const res = await model.generateContent(prompt);
      const outputText: string = res.response.text();
  
      const qualifications: string[] = outputText
        .split(",")
        .map((qualification) => qualification.trim());
      return qualifications;
    }else{
      return[]
    }
  
  } catch (err) {
    console.error("Error generating qualifications:", err);
    return [];
  }
};


