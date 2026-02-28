export interface ResumeData {
  basicInfo: {
    name: string;
    email: string;
    phone: string;
  };
  education: {
    college: string;
    degree: string;
    expectedYear: string;
  };
  technicalSkills: string[];
  softSkills: string[];
  projects: {
    title: string;
    techStack: string;
    bullets: [string, string];
  }[];
  experience: {
    title: string;
    organization: string;
    duration: string;
    description: string;
  }[];
  clubs: {
    name: string;
    role: string;
  }[];
  certifications: string[];
}

export const emptyResumeData: ResumeData = {
  basicInfo: { name: "", email: "", phone: "" },
  education: { college: "", degree: "", expectedYear: "" },
  technicalSkills: [],
  softSkills: [],
  projects: [{ title: "", techStack: "", bullets: ["", ""] }],
  experience: [{ title: "", organization: "", duration: "", description: "" }],
  clubs: [{ name: "", role: "" }],
  certifications: [],
};
