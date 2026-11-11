import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLMS } from "../context/LMSContext.jsx";
import "./Certificate.css";

/** Issue once per course, then reuse the same date and ID on every visit. */
function getRecord(courseId) {
  const key = `lms:cert:${courseId}`;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) return saved;
  } catch {
    /* ignore corrupt data */
  }
  const record = {
    date: new Date().toISOString(),
    number: `LH-${courseId.toUpperCase()}-${Date.now().toString(36).toUpperCase().slice(-6)}`,
  };
  try {
    localStorage.setItem(key, JSON.stringify(record));
  } catch {
    /* storage unavailable */
  }
  return record;
}

export default function Certificate() {
  const { id } = useParams();
  const { state, getCourse, progress } = useLMS();
  const course = getCourse(id);
  const eligible = !!course && progress(course) === 100;
  const [record] = useState(() => (eligible ? getRecord(id) : null));

  if (!course) {
    return (
      <div className="box">
        <h1>Course not found</h1>
        <Link to="/catalogue">Back to catalogue</Link>
      </div>
    );
  }

  if (!eligible) {
    return (
      <div className="box">
        <h1>Certificate locked</h1>
        <p className="mu">
          Complete all {course.lessons.length} lessons of <b>{course.title}</b> to unlock your certificate.
          You are at {progress(course)}%.
        </p>
        <Link className="btn" to={`/learn/${id}/0`}>Continue learning</Link>
      </div>
    );
  }

  const score = state.scores[id];
  const issued = new Date(record.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="cert-page">
      <div className="cert-actions no-print">
        <Link className="btn o" to="/my-courses">← My courses</Link>
        <button className="btn" onClick={() => window.print()}>Download / Print PDF</button>
      </div>

      <section className="cert" aria-label="Certificate of completion">
        <div className="cert-frame">
          <div className="cert-brand">🎓 LearnHub Academy</div>
          <p className="cert-kicker">Certificate of Completion</p>
          <p className="cert-lead">This is to certify that</p>
          <h1 className="cert-name">{state.profile.name}</h1>
          <p className="cert-lead">has successfully completed the course</p>
          <h2 className="cert-course">{course.title}</h2>
          <p className="cert-meta">
            {course.lessons.length} lessons completed
            {score ? ` · Quiz score ${score.score}/${score.total}` : ""}
          </p>

          <div className="cert-foot">
            <div className="cert-sign">
              <span className="sig">{course.ins.name}</span>
              <div className="line" />
              <small>{course.ins.role}</small>
            </div>

            <div className="cert-seal" aria-hidden="true">
              <span>★</span>
              <small>Verified</small>
            </div>

            <div className="cert-sign">
              <span className="date">{issued}</span>
              <div className="line" />
              <small>Date of issue</small>
            </div>
          </div>

          <p className="cert-id">Certificate ID: {record.number}</p>
        </div>
      </section>
    </div>
  );
}