import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLMS } from "../context/LMSContext.jsx";

export default function Quiz() {
  const { id } = useParams();
  return <QuizBody key={id} id={id} />; // key resets state when the course changes
}

function QuizBody({ id }) {
  const { getCourse, saveScore } = useLMS();
  const course = getCourse(id);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  if (!course || !course.quiz.length) return <div className="box"><h1>No quiz available</h1><Link to="/catalogue">Back to catalogue</Link></div>;

  const submit = () => {
    const score = course.quiz.filter((q, i) => answers[i] === q.answer).length;
    const res = { score, total: course.quiz.length };
    setResult(res);
    saveScore(id, res);
  };
  const retry = () => { setAnswers({}); setResult(null); };
  const allAnswered = Object.keys(answers).length === course.quiz.length;

  return (
    <>
      <Link className="mu sm" to={`/courses/${id}`}>← {course.title}</Link>
      <h1>{course.title} quiz</h1>
      {result && (
        <div className="box" style={{ marginBottom: "1rem" }}>
          <h2 style={{ margin: 0 }}>Score: {result.score}/{result.total} ({Math.round((result.score / result.total) * 100)}%)</h2>
          <p className="mu">
            {result.score === result.total ? "Perfect score!" : result.score / result.total >= 0.6 ? "Well done, you passed." : "Keep practising and try again."}
          </p>
          <button className="btn o" onClick={retry}>Retry quiz</button>
        </div>
      )}
      {course.quiz.map((q, qi) => (
        <fieldset key={qi} className="box quiz">
          <legend><b>{qi + 1}. {q.q}</b></legend>
          {q.options.map((opt, oi) => {
            const cls = result ? (oi === q.answer ? "right" : answers[qi] === oi ? "wrong" : "") : answers[qi] === oi ? "on" : "";
            return (
              <label key={oi} className={`opt ${cls}`}>
                <input type="radio" name={`q${qi}`} checked={answers[qi] === oi} disabled={!!result}
                  onChange={() => setAnswers((a) => ({ ...a, [qi]: oi }))} />
                {opt}
              </label>
            );
          })}
        </fieldset>
      ))}
      {!result && <button className="btn" disabled={!allAnswered} onClick={submit}>Submit answers</button>}
    </>
  );
}
