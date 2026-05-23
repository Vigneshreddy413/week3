import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiLink } from "react-icons/fi";
import ResumePreview from "../components/ResumePreview/ResumePreview";
import { useResume } from "../context/ResumeContext";
import { downloadResumePdf } from "../utils/pdf";

export default function Preview() {
  const ref = useRef(null);
  const { resume } = useResume();
  const [busy, setBusy] = useState(false);

  const download = async () => {
    if (!ref.current) return;
    setBusy(true);
    await downloadResumePdf(ref.current, `${resume.personal.fullName || "resume"}.pdf`);
    setBusy(false);
  };

  const share = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 glass-panel rounded-3xl p-5 sm:flex-row sm:items-center">
        <div>
          <p className="label">Live Preview</p>
          <h1 className="mt-1 text-3xl font-black text-slate-950 dark:text-white">Download your finished resume</h1>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={share} className="soft-button"><FiLink /> Share link</button>
          <button type="button" onClick={download} className="gradient-button" disabled={busy}><FiDownload /> {busy ? "Exporting..." : "Download PDF"}</button>
        </div>
      </div>
      <div className="overflow-auto rounded-3xl bg-slate-900/10 p-4 dark:bg-black/30">
        <ResumePreview ref={ref} />
      </div>
    </motion.main>
  );
}
