import AppHeader from "@/components/AppHeader";

const About = () => (
  <div className="min-h-screen bg-background">
    <AppHeader />
    <main className="section-container py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-foreground mb-4">About FirstStep Resume</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          <span className="font-semibold text-foreground">FirstStep Resume</span> is a free, minimalist resume builder designed specifically for first-year university students entering the job market for the first time.
        </p>
        <p>
          We know that writing your first resume can feel overwhelming — especially when you don't have years of experience to fill the page. That's why we focus on what matters: your education, skills, projects, and potential.
        </p>
        <p>
          Our generated resumes follow ATS-friendly formatting guidelines: single-column layout, standard headings, clean fonts, and no decorative elements that might confuse automated screening systems.
        </p>
        <p>
          The AI-powered LinkedIn About generator helps you craft an engaging professional summary that captures your enthusiasm and potential as an early-career professional.
        </p>
        <div className="border-t border-border pt-4 mt-6">
          <p className="text-sm">
            Built with care for students taking their first step into the professional world.
          </p>
        </div>
      </div>
    </main>
  </div>
);

export default About;
