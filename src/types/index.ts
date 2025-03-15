import { JSX, ReactNode } from "react"
import { IconType } from "react-icons/lib"

interface ICVDataInterface {
    personalInfo: IPersonalInfo
    carrierJourney: ICareerJourney
    projects: Array<IProject>
    skills: Array<ISkill>
}

interface IPersonalInfo {
    name: string
    title: string
    email: string
    phone: string
    location: string
    bio: string
    socialLinks: {
        github: string
        linkedin: string
    }
}
interface ICareerJourney {
    workExperiences: Array<IWorkExperience>
    certifications: Array<ICertifications>
    education: Array<IEducation>
}

interface IWorkExperience {
    isCurrent?: boolean | null
    companyName: string
    from: number
    to?: number | null
    title: string
    description: string | ReactNode
    technologies?: string[]
}

interface ICertifications {
    year: number
    title: string
    issuer: string
    description: string | ReactNode
    credentialUrl?: string
}

interface IEducation {
    year: number
    title: string
    instituteName: string
    description: string | ReactNode
    isCompleted: boolean
}

interface IProject {
    tags: Array<string>
    githubLink?: string
    title: string
    description: string | ReactNode
    technologies?: string[]
    links: {
        github?: string
        live?: string
    }
    featured?: boolean
}

interface ISkill {
    title: string
    description?: string
    icon?: JSX.Element; 
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    type: 'frontend' | 'backend' | 'database' | 'cloud' | 'ide'  | 'others'
    color: string
    isMainSkill: boolean
    projects?: Array<IProject>
}

export type { ICVDataInterface, ICareerJourney, IWorkExperience, ICertifications, IEducation, IProject, ISkill, IPersonalInfo }