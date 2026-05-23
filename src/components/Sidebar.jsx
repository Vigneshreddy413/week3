import { FiAward, FiBriefcase, FiCode, FiGrid, FiLayers, FiSettings, FiUser } from "react-icons/fi";

const items = [
  ["Personal", "personal", FiUser],
  ["Summary", "summary", FiLayers],
  ["Experience", "experience", FiBriefcase],
  ["Education", "education", FiAward],
  ["Skills", "skills", FiGrid],
  ["Projects", "projects", FiCode],
  ["Settings", "settings", FiSettings],
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="glass-panel sticky top-24 hidden h-fit rounded-3xl p-3 lg:block">
      <div className="space-y-1">
        {items.map(([label, id, Icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
              active === id
                ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-glow"
                : "text-slate-600 hover:bg-white/80 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
          >
            <Icon /> {label}
          </button>
        ))}
      </div>
    </aside>
  );
}
