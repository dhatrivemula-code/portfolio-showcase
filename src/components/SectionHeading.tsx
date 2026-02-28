import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-12"
  >
    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2">{title}</h2>
    <p className="text-muted-foreground">{subtitle}</p>
    <div className="mt-4 h-1 w-12 rounded-full bg-primary" />
  </motion.div>
);

export default SectionHeading;
