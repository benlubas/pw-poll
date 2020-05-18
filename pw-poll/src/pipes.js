import React from "react";

export const titlecase = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
    .join(" ");
};

export const dateFormat = (dateStr) => {
  return new Date(dateStr).toLocaleString();
};

export const bold = (str) => <span className="bold">{str}</span>;

export const getGradYears = () => {
  let add = new Date().getMonth() > 7;
  return new Array(4).fill(0).map((v, i) => new Date().getFullYear() + add + i);
};
export const removeBlanks = (arr) => {
  let c = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "") {
      c.push(arr[i]);
    }
  }
  return c;
};
