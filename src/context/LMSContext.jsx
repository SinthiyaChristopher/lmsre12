import { createContext, useContext, useMemo, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import baseCourses, { make } from "../data/courses.js";

const LMSContext = createContext(null);
export const useLMS = () => useContext(LMSContext);

const initial = {
  enrolled: ["c1","c2","c3"],
  completed: {
    c1:[0,1,2],
    c2:[0,1],
  }, // { courseId: [lessonIndex] }
  scores: {
    c1:{
      score:3,
      total:3,
    },
    c2:{
      score:2,
      total:3,
    },
  }, // { courseId: { score, total } }
  extra: [], // courses added by admin
  removed: [], // ids of deleted courses
  profile: { name: "Sinthiya", email: "sinthiya@example.com" },
};

export function LMSProvider({ children }) {
  const [state, setState] = useLocalStorage("lms:react:v1", initial);

  const courses = useMemo(
    () => [...baseCourses, ...state.extra].filter((c) => !state.removed.includes(c.id)),
    [state.extra, state.removed]
  );

  const getCourse = useCallback((id) => courses.find((c) => c.id === id), [courses]);
  const isEnrolled = (id) => state.enrolled.includes(id);
  const doneCount = (c) => (state.completed[c.id] || []).length;
  const progress = (c) => Math.round((doneCount(c) / c.lessons.length) * 100);
  const isDone = (id, i) => (state.completed[id] || []).includes(i);

  const update = (patch) => setState((s) => ({ ...s, ...patch(s) }));

  const actions = {
    enrol: (id) => update((s) => ({ enrolled: s.enrolled.includes(id) ? s.enrolled : [...s.enrolled, id] })),
    unenrol: (id) => update((s) => ({ enrolled: s.enrolled.filter((x) => x !== id) })),
    toggleLesson: (id, i) =>
      update((s) => {
        const list = s.completed[id] || [];
        const next = list.includes(i) ? list.filter((x) => x !== i) : [...list, i];
        return { completed: { ...s.completed, [id]: next } };
      }),
    saveScore: (id, result) =>
      update((s) => {
        const prev = s.scores[id];
        const better = !prev || result.score / result.total >= prev.score / prev.total;
        return better ? { scores: { ...s.scores, [id]: result } } : {};
      }),
    saveProfile: (profile) => update(() => ({ profile })),
    resetProgress: () => update(() => ({ enrolled: [], completed: {}, scores: {} })),
    addCourse: ({ title, cat, instructor }) =>
      update((s) => ({
        extra: [
          ...s.extra,
          make("x" + Date.now().toString(36), title, cat || "General", "📘", "#e0f2fe",
            { name: instructor || "Staff", role: "Instructor", bio: "Subject matter expert." },
            "A newly added course.", ["Introduction", "Core concepts", "Summary"], []),
        ],
      })),
    deleteCourse: (id) => update((s) => ({ removed: [...s.removed, id], enrolled: s.enrolled.filter((x) => x !== id) })),
  };

  const value = { state, courses, getCourse, isEnrolled, doneCount, progress, isDone, ...actions };
  return <LMSContext.Provider value={value}>{children}</LMSContext.Provider>;
}
