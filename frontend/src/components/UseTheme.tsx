import { useContext } from "react"
import { ThemeContext } from "./ThemeProvider"

const UseTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error ('ThemeContext deve ser usado dentro de um ThemeProvider.');
  }

  return context;
}

export default UseTheme