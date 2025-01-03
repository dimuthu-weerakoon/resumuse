import { GoogleGenerativeAI } from "@google/generative-ai";

import { Experience } from "../types/Experience";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAiSummery = async (experience:Experience[]) => {

  const yearOfExperience = experience
    .flatMap((exp) => exp.dates.startDate)
    .join(", ");

  const skills = experience
    .flatMap((exp) => exp.skills)
    .map((skill) => skill.skill)
    .join(", ");

  const prompt = `Generate a job-winning interactive resume summary correctly using these experiences details:
    - Analyze years of experience by start dtaes: ${yearOfExperience}
    - Highlight improved skills: ${skills}`;

  try {
    const res = await model.generateContent(prompt);
    return res.response.text();
  } catch (err) {
    console.error(err);
  }
};
