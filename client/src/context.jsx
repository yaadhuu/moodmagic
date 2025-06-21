import { createContext, useState } from "react";
export const AppContext = createContext();
export function AppProvider({ children }) {
  const [mood, setMood] = useState("");
  const [intent, setIntent] = useState("match");
  return (
    <AppContext.Provider value={{ mood, setMood, intent, setIntent }}>
      {children}
    </AppContext.Provider>
  );
}
