import { JSX } from "react";
import { FaReact, FaNodeJs, FaDocker, FaAws, FaBootstrap } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiExpress, SiPython, SiJavascript, SiRedux, SiOracle, SiAwslambda, SiZod, SiKubernetes, SiRider, SiSwagger, SiJira, SiTrello, SiPostman, SiReacthookform, SiReactrouter, SiReactquery, SiDotnet } from 'react-icons/si';
import { ISkill } from "../types";
import {  DiGit, DiJqueryLogo, DiMsqlServer, DiMysql, DiVisualstudio } from "react-icons/di";
import { TbBrandCSharp, TbBrandLinqpad, TbServer2, TbSql } from "react-icons/tb";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { BiLogoVisualStudio } from "react-icons/bi";
import SkillIcon from "../components/shared/SkillIcon";

// Define a mapping for skill attributes
const skillAttributes: Record<string, { icon: JSX.Element; color: string }> = {
    "React": { icon: <SkillIcon Icon={FaReact} />, color: "#61DAFB" },
    "TypeScript": { icon: <SkillIcon Icon={SiTypescript} />, color: "#3178C6" },
    "JavaScript": { icon: <SkillIcon Icon={SiJavascript} />, color: "#F7DF1E" },
    ".NET Core": { icon: <SkillIcon Icon={SiDotnet } />, color: "#512BD4" },
    "ASP.NET Core": { icon: <SkillIcon Icon={SiDotnet} />, color: "#000000" },
    "MVC": { icon: <SkillIcon Icon={SiDotnet} />, color: "#000000" },
    "Web API": { icon: <SkillIcon Icon={SiDotnet} />, color: "#000000" },
    "Razor Pages": { icon: <SkillIcon Icon={SiDotnet} />, color: "#000000" },
    "Identity Server": { icon: <SkillIcon Icon={TbServer2 } />, color: "#000000" },
    "React Query": { icon: <SkillIcon Icon={SiReactquery} />, color: "#000000" },
    "React Router": { icon: <SkillIcon Icon={SiReactrouter} />, color: "#000000" },
    "React Hook Form": { icon: <SkillIcon Icon={SiReacthookform} size={20} />, color: "#000000" },
    "Entity Framework Core": { icon: <SkillIcon Icon={SiNextdotjs} />, color: "#000000" },
    "Dapper": { icon: <SkillIcon Icon={SiNextdotjs} />, color: "#000000" },
    "LINQ": { icon: <SkillIcon Icon={TbBrandLinqpad} />, color: "#000000" },
    "Next.js": { icon: <SkillIcon Icon={SiNextdotjs} />, color: "#000000" },
    "Tailwind CSS": { icon: <SkillIcon Icon={SiTailwindcss} />, color: "#06B6D4" },
    "Framer Motion": { icon: <SkillIcon Icon={FaReact} />, color: "#0055FF" },
    "JQuery": { icon: <SkillIcon Icon={DiJqueryLogo} />, color: "#000000" },
    "Node.js": { icon: <SkillIcon Icon={FaNodeJs} />, color: "#339933" },
    "Express": { icon: <SkillIcon Icon={SiExpress} />, color: "#000000" },
    "Python": { icon: <SkillIcon Icon={SiPython} />, color: "#3776AB" },
    "MongoDB": { icon: <SkillIcon Icon={SiMongodb} />, color: "#47A248" },
    "PostgreSQL": { icon: <SkillIcon Icon={SiPostgresql} />, color: "#4169E1" },
    "Docker": { icon: <SkillIcon Icon={FaDocker} />, color: "#2496ED" },
    "AWS": { icon: <SkillIcon Icon={FaAws} />, color: "#FF9900" },
    "C#": { icon: <SkillIcon Icon={TbBrandCSharp } />, color: "#239120" },
    "SQL": { icon: <SkillIcon Icon={TbSql } />, color: "#FF6B6B" },
    "Git": { icon: <SkillIcon Icon={DiGit} />, color: "#F05032" },
    "Redux": { icon: <SkillIcon Icon={SiRedux} />, color: "#181717" },
    "Redux Toolkit": { icon: <SkillIcon Icon={SiRedux} />, color: "#181717" },
    "Bootstrap": { icon: <SkillIcon Icon={FaBootstrap} />, color: "#563D7C" },
    "Oracle DB": { icon: <SkillIcon Icon={SiOracle} />, color: "#563D7C" },
    "SQL Server": { icon: <SkillIcon Icon={DiMsqlServer} />, color: "#563D7C" },
    "MySQL": { icon: <SkillIcon Icon={DiMysql} />, color: "#563D7C" },
    "T-SQL": { icon: <SkillIcon Icon={TbSql} />, color: "#47A248" },
    "PL/SQL": { icon: <SkillIcon Icon={TbSql } />, color: "#47A248" },
    "S3": { icon: <SkillIcon Icon={FaAws} />, color: "#FF9900" },
    "Lambda": { icon: <SkillIcon Icon={SiAwslambda} size={20} />, color: "#FF9900" },
    "EC2": { icon: <SkillIcon Icon={FaAws} />, color: "#FF9900" },
    "CloudWatch": { icon: <SkillIcon Icon={FaAws} />, color: "#FF9900" },
    "SNS": { icon: <SkillIcon Icon={FaAws} />, color: "#FF9900" },
    "SQS": { icon: <SkillIcon Icon={FaAws} />, color: "#FF9900" },
    "Azure": { icon: <SkillIcon Icon={VscAzure} />, color: "#FF9900" },
    "Azure DevOps": { icon: <SkillIcon Icon={VscAzureDevops} />, color: "#FF9900" },
    "Zod": { icon: <SkillIcon Icon={SiZod} />, color: "#FF9900" },
    "Kubernetes": { icon: <SkillIcon Icon={SiKubernetes} />, color: "#FF9900" },
    "Visual Studio 2022": { icon: <SkillIcon Icon={DiVisualstudio} />, color: "#FF9900" },
    "VS Code": { icon: <SkillIcon Icon={BiLogoVisualStudio} />, color: "#FF9900" },
    "Jetbrains Rider": { icon: <SkillIcon Icon={SiRider} size={20} />, color: "#FF9900" },
    "Swagger": { icon: <SkillIcon Icon={SiSwagger} />, color: "#FF9900" },
    "Jira": { icon: <SkillIcon Icon={SiJira} />, color: "#FF9900" },
    "Trello": { icon: <SkillIcon Icon={SiTrello} />, color: "#FF9900" },
    "Postman": { icon: <SkillIcon Icon={SiPostman} />, color: "#FF9900" },

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