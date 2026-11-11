import { Link } from "react-router-dom";
import { useLMS } from "../context/LMSContext.jsx";
import CourseCard from "../components/CourseCard.jsx";
import "./Dashboard.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const progressData = [
  { month: "Jan", progress: 20 },
  { month: "Feb", progress: 35 },
  { month: "Mar", progress: 50 },
  { month: "Apr", progress: 65 },
  { month: "May", progress: 80 },
  { month: "Jun", progress: 95 },
];

const activities = [
  "✅ Enrolled in new courses",
  "📚 Continue lessons",
  "🎯 Complete quizzes",
  "🏆 Earn certificates",
];

export default function Dashboard() {
  const { state, courses, isEnrolled, doneCount } = useLMS();

  const enrolled = courses.filter((c) => isEnrolled(c.id));
  const lessons = enrolled.reduce((sum, c) => sum + doneCount(c), 0);

  const scores = Object.values(state.scores);
  const avg = scores.length
    ? Math.round(
        scores.reduce((a, s) => a + (s.score / s.total) * 100, 0) / scores.length
      )
    : null;

  return (
    <div className="dash">
      {/* Hero */}
      <section className="dash-hero">
        <h1>Welcome Back, {state.profile.name.split(" ")[0]} 👋</h1>
        <p>Track your progress, continue learning, and achieve your goals.</p>
      </section>

      {/* Stats */}
      <section className="dash-stats">
        <div className="panel">
          <p>Enrolled Courses</p>
          <div className="num">{enrolled.length}</div>
        </div>
        <div className="panel">
          <p>Lessons Completed</p>
          <div className="num ok">{lessons}</div>
        </div>
        <div className="panel">
          <p>Average Quiz Score</p>
          <div className="num warn">{avg === null ? "—" : `${avg}%`}</div>
        </div>
      </section>

      {/* Chart + Activity */}
      <section className="dash-split">
        <div className="panel">
          <h2>Learning Progress</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "12px",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#818cf8"
                  strokeWidth={4}
                  dot={{ fill: "#818cf8", r: 6 }}
                  activeDot={{ r: 9 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <h2>Recent Activity</h2>
          <ul className="activity">
            {activities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Learning Goal */}
      <section className="goal">
        <h2>Learning Goal</h2>
        <div className="big">{avg === null ? "0%" : `${avg}%`}</div>
        <p>Overall progress towards certification</p>
      </section>

      {/* Continue Learning */}
      <h2 className="dash-title">Continue Learning</h2>
      {enrolled.length ? (
        <div className="grid">
          {enrolled.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="panel">
          <p>You have not enrolled in any course yet.</p>
          <Link className="btn" to="/catalogue">Browse Catalogue</Link>
        </div>
      )}
    </div>
  );
}