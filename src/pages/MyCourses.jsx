import { Link } from "react-router-dom";
import { useLMS } from "../context/LMSContext.jsx";
import CourseCard from "../components/CourseCard.jsx";

export default function MyCourses() {
  const { courses, isEnrolled, unenrol } = useLMS();
  const enrolled = courses.filter((c) => isEnrolled(c.id));

  return (
    <>
      <h1>My courses</h1>
      {enrolled.length ? (
        <div className="grid">
          {enrolled.map((c) => (
            <CourseCard key={c.id} course={c}>
              <button className="btn d" onClick={() => unenrol(c.id)}>Unenrol</button>
            </CourseCard>
          ))}
        </div>
      ) : (
        <div className="box">Nothing here yet. <Link to="/catalogue">Find a course</Link>.</div>
      )}
    </>
  );
}
