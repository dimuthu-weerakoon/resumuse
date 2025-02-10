import { GoogleGenerativeAI } from "@google/generative-ai";

import { Experience } from "../types/Experience";
import Skill from "../types/Skill";
// import gemini api key
const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
// google generative Ai SDK
const genAI = new GoogleGenerativeAI(apiKey);
// define model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// function to generate summery pass experince array as parameter
export const generateAiSummery = async (experience: Experience[]) => {
  //extract job titles from every experice and joining them
  const jobRoles = experience.flatMap((exp) => exp.title).join(", ");
  // extract starting year from every experice and joining them
  const yearOfExperience = experience
    .flatMap((exp) => exp.dates.startDate)
    .join(", ");
  //extract skills improved from every experinces an d joing them
  const skills = experience
    .flatMap((exp) => exp.skills)
    .map((skill) => skill?.skill)
    .join(", ");

  //prompt for generate summery from extracted job titles, skills , years  of experience
  const prompt = `Generate a job-winning interactive professional resume summary correctly using these experiences details:
  - worked job roles ${jobRoles}
  - Analyze years of experience by start dates of each work companies: ${yearOfExperience}
    - Highlight improved skills: ${skills}`;

  try {
    //generate  content from prompt
    const res = await model.generateContent(prompt);
    // return response as text string
    return res.response.text();
  } catch (err) {
    //catch if error
    console.error(err);
  }
};
// function to generate skills suggestions
// pass jobrole (title) and  user input as parameters
export const generateSkills = async (jobrole: string, input: string) => {
  // prompt for generate suggestion of skills when input some text and its to related job titles.
  const prompt = `Suggest relevant skills for the job role "${jobrole}" that start with or include the letter/word "${input}". 
  Provide a concise list of skills in a comma-separated format. 
  Focus on skills directly related to the job role and the provided input. 
  Do not return any output if "${input}" is not related to the job role "${jobrole}".`;

  try {
    //generate  content from prompt
    const res = await model.generateContent(prompt);
    // return response as text string
    const outputText: string = res.response.text();
    // split output text and return then as Skill array
    const skills: Skill[] = outputText
      .split(",")
      .map((skill) => ({ skill: skill.trim() }));
    return skills;
  } catch (err) {
    //if error catch show in console
    console.error(err);
    // if error return empty array
    return [];
  }
};

//function for suggest job roles
//pass user input as parameter
export const suggestJobRole = async (input: string) => {
  // prompt for generate suggestions of  jobs titles match to user input
  const prompt = `Suggest relevant job positions that start with or include the letter/word "${input}". 
    Provide a concise list of job positions in a comma-separated format. 
    Do not return anything when "${input}" is empty.
    `;
  try {
    // if trimmed input not empty
    if (input.trim() !== "") {
      // call function to generate
      const res = await model.generateContent(prompt);
      //results as string
      const output = res.response.text();
      // split suggested text to array
      const suggestedRole: string[] = output.split(",");
      // return array of suggestions
      return suggestedRole;
    } else {
      //if empty return empty array
      return [];
    }
  } catch (err) {
    // show err in console
    console.log(err);
    // return empty array
    return [];
  }
};

// function to generate educational qualifiications
// pass user input as parameters
export const generateQualifications = async (input: string) => {
  // prompt for generate education qualification related to user input
  const prompt = `Suggest relevant education or professional qualifications or certifications that start with or include the letter/word "${input}". 
    Provide a concise list of qualifications in a comma-separated format. 
   deeply analyze what is trying to enter in ${input}
    Do not return anything when "${input}" is empty.`;

  try {
    //if trimmed user input not empty
    if (input.trim() !== "") {
      // call function to make request to model to generate result using prompt
      const res = await model.generateContent(prompt);
      // output result as text
      const outputText: string = res.response.text();
      // split qualifications to array and return them
      const qualifications: string[] = outputText
        .split(",")
        .map((qualification) => qualification.trim());
      return qualifications;
    } else {
      //else return empty array
      return [];
    }
  } catch (err) {
    // if error show in console
    console.error("Error generating qualifications:", err);
    // return empty array
    return [];
  }
};
