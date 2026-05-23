export const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Executive layout with confident hierarchy and ATS-friendly spacing.",
    accent: "from-blue-600 to-violet-600",
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Crisp black-and-white structure for corporate applications.",
    accent: "from-slate-700 to-slate-950",
  },
  {
    id: "creative",
    name: "Creative Gradient",
    description: "A polished visual profile for product, design, and tech roles.",
    accent: "from-cyan-500 to-fuchsia-600",
  },
];

export const defaultResume = {
  personal: {
    fullName: "Aarav Sharma",
    email: "aarav.sharma@email.com",
    phone: "+91 98765 43210",
    address: "Hyderabad, India",
    linkedin: "linkedin.com/in/aaravsharma",
    portfolio: "aarav.design",
    photo: "",
  },
  summary:
    "Product-minded frontend developer with 4+ years of experience building polished, accessible web apps. Strong in React, design systems, performance, and translating user needs into elegant interfaces.",
  education: [
    {
      id: "edu-1",
      school: "Indian Institute of Technology",
      degree: "B.Tech in Computer Science",
      startYear: "2018",
      endYear: "2022",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Nova Labs",
      role: "Frontend Engineer",
      duration: "2022 - Present",
      description:
        "Built reusable React components, improved dashboard load time by 38%, and partnered with design to ship high-converting onboarding flows.",
    },
  ],
  skills: [
    { id: "skill-1", name: "React.js" },
    { id: "skill-2", name: "Tailwind CSS" },
    { id: "skill-3", name: "Framer Motion" },
    { id: "skill-4", name: "Design Systems" },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Insight CRM",
      description:
        "Designed and developed a responsive CRM analytics suite with drag-and-drop widgets and real-time filters.",
      tech: "React, Zustand, Recharts",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Meta Front-End Developer",
      organization: "Coursera",
    },
  ],
  sectionOrder: ["experience", "education", "projects", "skills", "certifications"],
};
