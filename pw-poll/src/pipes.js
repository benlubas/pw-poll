import React from "react";

export const titlecase = str => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substr(1))
    .join(" ");
};

export const dateFormat = dateStr => {
  return new Date(dateStr).toDateString();
};

export const bold = str => <span className="bold">{str}</span>;
