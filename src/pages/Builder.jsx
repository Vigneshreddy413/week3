import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import ResumeForm from "../components/Forms/ResumeForm";
import ResumePreview from "../components/ResumePreview/ResumePreview";
import CompletionRing from "../components/CompletionRing";
import TemplateSelector from "../components/Templates/TemplateSelector";

export default function Builder() {
  const [active, setActive] = useState("personal");
  return (
    <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)_430px] lg:px-8">
      <Sidebar active={active} onChange={setActive} />
      <section className="min-w-0 space-y-5">
        <div className="glass-panel rounded-3xl p-5">
          <p className="label">Builder</p>
          <h1 className="mt-1 text-3xl font-black text-slate-950 dark:text-white">Edit your resume</h1>
          <div className="mt-4 flex max-w-full gap-2 overflow-x-auto pb-1 lg:hidden">
            {["personal", "summary", "experience", "education", "skills", "projects", "settings"].map((item) => (
              <button key={item} type="button" onClick={() => setActive(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold capitalize ${active === item ? "bg-blue-600 text-white" : "bg-white/70 text-slate-600 dark:bg-white/10 dark:text-slate-300"}`}>{item}</button>
            ))}
          </div>
        </div>
        {active === "settings" && <TemplateSelector compact />}
        <ResumeForm active={active} />
      </section>
      <aside className="hidden space-y-5 lg:sticky lg:top-24 lg:block lg:h-fit">
        <CompletionRing />
        <div className="glass-panel overflow-hidden rounded-3xl p-3">
          <div className="w-[794px] origin-top scale-[0.52]">
            <ResumePreview />
          </div>
        </div>
      </aside>
    </motion.main>
  );
}
