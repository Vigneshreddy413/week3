import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FiDownload, FiFileText } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["Home", "/"],
  ["Builder", "/builder"],
  ["Templates", "/templates"],
  ["Preview", "/preview"],
  ["Settings", "/settings"],
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-glow">
            <FiFileText />
          </span>
          <span>
            <span className="block text-base font-black text-slate-950 dark:text-white">ResumeForge</span>
            <span className="hidden text-xs font-semibold text-slate-500 dark:text-slate-400 sm:block">AI-era resume studio</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 rounded-2xl border border-slate-200 bg-white/70 p-1 dark:border-white/10 dark:bg-white/5 md:flex">
          {links.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/preview" className="gradient-button hidden sm:inline-flex">
            <FiDownload /> Export
          </NavLink>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
