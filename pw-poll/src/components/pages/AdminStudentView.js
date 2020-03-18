import React from "react";
import SelectionBar from "./../form/selectionBar/SelectionBar";
import StudentHome from "./../pages/home/StudentHome";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { getGradYears } from "./../../pipes";

export default function AdminStudentView() {
  const hist = useHistory();
  let { year } = useParams();
  if (isNaN(parseInt(year))) {
    year = new Date().getFullYear();
  }
  return (
    <>
      <div style={{ padding: "20px" }}>
        <SelectionBar
          value={parseInt(year)}
          onChange={val => hist.push("/studentView/" + val)}
          options={getGradYears()}
        />
      </div>
      <StudentHome year={year} />
    </>
  );
}
