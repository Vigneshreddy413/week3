import { motion } from "framer-motion";
import { FiRotateCcw } from "react-icons/fi";
import { defaultResume } from "../data/defaultResume";
import { useResume } from "../context/ResumeContext";

export default function Settings() {
  const { setResume, setTemplate, theme, setTheme } = useResume();
  const reset = () => {
    setResume(defaultResume);
    setTemplate("modern");
  };

  return (
    <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-3xl p-6">
        <p className="label">Settings</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">Workspace preferences</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="soft-button justify-between rounded-2xl p-5">
            Theme mode <span className="capitalize">{theme}</span>
          </button>
          <button type="button" onClick={reset} className="soft-button justify-between rounded-2xl p-5 text-rose-600 dark:text-rose-300">
            Reset demo data <FiRotateCcw />
          </button>
        </div>
      </section>
    </motion.main>
  );
}
