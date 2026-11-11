import { useMemo, useState } from "react";
import { useLMS } from "../context/LMSContext.jsx";
import CourseCard from "../components/CourseCard.jsx";

export default function Catalogue() {
  const { courses, progress } = useLMS();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("title");

  const categories = ["All", ...new Set(courses.map((c) => c.cat))];

  const list = useMemo(() => {
    const q = query.toLowerCase();
    const sorters = {
      title: (a, b) => a.title.localeCompare(b.title),
      lessons: (a, b) => b.lessons.length - a.lessons.length,
      progress: (a, b) => progress(b) - progress(a),
    };
    return courses
      .filter((c) => (category === "All" || c.cat === category) && `${c.title} ${c.ins.name} ${c.desc}`.toLowerCase().includes(q))
      .sort(sorters[sort]);
  }, [courses, query, category, sort, progress]);

  return (
    <>
      <h1>Course catalogue</h1>
      <div className="row" style={{ margin: "1rem 0" }}>
        <input type="search" placeholder="Search courses or instructors" aria-label="Search courses"
          value={query} onChange={(e) => setQuery(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
        <select aria-label="Sort courses" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="title">Sort: Title</option>
          <option value="lessons">Sort: Most lessons</option>
          <option value="progress">Sort: Progress</option>
        </select>
      </div>
      <div className="row" style={{ marginBottom: "1rem" }}>
        {categories.map((k) => (
          <button key={k} className={`chip${k === category ? " on" : ""}`} onClick={() => setCategory(k)}>{k}</button>
        ))}
      </div>
      {list.length ? (
        <div className="grid">{list.map((c) => <CourseCard key={c.id} course={c} />)}</div>
      ) : (
        <div className="box">No courses match your filters.</div>
      )}
    </>
  );
}
