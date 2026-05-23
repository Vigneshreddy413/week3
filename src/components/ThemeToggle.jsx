import { FiMoon, FiSun } from "react-icons/fi";
import { useResume } from "../context/ResumeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useResume();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      title="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="soft-button h-11 w-11 px-0"
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
}
