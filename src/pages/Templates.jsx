import { motion } from "framer-motion";
import TemplateSelector from "../components/Templates/TemplateSelector";

export default function Templates() {
  return (
    <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="label">Templates</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">Choose your professional look</h1>
        <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600 dark:text-slate-300">Switch instantly between polished resume designs. Your data stays in place while the presentation changes.</p>
      </div>
      <TemplateSelector />
    </motion.main>
  );
}
