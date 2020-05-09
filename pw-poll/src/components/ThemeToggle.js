import React, { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    window.localStorage.getItem("dark") === "true"
  );
  const body = document.querySelector("body");
  if (dark) body.classList.add("dark");
  else body.classList.remove("dark");

  return (
    <div
      className="theme-toggle pointer"
      onClick={() => {
        const body = document.querySelector("body");
        if (!dark) body.classList.add("dark");
        else body.classList.remove("dark");
        window.localStorage.setItem("dark", !dark);
        setDark(!dark);
      }}
    >
      <i className="fas fa-lg fa-moon"></i>
    </div>
  );
}
