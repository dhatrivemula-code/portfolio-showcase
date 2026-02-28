import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";

const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "[Your University Name]",
    period: "2020 – 2024",
    coursework: ["Data Structures & Algorithms", "Operating Systems", "Database Management", "Machine Learning", "Web Development"],
  },
  {
    degree: "Higher Secondary (XII)",
    institution: "[Your School Name]",
    period: "2018 – 2020",
    coursework: ["Mathematics", "Physics", "Computer Science"],
  },
];

const EducationSection = () => (
  <section id="education" className="py-24 px-6">
    <div className="max-w-4xl mx-auto">
      <SectionHeading title="Education" subtitle="Academic background & coursework" />

      <div className="relative ml-4">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-12">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative pl-8"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background" />

              <div className="card-surface border border-border rounded-xl p-6">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={18} className="text-primary" />
                    <h3 className="font-bold text-foreground">{edu.degree}</h3>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{edu.institution}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((c) => (
                    <span key={c} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EducationSection;
