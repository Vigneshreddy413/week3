import { forwardRef } from "react";
import { FiGlobe, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useResume } from "../../context/ResumeContext";

const ResumePreview = forwardRef(function ResumePreview(_, ref) {
  const { resume, template } = useResume();
  const Wrapper = template === "minimal" ? MinimalTemplate : template === "creative" ? CreativeTemplate : ModernTemplate;
  return <Wrapper resume={resume} ref={ref} />;
});

export default ResumePreview;

const Contact = ({ resume, light = false }) => {
  const cls = light ? "text-white/85" : "text-slate-600";
  const items = [
    [FiMail, resume.personal.email],
    [FiPhone, resume.personal.phone],
    [FiMapPin, resume.personal.address],
    [FiLinkedin, resume.personal.linkedin],
    [FiGlobe, resume.personal.portfolio],
  ];
  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold ${cls}`}>
      {items.filter(([, value]) => value).map(([Icon, value]) => (
        <span key={value} className="inline-flex items-center gap-1.5"><Icon /> {value}</span>
      ))}
    </div>
  );
};

const Section = ({ title, children, className = "" }) => (
  <section className={className}>
    <h3 className="mb-2 border-b border-slate-200 pb-1 text-[12px] font-black uppercase tracking-[0.18em] text-slate-900">{title}</h3>
    {children}
  </section>
);

const SectionContent = ({ resume, name }) => {
  if (name === "experience") return resume.experience.map((item) => <Entry key={item.id} title={item.role} meta={`${item.company} | ${item.duration}`} text={item.description} />);
  if (name === "education") return resume.education.map((item) => <Entry key={item.id} title={item.degree} meta={`${item.school} | ${item.startYear} - ${item.endYear}`} />);
  if (name === "projects") return resume.projects.map((item) => <Entry key={item.id} title={item.title} meta={item.tech} text={item.description} />);
  if (name === "certifications") return resume.certifications.map((item) => <Entry key={item.id} title={item.name} meta={item.organization} />);
  if (name === "skills") return <div className="flex flex-wrap gap-2">{resume.skills.filter((s) => s.name).map((s) => <span key={s.id} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">{s.name}</span>)}</div>;
  return null;
};

const Entry = ({ title, meta, text }) => (
  <div className="mb-3 break-inside-avoid">
    <div className="flex items-start justify-between gap-3">
      <h4 className="text-sm font-black text-slate-950">{title}</h4>
      {meta && <p className="text-right text-[11px] font-bold text-slate-500">{meta}</p>}
    </div>
    {text && <p className="mt-1 text-[12px] leading-5 text-slate-600">{text}</p>}
  </div>
);

const ModernTemplate = forwardRef(function ModernTemplate({ resume }, ref) {
  return (
    <article ref={ref} className="mx-auto min-h-[1122px] w-full max-w-[794px] bg-white p-10 text-slate-900 shadow-2xl">
      <header className="flex gap-5 border-b-4 border-blue-600 pb-6">
        <Photo resume={resume} />
        <div className="min-w-0 flex-1">
          <h1 className="text-4xl font-black tracking-normal text-slate-950">{resume.personal.fullName}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{resume.summary}</p>
          <div className="mt-4"><Contact resume={resume} /></div>
        </div>
      </header>
      <main className="mt-7 space-y-5">
        {resume.sectionOrder.map((name) => <Section title={name} key={name}><SectionContent resume={resume} name={name} /></Section>)}
      </main>
    </article>
  );
});

const MinimalTemplate = forwardRef(function MinimalTemplate({ resume }, ref) {
  return (
    <article ref={ref} className="mx-auto min-h-[1122px] w-full max-w-[794px] bg-white p-12 text-slate-900 shadow-2xl">
      <header className="text-center">
        <h1 className="text-4xl font-black uppercase tracking-normal">{resume.personal.fullName}</h1>
        <div className="mt-4 flex justify-center"><Contact resume={resume} /></div>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-slate-600">{resume.summary}</p>
      </header>
      <main className="mt-9 grid grid-cols-[1fr_2fr] gap-8">
        <div className="space-y-5">
          <Section title="Skills"><SectionContent resume={resume} name="skills" /></Section>
          <Section title="Education"><SectionContent resume={resume} name="education" /></Section>
        </div>
        <div className="space-y-5">
          {["experience", "projects", "certifications"].map((name) => <Section title={name} key={name}><SectionContent resume={resume} name={name} /></Section>)}
        </div>
      </main>
    </article>
  );
});

const CreativeTemplate = forwardRef(function CreativeTemplate({ resume }, ref) {
  return (
    <article ref={ref} className="mx-auto min-h-[1122px] w-full max-w-[794px] overflow-hidden bg-white text-slate-900 shadow-2xl">
      <header className="bg-gradient-to-br from-cyan-500 via-blue-600 to-fuchsia-600 p-10 text-white">
        <div className="flex items-center gap-5">
          <Photo resume={resume} creative />
          <div>
            <h1 className="text-4xl font-black tracking-normal">{resume.personal.fullName}</h1>
            <p className="mt-3 text-sm leading-6 text-white/85">{resume.summary}</p>
          </div>
        </div>
        <div className="mt-5"><Contact resume={resume} light /></div>
      </header>
      <main className="grid grid-cols-[260px_1fr] gap-8 p-8">
        <aside className="space-y-5">
          <Section title="Skills"><SectionContent resume={resume} name="skills" /></Section>
          <Section title="Education"><SectionContent resume={resume} name="education" /></Section>
        </aside>
        <div className="space-y-5">
          {["experience", "projects", "certifications"].map((name) => <Section title={name} key={name}><SectionContent resume={resume} name={name} /></Section>)}
        </div>
      </main>
    </article>
  );
});

function Photo({ resume, creative = false }) {
  const cls = creative ? "h-24 w-24 border-white/40" : "h-24 w-24 border-blue-100";
  return (
    <div className={`grid shrink-0 place-items-center overflow-hidden rounded-3xl border-4 bg-slate-100 ${cls}`}>
      {resume.personal.photo ? <img src={resume.personal.photo} alt="" className="h-full w-full object-cover" /> : <span className="text-3xl font-black text-slate-400">{resume.personal.fullName?.[0] || "R"}</span>}
    </div>
  );
}
