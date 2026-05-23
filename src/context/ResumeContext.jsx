import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultResume } from "../data/defaultResume";
import { loadState, saveState } from "../utils/storage";

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const saved = loadState();
  const [resume, setResume] = useState(saved?.resume || defaultResume);
  const [template, setTemplate] = useState(saved?.template || "modern");
  const [theme, setTheme] = useState(saved?.theme || "light");
  const [autosavedAt, setAutosavedAt] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    saveState({ resume, template, theme });
    setAutosavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, [resume, template, theme]);

  const completion = useMemo(() => {
    const checks = [
      resume.personal.fullName,
      resume.personal.email,
      resume.personal.phone,
      resume.summary,
      resume.education.length,
      resume.experience.length,
      resume.skills.length,
      resume.projects.length,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [resume]);

  const value = {
    resume,
    setResume,
    template,
    setTemplate,
    theme,
    setTheme,
    autosavedAt,
    completion,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used inside ResumeProvider");
  return context;
}
