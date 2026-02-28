import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import LinkedInGenerator from "@/components/LinkedInGenerator";
import type { ResumeData } from "@/types/resume";

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="section-container py-10">
        {!resumeData ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Build Your Resume</h1>
              <p className="text-muted-foreground mt-1">Fill in your details to generate an ATS-friendly resume in seconds.</p>
            </div>
            <ResumeForm onGenerate={setResumeData} />
          </>
        ) : (
          <>
            <button
              onClick={() => setResumeData(null)}
              className="text-sm text-primary hover:underline mb-6 inline-block"
            >
              ← Back to Editor
            </button>
            <ResumePreview data={resumeData} />
            <LinkedInGenerator data={resumeData} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
