import React from "react";

import "./svg.css";

export function EditSVG(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      onClick={() => onClick()}
      className={`${props.className || ""} svg`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
    </svg>
  );
}
export function CirclePlusSVG(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      onClick={() => onClick()}
      className={`${props.className || ""} svg`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" />
    </svg>
  );
}

export function CircleXSVG(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      onClick={() => onClick()}
      className={`${props.className || ""} svg`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
    </svg>
  );
}

export function InfoIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      onClick={() => onClick()}
      className={`${props.className || ""} svg`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{ fill: "var(--primary)" }}
    >
      <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
    </svg>
  );
}
export function PeopleIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      onClick={() => onClick()}
      className={`${props.className || ""} svg`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
    >
      <path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path>
    </svg>
  );
}
export function PollsIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 448 512"
      onClick={() => onClick()}
      {...props}
    >
      <path d="M448 432V80c0-26.5-21.5-48-48-48H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48zM112 192c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h128c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16H112zm0 96c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16H112zm0 96c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h64c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-64z"></path>
    </svg>
  );
}
export function PieChartIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg onClick={() => onClick()} {...props} viewBox="0 0 544 512">
      <path d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"></path>
    </svg>
  );
}
export function LoginIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      onClick={() => onClick()}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"></path>
    </svg>
  );
}
export function LogoutIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;

  return (
    <svg
      onClick={() => onClick()}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path>
    </svg>
  );
}

export function QuestionMarkIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      onClick={() => onClick()}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"></path>
    </svg>
  );
}
export function TMIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      onClick={() => onClick()}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
    >
      <path d="M260.6 96H12c-6.6 0-12 5.4-12 12v43.1c0 6.6 5.4 12 12 12h85.1V404c0 6.6 5.4 12 12 12h54.3c6.6 0 12-5.4 12-12V163.1h85.1c6.6 0 12-5.4 12-12V108c.1-6.6-5.3-12-11.9-12zM640 403l-24-296c-.5-6.2-5.7-11-12-11h-65.4c-5.1 0-9.7 3.3-11.3 8.1l-43.8 127.1c-7.2 20.6-16.1 52.8-16.1 52.8h-.9s-8.9-32.2-16.1-52.8l-43.8-127.1c-1.7-4.8-6.2-8.1-11.3-8.1h-65.4c-6.2 0-11.4 4.8-12 11l-24.4 296c-.6 7 4.9 13 12 13H360c6.3 0 11.5-4.9 12-11.2l9.1-132.9c1.8-24.2 0-53.7 0-53.7h.9s10.7 33.6 17.9 53.7l30.7 84.7c1.7 4.7 6.2 7.9 11.3 7.9h50.3c5.1 0 9.6-3.2 11.3-7.9l30.7-84.7c7.2-20.1 17.9-53.7 17.9-53.7h.9s-1.8 29.5 0 53.7l9.1 132.9c.4 6.3 5.7 11.2 12 11.2H628c7 0 12.5-6 12-13z"></path>
    </svg>
  );
}

export function DoubleArrrowRightIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      onClick={() => onClick()}
      {...props}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>
    </svg>
  );
}
export function SingleRightArrow(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      onClick={() => onClick()}
      {...props}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 512"
    >
      <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
    </svg>
  );
}
export function UserCheckIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      aria-hidden="true"
      onClick={() => onClick()}
      {...props}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
    >
      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zm323-128.4l-27.8-28.1c-4.6-4.7-12.1-4.7-16.8-.1l-104.8 104-45.5-45.8c-4.6-4.7-12.1-4.7-16.8-.1l-28.1 27.9c-4.7 4.6-4.7 12.1-.1 16.8l81.7 82.3c4.6 4.7 12.1 4.7 16.8.1l141.3-140.2c4.6-4.7 4.7-12.2.1-16.8z"></path>
    </svg>
  );
}
export function ColunmsIcon(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  return (
    <svg
      aria-hidden="true"
      onClick={() => onClick()}
      {...props}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z"></path>
    </svg>
  );
}

export function ICON(props) {
  const onClick = props.onClick ? props.onClick : () => null;
  //  onClick={() => onClick()} {...props}
}
