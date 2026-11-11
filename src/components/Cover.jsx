import { useState } from "react";

// Vite bundles every SVG in this folder and gives us its URL
const covers = import.meta.glob("../assets/covers/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

export default function Cover({ course }) {
  const [failed, setFailed] = useState(false);
  const src = course.image || covers[`../assets/covers/${course.id}.svg`];

  return (
    <div className="th" style={{ background: course.color }}>
      {failed || !src ? (
        <span className="emoji">{course.emoji}</span>
      ) : (
        <img src={src} alt={`${course.title} cover`} loading="lazy" onError={() => setFailed(true)} />
      )}
      <span className="badge cat">{course.cat}</span>
      <span className="badge price">{course.price ? `$${course.price}` : "Free"}</span>
    </div>
  );
}