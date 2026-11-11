import { Link } from "react-router-dom";
import { useLMS } from "../context/LMSContext.jsx";

export default function LessonItem({ course, index, current = false }) {
  const { isDone } = useLMS();
  const done = isDone(course.id, index);
  return (
    <Link className={`les${done ? " ok" : ""}${current ? " on" : ""}`} to={`/learn/${course.id}/${index}`}>
      <span className="n">{done ? "✓" : index + 1}</span>
      <span>{course.lessons[index].title}</span>
    </Link>
  );
}
