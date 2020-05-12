import React, { useState } from "react";

export default function ThemeToggle(props) {
  const [dark, setDark] = useState(
    window.localStorage.getItem("dark") === "true"
  );
  const body = document.querySelector("body");
  if (dark) body.classList.add("dark");
  else body.classList.remove("dark");

  const update = () => {
    const body = document.querySelector("body");
    if (!dark) body.classList.add("dark");
    else body.classList.remove("dark");
    window.localStorage.setItem("dark", !dark);
    setDark(!dark);
  };

  return (
    <div
      className={
        (props.children ? "" : "theme-toggle pointer") +
        (props.nav ? " nav-theme" : "")
      }
      onTouchStart={(e) => {
        e.preventDefault();
        update();
      }}
      onClick={(e) => {
        e.preventDefault();
        update();
      }}
    >
      {props.children ? (
        props.children
      ) : (
        <i className={"fas fa-lg fa-moon"}></i>
      )}
    </div>
  );
}
