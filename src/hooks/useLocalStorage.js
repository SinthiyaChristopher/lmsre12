import { useState, useEffect } from "react";

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(initial);

  // Load data from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);

      console.log("RAW STORAGE:", raw);

      if (raw) {
        const parsed = JSON.parse(raw);

        setValue({
          ...initial,
          ...parsed,
          completed: {
            ...initial.completed,
            ...(parsed.completed || {}),
          },
          scores: {
            ...initial.scores,
            ...(parsed.scores || {}),
          },
          profile: {
            ...initial.profile,
            ...(parsed.profile || {}),
          },
        });
      }
    } catch (err) {
      console.error("Error loading localStorage:", err);
    }
  }, [key]);

  // Save data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (err) {
      console.error("Error saving localStorage:", err);
    }
  }, [key, value]);

  return [value, setValue];
}