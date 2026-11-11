import { useState } from "react";
import { useLMS } from "../context/LMSContext.jsx";

export default function Profile() {
  const { state, getCourse, saveProfile, resetProgress } = useLMS();
  const [form, setForm] = useState(state.profile);
  const [msg, setMsg] = useState("");

  const onSave = () => {
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return setMsg("Enter a name and a valid email.");
    saveProfile({ name: form.name.trim(), email: form.email.trim() });
    setMsg("Profile saved.");
  };
  const onReset = () => window.confirm("Reset all progress?") && resetProgress();
  const scores = Object.entries(state.scores);

  return (
    <>
      <h1>Student profile</h1>
      <div className="two">
        <div className="box">
          <h2 style={{ marginTop: 0 }}>Details</h2>
          <p><label className="sm mu">Full name<br />
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: "100%" }} /></label></p>
          <p><label className="sm mu">Email<br />
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: "100%" }} /></label></p>
          <button className="btn" onClick={onSave}>Save profile</button>
          {msg && <p className="sm mu" role="status">{msg}</p>}
        </div>
        <div className="box">
          <h2 style={{ marginTop: 0 }}>Quiz results</h2>
          {scores.length ? (
            <div className="tblw">
              <table>
                <thead><tr><th>Course</th><th>Best score</th></tr></thead>
                <tbody>
                  {scores.map(([cid, s]) => (
                    <tr key={cid}><td>{getCourse(cid)?.title || cid}</td><td>{s.score}/{s.total}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="mu">No quizzes taken yet.</p>}
          <p><button className="btn d" onClick={onReset}>Reset all progress</button></p>
        </div>
      </div>
    </>
  );
}
