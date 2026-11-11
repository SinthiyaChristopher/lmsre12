import { useState } from "react";

/** Poster-style course cover with category and price badges (emoji fallback). */
export default function Cover({ course }) {
  const [failed, setFailed] = useState(false);
  const src = course.image || `${import.meta.env.BASE_URL}covers/${course.id}.svg`;

  return (
    <div className="th" style={{ background: course.color }}>
      {failed ? (
        <span className="emoji">{course.emoji}</span>
      ) : (
        <img src={src} alt={`${course.title} cover`} loading="lazy" onError={() => setFailed(true)} />
      )}
      <span className="badge cat">{course.cat}</span>
      <span className="badge price">{course.price ? `$${course.price}` : "Free"}</span>
    </div>
  );
}