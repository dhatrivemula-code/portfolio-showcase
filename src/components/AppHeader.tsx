import { Link, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";

const links = [
  { to: "/", label: "Builder" },
  { to: "/tips", label: "ATS Tips" },
  { to: "/about", label: "About" },
];

const AppHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="section-container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
          <FileText size={20} className="text-primary" />
          FirstStep Resume
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pathname === l.to
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
