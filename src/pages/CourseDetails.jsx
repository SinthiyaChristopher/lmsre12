import { Link, useParams } from "react-router-dom";
import { useLMS } from "../context/LMSContext.jsx";
import LessonItem from "../components/LessonItem.jsx";

export default function CourseDetails() {
  const { id } = useParams();
  const { getCourse, isEnrolled, enrol } = useLMS();
  const course = getCourse(id);
  if (!course) return <div className="box"><h1>Course not found</h1><Link to="/catalogue">Back to catalogue</Link></div>;

  return (
    <>
      <Link className="mu sm" to="/catalogue">← Back to catalogue</Link>
      <div className="box hero" style={{ background: course.color }}>
        <span className="tag">{course.cat}</span>
        <h1>{course.emoji} {course.title}</h1>
        <p>{course.desc}</p>
        {isEnrolled(id)
          ? <Link className="btn" to={`/learn/${id}/0`}>Go to lessons</Link>
          : <button className="btn" onClick={() => enrol(id)}>Enrol now</button>}
      </div>
      <div className="two">
        <div>
          <h2 style={{ marginTop: 0 }}>Lessons ({course.lessons.length})</h2>
          <div className="box" style={{ padding: ".5rem" }}>
            {course.lessons.map((_, i) => <LessonItem key={i} course={course} index={i} />)}
          </div>
          {course.quiz.length > 0 && <p><Link className="btn o" to={`/quiz/${id}`}>Take the quiz</Link></p>}
        </div>
        <div>
          <h2 style={{ marginTop: 0 }}>Instructor</h2>
          <div className="box">
            <b>{course.ins.name}</b>
            <div className="mu sm">{course.ins.role}</div>
            <p>{course.ins.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}
