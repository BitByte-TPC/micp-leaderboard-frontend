import React from "react";
import styles from "./DarkMode.module.css";

const DarkMode: React.FC = () => {
  let storedTheme = "light"
  let prefersDark = false
  const [theme, setTheme] = React.useState<string>('light')

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  }
  
  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  }
  
  React.useEffect(() => {
    storedTheme = localStorage.getItem("theme")!;
  }, [])
  
  if(typeof window !== 'undefined') {
    prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  
  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);
  
  if (defaultDark) {
    setDark();
  }
  
  const toggleTheme: React.MouseEventHandler<HTMLSpanElement> = (event) => {
    if (event.currentTarget.dataset.theme === 'light') {
      setDark();
    } else {
      setLight();
    }
  }
  

  return (
    <div className={styles.darkMode}
        data-theme={theme}
        style={{
            backgroundImage: `url(${(theme === 'light') ? '/darkMode.svg' : '/lightMode.svg'})`,
            filter: `invert(${(theme === 'light') ? 0 : 1})`
        }}
        onClick={(event) => {
            setTheme(currentTheme => ((currentTheme === 'light') ? 'dark' : 'light'))
            toggleTheme(event)
        }}
    >
    </div>
  )
};

export default DarkMode;
