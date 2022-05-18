import { React, useState } from "react";

const useVisualMode = (init) => {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = (newState, replace = false) => {
    setMode(newState);
    setHistory(
      replace
        ? (prev) => {
            return prev.fill(newState, prev.length - 1);
          }
        : (prev) => {
            return [...prev, newState];
          }
    );
  };
  const back = () => {
    if (history.length > 1) {
      const edit = history.slice(0, -1);
      setHistory(edit);
      setMode(edit[edit.length - 1]);
    }
  };
  return { mode, transition, back };
};

export default useVisualMode;
