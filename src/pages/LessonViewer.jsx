import { Link, useParams } from "react-router-dom";
import { useLMS } from "../context/LMSContext.jsx";
import LessonItem from "../components/LessonItem.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

export default function LessonViewer() {
  const { id, index } = useParams();
  const i = Number(index);
  const { getCourse, isEnrolled, enrol, isDone, toggleLesson, progress } = useLMS();
  const course = getCourse(id);
  const lesson = course?.lessons[i];

  if (!lesson) return <div className="box"><h1>Lesson not found</h1><Link to="/catalogue">Back to catalogue</Link></div>;
  if (!isEnrolled(id))
    return (
      <div className="box">
        <h1>{course.title}</h1>
        <p>Enrol to access the lessons.</p>
        <button className="btn" onClick={() => enrol(id)}>Enrol now</button>
      </div>
    );

  const done = isDone(id, i);
  const last = i === course.lessons.length - 1;
  const pct = progress(course);

  return (
    <>
      <Link className="mu sm" to={`/courses/${id}`}>← {course.title}</Link>
      <div className="two" style={{ marginTop: ".8rem" }}>
        <aside className="box" style={{ padding: ".5rem", alignSelf: "start" }}>
          <ProgressBar value={pct} />
          <div className="sm mu" style={{ padding: ".4rem .5rem" }}>{pct}% complete</div>
          {course.lessons.map((_, k) => <LessonItem key={k} course={course} index={k} current={k === i} />)}
        </aside>
        <section className="box">
          <span className="tag">Lesson {i + 1} of {course.lessons.length}</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.content}</p>
          <div className="row sp" style={{ marginTop: "1.5rem" }}>
            {i > 0 ? <Link className="btn o" to={`/learn/${id}/${i - 1}`}>← Previous</Link> : <span className="btn o" aria-disabled="true" style={{ opacity: 0.4 }}>← Previous</span>}
            <button className={`btn${done ? " o" : ""}`} onClick={() => toggleLesson(id, i)}>{done ? "Completed ✓" : "Mark complete"}</button>
            {!last ? <Link className="btn" to={`/learn/${id}/${i + 1}`}>Next →</Link>
              : course.quiz.length ? <Link className="btn" to={`/quiz/${id}`}>Take quiz →</Link>
              : <Link className="btn" to="/my-courses">Finish</Link>}
          </div>
        </section>
      </div>
    </>
  );
}
