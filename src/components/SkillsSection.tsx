import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "C++", "SQL"],
  },
  {
    title: "Frameworks",
    skills: ["React", "Flask", "Node.js", "Express", "Spring Boot", "Tailwind CSS"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "Docker", "AWS", "Linux", "PostgreSQL", "MongoDB", "VS Code", "Figma"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="py-24 px-6 bg-card/30">
    <div className="max-w-4xl mx-auto">
      <SectionHeading title="Technical Skills" subtitle="Technologies I work with" />

      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-surface border border-border rounded-xl p-6"
          >
            <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-4">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
