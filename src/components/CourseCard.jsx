import { Link } from "react-router-dom";
import { useLMS } from "../context/LMSContext.jsx";
import Cover from "./Cover.jsx";
import ProgressBar from "./ProgressBar.jsx";

export default function CourseCard({ course, children }) {
  const { isEnrolled, progress, enrol } = useLMS();
  const enrolled = isEnrolled(course.id);
  const pct = progress(course);

  return (
    <article className="card">
      <Cover course={course} />
      <div className="bd">
        <div className="row sp">
          <span className="tag">{course.level || "Beginner"}</span>
          <span className="rate">★ {course.rating ?? 4.5}</span>
        </div>
        <h3>{course.title}</h3>
        <p className="desc">{course.desc}</p>
        <div className="row sp sm mu">
          <span>Instructor: <b>{course.ins.name}</b></span>
          <span>👥 {course.students ?? 0}</span>
        </div>
        {enrolled && (
          <>
            <ProgressBar value={pct} />
            <div className="sm mu">{pct}% complete</div>
          </>
        )}
        <div className="row" style={{ marginTop: "auto" }}>
          <Link className="btn o" to={`/courses/${course.id}`}>Details</Link>
          {enrolled ? (
            <Link className="btn" to={`/learn/${course.id}/0`}>{pct ? "Continue" : "Start"}</Link>
          ) : (
            <button className="btn" onClick={() => enrol(course.id)}>Enrol</button>
          )}
          {pct === 100 && (
  <Link className="btn o" to={`/certificate/${course.id}`}>🏅 Certificate</Link>
)}
          {children}
        </div>
      </div>
    </article>
  );
}