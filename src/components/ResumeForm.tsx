import { useState } from "react";
import type { ResumeData } from "@/types/resume";
import { emptyResumeData } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ResumeFormProps {
  onGenerate: (data: ResumeData) => void;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">{children}</h3>
);

const ResumeForm = ({ onGenerate }: ResumeFormProps) => {
  const [data, setData] = useState<ResumeData>(emptyResumeData);
  const [skillInput, setSkillInput] = useState("");
  const [softSkillInput, setSoftSkillInput] = useState("");
  const [certInput, setCertInput] = useState("");

  const update = <K extends keyof ResumeData>(key: K, val: ResumeData[K]) =>
    setData((prev) => ({ ...prev, [key]: val }));

  const addSkill = (type: "technicalSkills" | "softSkills", input: string, setInput: (v: string) => void) => {
    const trimmed = input.trim();
    if (trimmed && !data[type].includes(trimmed)) {
      update(type, [...data[type], trimmed]);
      setInput("");
    }
  };

  const removeSkill = (type: "technicalSkills" | "softSkills", skill: string) => {
    update(type, data[type].filter((s) => s !== skill));
  };

  const addCert = () => {
    const trimmed = certInput.trim();
    if (trimmed && !data.certifications.includes(trimmed)) {
      update("certifications", [...data.certifications, trimmed]);
      setCertInput("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <section>
        <SectionTitle>Basic Information</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" value={data.basicInfo.name} onChange={(e) => update("basicInfo", { ...data.basicInfo, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@uni.edu" value={data.basicInfo.email} onChange={(e) => update("basicInfo", { ...data.basicInfo, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="+1 234 567 8900" value={data.basicInfo.phone} onChange={(e) => update("basicInfo", { ...data.basicInfo, phone: e.target.value })} />
          </div>
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionTitle>Education</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Label>College / University</Label>
            <Input placeholder="MIT" value={data.education.college} onChange={(e) => update("education", { ...data.education, college: e.target.value })} />
          </div>
          <div>
            <Label>Degree</Label>
            <Input placeholder="B.Tech CS" value={data.education.degree} onChange={(e) => update("education", { ...data.education, degree: e.target.value })} />
          </div>
          <div>
            <Label>Expected Year</Label>
            <Input placeholder="2028" value={data.education.expectedYear} onChange={(e) => update("education", { ...data.education, expectedYear: e.target.value })} />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <SectionTitle>Technical Skills</SectionTitle>
        <div className="flex gap-2 mb-3">
          <Input placeholder="e.g. Python, React, Docker" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill("technicalSkills", skillInput, setSkillInput))} />
          <Button type="button" size="sm" onClick={() => addSkill("technicalSkills", skillInput, setSkillInput)}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.technicalSkills.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {s}
              <button onClick={() => removeSkill("technicalSkills", s)} className="hover:text-destructive"><Trash2 size={12} /></button>
            </span>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Soft Skills</SectionTitle>
        <div className="flex gap-2 mb-3">
          <Input placeholder="e.g. Communication, Leadership" value={softSkillInput} onChange={(e) => setSoftSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill("softSkills", softSkillInput, setSoftSkillInput))} />
          <Button type="button" size="sm" onClick={() => addSkill("softSkills", softSkillInput, setSoftSkillInput)}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.softSkills.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
              {s}
              <button onClick={() => removeSkill("softSkills", s)} className="hover:text-destructive"><Trash2 size={12} /></button>
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <SectionTitle>Projects</SectionTitle>
        {data.projects.map((proj, i) => (
          <div key={i} className="border border-border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-muted-foreground">Project {i + 1}</span>
              {data.projects.length > 1 && (
                <Button variant="ghost" size="sm" onClick={() => update("projects", data.projects.filter((_, j) => j !== i))}>
                  <Trash2 size={14} />
                </Button>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div>
                <Label>Title</Label>
                <Input value={proj.title} onChange={(e) => { const p = [...data.projects]; p[i] = { ...p[i], title: e.target.value }; update("projects", p); }} />
              </div>
              <div>
                <Label>Tech Stack</Label>
                <Input placeholder="React, Node.js" value={proj.techStack} onChange={(e) => { const p = [...data.projects]; p[i] = { ...p[i], techStack: e.target.value }; update("projects", p); }} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Key Accomplishments (2 bullets)</Label>
              {proj.bullets.map((b, bi) => (
                <Input key={bi} placeholder={`Bullet ${bi + 1}`} value={b} onChange={(e) => { const p = [...data.projects]; const bullets = [...p[i].bullets] as [string, string]; bullets[bi] = e.target.value; p[i] = { ...p[i], bullets }; update("projects", p); }} />
              ))}
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => update("projects", [...data.projects, { title: "", techStack: "", bullets: ["", ""] }])}>
          <Plus size={14} className="mr-1" /> Add Project
        </Button>
      </section>

      {/* Experience */}
      <section>
        <SectionTitle>Internships & Volunteering</SectionTitle>
        {data.experience.map((exp, i) => (
          <div key={i} className="border border-border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-muted-foreground">Experience {i + 1}</span>
              {data.experience.length > 1 && (
                <Button variant="ghost" size="sm" onClick={() => update("experience", data.experience.filter((_, j) => j !== i))}>
                  <Trash2 size={14} />
                </Button>
              )}
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <div>
                <Label>Title / Role</Label>
                <Input value={exp.title} onChange={(e) => { const x = [...data.experience]; x[i] = { ...x[i], title: e.target.value }; update("experience", x); }} />
              </div>
              <div>
                <Label>Organization</Label>
                <Input value={exp.organization} onChange={(e) => { const x = [...data.experience]; x[i] = { ...x[i], organization: e.target.value }; update("experience", x); }} />
              </div>
              <div>
                <Label>Duration</Label>
                <Input placeholder="Jun–Aug 2024" value={exp.duration} onChange={(e) => { const x = [...data.experience]; x[i] = { ...x[i], duration: e.target.value }; update("experience", x); }} />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea rows={2} value={exp.description} onChange={(e) => { const x = [...data.experience]; x[i] = { ...x[i], description: e.target.value }; update("experience", x); }} />
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => update("experience", [...data.experience, { title: "", organization: "", duration: "", description: "" }])}>
          <Plus size={14} className="mr-1" /> Add Experience
        </Button>
      </section>

      {/* Clubs */}
      <section>
        <SectionTitle>Club Memberships</SectionTitle>
        {data.clubs.map((club, i) => (
          <div key={i} className="flex gap-3 mb-3 items-end">
            <div className="flex-1">
              <Label>Club Name</Label>
              <Input value={club.name} onChange={(e) => { const c = [...data.clubs]; c[i] = { ...c[i], name: e.target.value }; update("clubs", c); }} />
            </div>
            <div className="flex-1">
              <Label>Role</Label>
              <Input placeholder="Member / Lead" value={club.role} onChange={(e) => { const c = [...data.clubs]; c[i] = { ...c[i], role: e.target.value }; update("clubs", c); }} />
            </div>
            {data.clubs.length > 1 && (
              <Button variant="ghost" size="sm" onClick={() => update("clubs", data.clubs.filter((_, j) => j !== i))}>
                <Trash2 size={14} />
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => update("clubs", [...data.clubs, { name: "", role: "" }])}>
          <Plus size={14} className="mr-1" /> Add Club
        </Button>
      </section>

      {/* Certifications */}
      <section>
        <SectionTitle>Certifications</SectionTitle>
        <div className="flex gap-2 mb-3">
          <Input placeholder="e.g. AWS Cloud Practitioner" value={certInput} onChange={(e) => setCertInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCert())} />
          <Button type="button" size="sm" onClick={addCert}>Add</Button>
        </div>
        <ul className="space-y-1">
          {data.certifications.map((c) => (
            <li key={c} className="flex items-center justify-between text-sm py-1.5 px-3 rounded bg-muted">
              {c}
              <button onClick={() => update("certifications", data.certifications.filter((x) => x !== c))} className="text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
            </li>
          ))}
        </ul>
      </section>

      <Button size="lg" className="w-full" onClick={() => onGenerate(data)}>
        Generate Resume
      </Button>
    </div>
  );
};

export default ResumeForm;
