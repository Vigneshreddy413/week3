import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { templates } from "../../data/defaultResume";
import { useResume } from "../../context/ResumeContext";

export default function TemplateSelector({ compact = false }) {
  const { template, setTemplate } = useResume();

  return (
    <div className={`grid gap-4 ${compact ? "lg:grid-cols-1" : "md:grid-cols-3"}`}>
      {templates.map((item, index) => (
        <motion.button
          key={item.id}
          type="button"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
          onClick={() => setTemplate(item.id)}
          className={`group overflow-hidden rounded-3xl border p-4 text-left transition hover:-translate-y-1 ${
            template === item.id
              ? "border-blue-400 bg-blue-50 shadow-glow dark:border-blue-300 dark:bg-blue-400/10"
              : "border-slate-200 bg-white/70 shadow-glass hover:border-blue-200 dark:border-white/10 dark:bg-white/5"
          }`}
        >
          <div className={`mb-4 h-32 rounded-2xl bg-gradient-to-br ${item.accent} p-3`}>
            <div className="h-full rounded-xl bg-white/90 p-3">
              <div className="mb-3 h-5 w-2/3 rounded bg-slate-900" />
              <div className="space-y-2">
                <div className="h-2 rounded bg-slate-300" />
                <div className="h-2 w-5/6 rounded bg-slate-300" />
                <div className="h-2 w-1/2 rounded bg-slate-300" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-8 rounded bg-slate-200" />
                <div className="h-8 rounded bg-slate-200" />
                <div className="h-8 rounded bg-slate-200" />
              </div>
            </div>
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-black text-slate-950 dark:text-white">{item.name}</h3>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">{item.description}</p>
            </div>
            {template === item.id && <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-600 text-white"><FiCheck /></span>}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
