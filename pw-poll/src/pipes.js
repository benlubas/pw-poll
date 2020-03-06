import React from "react";

export const titlecase = str => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substr(1))
    .join(" ");
};

export const dateFormat = dateStr => {
  return (
    dateStr.substr(5, 3) + dateStr.substr(8, 2) + "-" + dateStr.substr(0, 4)
  );
};

export const bold = str => <span className="bold">{str}</span>;
