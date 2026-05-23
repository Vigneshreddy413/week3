import { motion } from "framer-motion";
import { useResume } from "../context/ResumeContext";

export default function CompletionRing() {
  const { completion, autosavedAt } = useResume();

  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="label">Completion</p>
          <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">{completion}%</p>
          <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">Autosaved {autosavedAt || "now"}</p>
        </div>
        <div className="relative h-16 w-16 rounded-full bg-slate-100 dark:bg-white/10">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
            style={{ clipPath: `polygon(50% 50%, 50% 0, ${completion}% 0, 100% 100%, 0 100%, 0 0)` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-2 grid place-items-center rounded-full bg-white text-sm font-black text-slate-900 dark:bg-slate-950 dark:text-white">
            {completion}
          </div>
        </div>
      </div>
      <div className="mt-5 h-2 rounded-full bg-slate-100 dark:bg-white/10">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600"
          initial={{ width: 0 }}
          animate={{ width: `${completion}%` }}
        />
      </div>
    </div>
  );
}
