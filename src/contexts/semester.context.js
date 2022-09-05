import { createContext, useState } from "react";

export const SemesterContext = createContext({
  semester: 1,
  setSemester: () => 1,
});

export const SemesterProvider = ({ children }) => {
  const [semester, setSemester] = useState(1);
  const value = { semester, setSemester };

  return (
    <SemesterContext.Provider value={value}>
      {children}
    </SemesterContext.Provider>
  );
};
