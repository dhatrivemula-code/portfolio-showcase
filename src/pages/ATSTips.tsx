import AppHeader from "@/components/AppHeader";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const tips = [
  { icon: <CheckCircle size={18} className="text-primary" />, title: "Use standard section headings", desc: 'Stick with "Education," "Experience," "Skills," and "Projects." ATS systems scan for these exact words.' },
  { icon: <CheckCircle size={18} className="text-primary" />, title: "Use a single-column layout", desc: "Multi-column and table-based layouts confuse most ATS parsers. Keep it simple and linear." },
  { icon: <CheckCircle size={18} className="text-primary" />, title: "Include relevant keywords", desc: "Mirror the job description's language. If they say 'Python,' write 'Python' — not 'snake-based scripting.'" },
  { icon: <CheckCircle size={18} className="text-primary" />, title: "Use a clean, common font", desc: "Arial, Helvetica, Calibri, or Times New Roman. These are universally parsed correctly." },
  { icon: <XCircle size={18} className="text-destructive" />, title: "Avoid images and graphics", desc: "Logos, headshots, icons, and decorative bars are invisible to ATS scanners." },
  { icon: <XCircle size={18} className="text-destructive" />, title: "Don't use headers/footers", desc: "Many ATS systems cannot read content placed in document headers or footers." },
  { icon: <AlertTriangle size={18} className="text-muted-foreground" />, title: "Save as PDF (usually)", desc: "PDF preserves formatting. Some older ATS prefer .docx — when in doubt, check the job posting." },
  { icon: <AlertTriangle size={18} className="text-muted-foreground" />, title: "Keep it to one page", desc: "As a fresher, one page is the standard. Quality over quantity — every line should earn its place." },
];

const ATSTips = () => (
  <div className="min-h-screen bg-background">
    <AppHeader />
    <main className="section-container py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">ATS Tips</h1>
      <p className="text-muted-foreground mb-8">Make sure your resume passes Applicant Tracking Systems.</p>

      <div className="space-y-4">
        {tips.map((tip, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="mt-0.5 shrink-0">{tip.icon}</div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{tip.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
);

export default ATSTips;
