import { useState } from "react";
import { useLMS } from "../context/LMSContext.jsx";

export default function Admin() {
  const { courses, addCourse, deleteCourse } = useLMS();
  const [form, setForm] = useState({ title: "", cat: "", instructor: "" });
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onAdd = () => {
    if (!form.title.trim()) return setError("Title is required.");
    addCourse({ title: form.title.trim(), cat: form.cat.trim(), instructor: form.instructor.trim() });
    setForm({ title: "", cat: "", instructor: "" });
    setError("");
  };
  const onDelete = (id) => window.confirm("Delete this course?") && deleteCourse(id);

  return (
    <>
      <h1>Course management</h1>
      <div className="box tblw">
        <table>
          <thead><tr><th>Title</th><th>Category</th><th>Instructor</th><th>Lessons</th><th /></tr></thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td><td>{c.cat}</td><td>{c.ins.name}</td><td>{c.lessons.length}</td>
                <td><button className="btn d" onClick={() => onDelete(c.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Add a course</h2>
      <div className="box">
        <div className="row">
          <input placeholder="Course title" aria-label="Title" value={form.title} onChange={set("title")} style={{ flex: 2, minWidth: 180 }} />
          <input placeholder="Category" aria-label="Category" value={form.cat} onChange={set("cat")} style={{ flex: 1, minWidth: 120 }} />
          <input placeholder="Instructor" aria-label="Instructor" value={form.instructor} onChange={set("instructor")} style={{ flex: 1, minWidth: 140 }} />
          <button className="btn" onClick={onAdd}>Add course</button>
        </div>
        {error && <p className="sm" style={{ color: "var(--er)" }} role="alert">{error}</p>}
      </div>
    </>
  );
}
