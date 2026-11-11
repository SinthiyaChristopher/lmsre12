const META = {
  c1: { level: "Beginner", price: 49, rating: 4.8, students: 1280 },
  c2: { level: "Intermediate", price: 79, rating: 4.9, students: 2310 },
  c3: { level: "Intermediate", price: 99, rating: 4.7, students: 1640 },
  c4: { level: "Beginner", price: 59, rating: 4.6, students: 980 },
  c5: { level: "Intermediate", price: 69, rating: 4.8, students: 1420 },
  c6: { level: "Beginner", price: 0, rating: 4.5, students: 760 },
};

const make = (id, title, cat, emoji, color, ins, desc, lessons, quiz) => ({
  level: "Beginner", price: 0, rating: 4.5, students: 0, // defaults for admin-added courses
  ...META[id],
  id, title, cat, emoji, color, ins, desc, quiz,
  lessons: lessons.map((t) => ({
    title: t,
    content: `In this lesson you will learn ${t.toLowerCase()} through short explanations and practical examples. Review the key ideas, then mark the lesson complete to track your progress.`,
  })),
});

export { make };

export default [
  make("c1", "HTML & CSS Foundations", "Web", "🌐", "#dbeafe",
    { name: "Priya Nair", role: "Senior Frontend Engineer", bio: "10 years building accessible interfaces for fintech teams." },
    "Build responsive, accessible web pages from scratch.",
    ["Semantic HTML", "The CSS box model", "Flexbox layouts", "Responsive design"],
    [
      { q: "Which tag is semantic?", options: ["<div>", "<article>", "<span>", "<b>"], answer: 1 },
      { q: "Which property enables flexbox?", options: ["display:flex", "float:flex", "position:flex", "flex:none"], answer: 0 },
      { q: "What does the box model include?", options: ["Content only", "Margin, border, padding, content", "Only margin", "Only border"], answer: 1 },
    ]),
  make("c2", "JavaScript Essentials", "Web", "⚡", "#fef3c7",
    { name: "Daniel Cho", role: "Full-Stack Developer", bio: "Teaches modern JavaScript and tooling to bootcamp cohorts." },
    "Master variables, functions, the DOM and async code.",
    ["Variables and types", "Functions and scope", "DOM manipulation", "Promises and async/await", "Working with localStorage"],
    [
      { q: "Which keyword declares a block-scoped variable?", options: ["var", "let", "def", "dim"], answer: 1 },
      { q: "What does JSON.parse do?", options: ["Stringifies an object", "Parses JSON text to an object", "Deletes a key", "Sorts an array"], answer: 1 },
      { q: "Which stores data in the browser?", options: ["localStorage", "console", "alert", "fetch"], answer: 0 },
    ]),
  make("c3", "Python for Data Analysis", "Data", "📊", "#dcfce7",
    { name: "Meera Iyer", role: "Data Scientist", bio: "Leads analytics projects across retail and healthcare." },
    "Clean, explore and visualise data using Python.",
    ["Python basics", "NumPy arrays", "Pandas DataFrames", "Visualising data"],
    [
      { q: "Which library provides DataFrames?", options: ["NumPy", "Pandas", "Flask", "Django"], answer: 1 },
      { q: "What is len([1,2,3])?", options: ["2", "3", "4", "1"], answer: 1 },
    ]),
  make("c4", "UI/UX Design Principles", "Design", "🎨", "#fce7f3",
    { name: "Sofia Alvarez", role: "Product Designer", bio: "Designs user-centred products and mentors junior designers." },
    "Learn research, wireframing and visual hierarchy.",
    ["User research", "Wireframing", "Visual hierarchy", "Usability testing"],
    [
      { q: "A wireframe is a…", options: ["Final visual design", "Low-fidelity layout sketch", "Database schema", "Test script"], answer: 1 },
      { q: "Usability testing observes…", options: ["Server load", "Real users completing tasks", "Code quality", "Ad revenue"], answer: 1 },
    ]),
  make("c5", "SQL & Databases", "Data", "🗄️", "#e0e7ff",
    { name: "Arjun Rao", role: "Database Engineer", bio: "Optimises large relational databases for SaaS products." },
    "Query, join and design relational databases.",
    ["SELECT basics", "Filtering and sorting", "Joins", "Normalisation"],
    [
      { q: "Which clause filters rows?", options: ["WHERE", "ORDER", "GROUP", "LIMIT"], answer: 0 },
      { q: "Which JOIN returns matching rows only?", options: ["INNER JOIN", "CROSS JOIN", "FULL OUTER", "SELF"], answer: 0 },
    ]),
  make("c6", "Agile Project Management", "Business", "📈", "#ffedd5",
    { name: "Helen Brooks", role: "Scrum Master", bio: "Coaches distributed teams on Agile delivery." },
    "Run sprints, manage backlogs and ship predictably.",
    ["Agile mindset", "Scrum roles", "Sprint planning"],
    [{ q: "A sprint is typically…", options: ["1–4 weeks", "1 day", "6 months", "1 year"], answer: 0 }]),
];