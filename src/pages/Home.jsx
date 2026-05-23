import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload, FiEdit3, FiLayers, FiShield } from "react-icons/fi";
import ResumePreview from "../components/ResumePreview/ResumePreview";
import CompletionRing from "../components/CompletionRing";

export default function Home() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid min-h-[calc(100vh-96px)] items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-5 inline-flex rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-bold text-blue-700 shadow-glass dark:border-blue-300/20 dark:bg-white/10 dark:text-blue-200">
            Premium live resume studio
          </motion.div>
          <motion.h1 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.06 }} className="max-w-4xl text-4xl font-black leading-[1.05] tracking-normal text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            Build a recruiter-ready resume that feels impossibly polished.
          </motion.h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600 dark:text-slate-300">
            Craft your profile, reorder sections, switch templates, upload a photo, and export a print-ready PDF from one smooth glassmorphic workspace.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/builder" className="gradient-button">Start building <FiArrowRight /></Link>
            <Link to="/templates" className="soft-button">Explore templates</Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["3", "Premium templates"],
              ["100%", "Local autosave"],
              ["PDF", "Print-ready export"],
            ].map(([value, label]) => (
              <div key={label} className="glass-panel rounded-3xl p-5">
                <p className="text-3xl font-black text-slate-950 dark:text-white">{value}</p>
                <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden space-y-5 lg:block">
          <CompletionRing />
          <motion.div initial={{ y: 24, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 p-3 shadow-glow backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
            <div className="w-[794px] origin-top scale-[0.72] xl:scale-[0.82]">
              <ResumePreview />
            </div>
          </motion.div>
        </div>
      </section>
      <section className="grid gap-4 pb-12 md:grid-cols-4">
        {[
          [FiEdit3, "Dynamic editor", "Validated forms and instant preview updates."],
          [FiLayers, "Template switching", "Modern, minimal, and creative layouts."],
          [FiDownload, "PDF export", "High-resolution download via html2pdf.js."],
          [FiShield, "Private storage", "Your data stays in LocalStorage."],
        ].map(([Icon, title, text]) => (
          <div key={title} className="glass-panel rounded-3xl p-6">
            <Icon className="text-2xl text-blue-600 dark:text-blue-300" />
            <h3 className="mt-4 font-black text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">{text}</p>
          </div>
        ))}
      </section>
    </motion.main>
  );
}
