import type { ResumeData } from "@/types/resume";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { basicInfo, education, technicalSkills, softSkills, projects, experience, clubs, certifications } = data;

  const hasProjects = projects.some((p) => p.title);
  const hasExperience = experience.some((e) => e.title);
  const hasClubs = clubs.some((c) => c.name);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 no-print">
        <h2 className="text-lg font-semibold text-foreground">Resume Preview</h2>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Download size={14} className="mr-1" /> Download as PDF
        </Button>
      </div>

      <div className="resume-preview border border-border rounded-lg p-8 bg-background" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        {/* Header */}
        <div className="text-center mb-4 border-b border-border pb-4">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{basicInfo.name || "Your Name"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {[basicInfo.email, basicInfo.phone].filter(Boolean).join(" | ")}
          </p>
        </div>

        {/* Education */}
        {education.college && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-1 mb-2">Education</h2>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-semibold text-foreground">{education.degree}</p>
                <p className="text-muted-foreground">{education.college}</p>
              </div>
              <p className="text-muted-foreground text-right">Expected {education.expectedYear}</p>
            </div>
          </div>
        )}

        {/* Skills */}
        {(technicalSkills.length > 0 || softSkills.length > 0) && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-1 mb-2">Skills</h2>
            {technicalSkills.length > 0 && (
              <p className="text-sm"><span className="font-semibold text-foreground">Technical:</span> <span className="text-muted-foreground">{technicalSkills.join(", ")}</span></p>
            )}
            {softSkills.length > 0 && (
              <p className="text-sm mt-1"><span className="font-semibold text-foreground">Soft Skills:</span> <span className="text-muted-foreground">{softSkills.join(", ")}</span></p>
            )}
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-1 mb-2">Projects</h2>
            {projects.filter((p) => p.title).map((proj, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-sm">
                  <p className="font-semibold text-foreground">{proj.title}</p>
                  {proj.techStack && <p className="text-muted-foreground italic">{proj.techStack}</p>}
                </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                  {proj.bullets.filter(Boolean).map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {hasExperience && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-1 mb-2">Experience</h2>
            {experience.filter((e) => e.title).map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-sm">
                  <p className="font-semibold text-foreground">{exp.title} — <span className="font-normal text-muted-foreground">{exp.organization}</span></p>
                  <p className="text-muted-foreground">{exp.duration}</p>
                </div>
                {exp.description && <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Clubs */}
        {hasClubs && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-1 mb-2">Leadership & Activities</h2>
            {clubs.filter((c) => c.name).map((club, i) => (
              <p key={i} className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{club.role}</span> — {club.name}
              </p>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-1 mb-2">Certifications</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {certifications.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
