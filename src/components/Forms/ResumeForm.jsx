import { useForm } from "react-hook-form";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FiImage, FiPlus, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useResume } from "../../context/ResumeContext";
import { createId } from "../../utils/storage";

const sectionFields = {
  education: [
    ["school", "School / College"],
    ["degree", "Degree"],
    ["startYear", "Start Year"],
    ["endYear", "End Year"],
  ],
  experience: [
    ["company", "Company"],
    ["role", "Role"],
    ["duration", "Duration"],
    ["description", "Description", "textarea"],
  ],
  projects: [
    ["title", "Project Title"],
    ["tech", "Tech Stack"],
    ["description", "Description", "textarea"],
  ],
  certifications: [
    ["name", "Certification Name"],
    ["organization", "Organization"],
  ],
};

export default function ResumeForm({ active }) {
  const { resume, setResume } = useResume();
  const { register, watch, formState } = useForm({ values: resume, mode: "onChange" });

  useEffect(() => {
    const subscription = watch((value) => setResume((current) => ({ ...current, ...value })));
    return () => subscription.unsubscribe();
  }, [watch, setResume]);

  const updateList = (key, next) => setResume((current) => ({ ...current, [key]: next }));

  const addItem = (key) => {
    const blank = key === "skills" ? { id: createId("skill"), name: "" } : { id: createId(key) };
    updateList(key, [...resume[key], blank]);
  };

  const removeItem = (key, index) => {
    updateList(
      key,
      resume[key].filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const onDragEnd = ({ source, destination, type }) => {
    if (!destination) return;
    const key = type;
    const list = Array.from(resume[key]);
    const [moved] = list.splice(source.index, 1);
    list.splice(destination.index, 0, moved);
    updateList(key, list);
  };

  const setPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setResume((current) => ({ ...current, personal: { ...current.personal, photo: reader.result } }));
    reader.readAsDataURL(file);
  };

  return (
    <form className="space-y-6">
      <Panel title="Personal Information" show={active === "personal"}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Full Name" error={formState.errors.personal?.fullName} {...register("personal.fullName", { required: true })} />
          <Input label="Email" error={formState.errors.personal?.email} {...register("personal.email", { required: true, pattern: /^\S+@\S+$/i })} />
          <Input label="Phone" error={formState.errors.personal?.phone} {...register("personal.phone", { required: true, pattern: /^[+()\d\s-]{7,}$/ })} />
          <Input label="Address" {...register("personal.address")} />
          <Input label="LinkedIn" {...register("personal.linkedin")} />
          <Input label="Portfolio Website" {...register("personal.portfolio")} />
        </div>
        <label className="mt-4 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-blue-300 bg-blue-50/60 px-4 py-5 text-sm font-bold text-blue-700 transition hover:bg-blue-100 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200">
          <FiImage /> Upload profile photo
          <input type="file" accept="image/*" className="hidden" onChange={setPhoto} />
        </label>
      </Panel>

      <Panel title="Professional Summary" show={active === "summary"}>
        <Textarea label="Short Bio" {...register("summary", { required: true })} />
      </Panel>

      <DragDropContext onDragEnd={onDragEnd}>
        <DynamicList title="Experience" name="experience" items={resume.experience} fields={sectionFields.experience} register={register} addItem={addItem} removeItem={removeItem} show={active === "experience"} />
        <DynamicList title="Education" name="education" items={resume.education} fields={sectionFields.education} register={register} addItem={addItem} removeItem={removeItem} show={active === "education"} />
        <SkillsList items={resume.skills} register={register} addItem={addItem} removeItem={removeItem} show={active === "skills"} />
        <DynamicList title="Projects" name="projects" items={resume.projects} fields={sectionFields.projects} register={register} addItem={addItem} removeItem={removeItem} show={active === "projects"} />
      </DragDropContext>

      <Panel title="Certifications" show={active === "settings"}>
        <DynamicCards name="certifications" items={resume.certifications} fields={sectionFields.certifications} register={register} removeItem={removeItem} />
        <button type="button" onClick={() => addItem("certifications")} className="soft-button mt-4">
          <FiPlus /> Add certification
        </button>
      </Panel>
    </form>
  );
}

function Panel({ title, show, children }) {
  if (!show) return null;
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-5 sm:p-6"
    >
      <h2 className="mb-5 text-xl font-black text-slate-950 dark:text-white">{title}</h2>
      {children}
    </motion.section>
  );
}

function Input({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input className="field mt-2" {...props} />
      {error && <span className="mt-1 block text-xs font-semibold text-rose-500">Please enter a valid {label.toLowerCase()}.</span>}
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <textarea rows="5" className="field mt-2 resize-none" {...props} />
    </label>
  );
}

function DynamicList({ title, name, items, fields, register, addItem, removeItem, show }) {
  if (!show) return null;
  return (
    <Panel title={title} show={show}>
      <Droppable droppableId={name} type={name}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
            <DynamicCards name={name} items={items} fields={fields} register={register} removeItem={removeItem} draggable />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button type="button" onClick={() => addItem(name)} className="soft-button mt-4">
        <FiPlus /> Add {title.toLowerCase()}
      </button>
    </Panel>
  );
}

function DynamicCards({ name, items, fields, register, removeItem, draggable = false }) {
  return items.map((item, index) => {
    const card = (
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-black text-slate-700 dark:text-slate-200">#{index + 1}</span>
          <button type="button" onClick={() => removeItem(name, index)} className="soft-button h-9 w-9 px-0" title="Remove">
            <FiTrash2 />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map(([key, label, type]) =>
            type === "textarea" ? (
              <div className="md:col-span-2" key={key}>
                <Textarea label={label} {...register(`${name}.${index}.${key}`)} />
              </div>
            ) : (
              <Input key={key} label={label} {...register(`${name}.${index}.${key}`)} />
            )
          )}
        </div>
      </div>
    );

    return draggable ? (
      <Draggable draggableId={item.id} index={index} key={item.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {card}
          </div>
        )}
      </Draggable>
    ) : (
      <div key={item.id}>{card}</div>
    );
  });
}

function SkillsList({ items, register, addItem, removeItem, show }) {
  if (!show) return null;
  return (
    <Panel title="Skills" show={show}>
      <Droppable droppableId="skills" type="skills" direction="vertical">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="grid gap-3 sm:grid-cols-2">
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(drag) => (
                  <div ref={drag.innerRef} {...drag.draggableProps} {...drag.dragHandleProps} className="flex gap-2">
                    <input className="field" {...register(`skills.${index}.name`)} />
                    <button type="button" onClick={() => removeItem("skills", index)} className="soft-button h-12 w-12 px-0" title="Remove">
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button type="button" onClick={() => addItem("skills")} className="soft-button mt-4">
        <FiPlus /> Add skill
      </button>
    </Panel>
  );
}
