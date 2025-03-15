import { JSX } from "react";
import { FaReact, FaNodeJs, FaDatabase, FaFigma, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiExpress, SiPython, SiJavascript } from 'react-icons/si';
import { ISkill } from "../types";

// Define a mapping for skill attributes
const skillAttributes: Record<string, { icon: JSX.Element; color: string }> = {
    "React": { icon: <FaReact />, color: "#61DAFB" },
    "TypeScript": { icon: <SiTypescript />, color: "#3178C6" },
    "JavaScript": { icon: <SiJavascript />, color: "#F7DF1E" },
    "Next.js": { icon: <SiNextdotjs />, color: "#000000" },
    "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
    "Framer Motion": { icon: <FaReact />, color: "#0055FF" }
};

// Function to group skills and assign attributes
export const groupSkillsByType = (skills: ISkill[]): Record<string, ISkill[]> => {
    return skills.reduce((acc, skill) => {
        if (!acc[skill.type]) {
            acc[skill.type] = [];
        }

        // Assign icon and color if available
        const attributes = skillAttributes[skill.title] || { icon: undefined, color: "#CCCCCC" };

        acc[skill.type].push({
            ...skill,
            icon: attributes.icon,
            color: attributes.color
        });

        return acc;
    }, {} as Record<string, ISkill[]>);
}