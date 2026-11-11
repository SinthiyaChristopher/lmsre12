import { Routes, Route, NavLink, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import MyCourses from "./pages/MyCourses.jsx";
import LessonViewer from "./pages/LessonViewer.jsx";
import Quiz from "./pages/Quiz.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/Admin.jsx";
import Certificate from "./pages/Certificate.jsx";

const links = [
  ["/", "Dashboard"],
  ["/catalogue", "Catalogue"],
  ["/my-courses", "My Courses"],
  ["/profile", "Profile"],
  ["/admin", "Admin"],
];

export default function App() {
  return (
    <>
      <header>
        <nav aria-label="Main">
          <Link className="logo" to="/">🎓 LearnHub</Link>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => "l" + (isActive ? " on" : "")}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/learn/:id/:index" element={<LessonViewer />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/certificate/:id" element={<Certificate />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<div className="box"><h1>Page not found</h1><Link to="/">Back to dashboard</Link></div>} />
        </Routes>
      </main>
    </>
  );
}
