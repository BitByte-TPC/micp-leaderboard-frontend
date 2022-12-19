import React from "react";
import styles from "./DarkMode.module.css";

let prefersDark = false

const DarkMode: React.FC = () => {
  const [theme, setTheme] = React.useState<string>('light')

  const setDark = () => {
    document.documentElement.setAttribute("data-theme", "dark")
  }
  
  const setLight = () => {
    document.documentElement.setAttribute("data-theme", "light")
  }
  
  if(typeof window !== 'undefined') {
    prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  }
  
  const defaultDark =
    theme === "dark" || (theme === null && prefersDark)
  
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
