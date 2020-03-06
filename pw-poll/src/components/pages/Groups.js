import React from "react";
import { useFetch } from "../../hooks/useFetch";
import GroupCard from "../groupCard/GroupCard";
import LoadingScreen from "./../loadingScreen/LoadingScreen";
import { url } from "./../../url";

export default function Groups() {
  const [data, loading] = useFetch(url + "group");
  return loading ? (
    <LoadingScreen />
  ) : (
    data.map((val, index) => (
      <GroupCard key={index + 1} DBid={val._id} name={val.name}>
        <div className="studentList">
          {val.students.length > 0
            ? val.students.map(stud => <div key={stud}> {stud} </div>)
            : "No students in this group."}
        </div>
      </GroupCard>
    ))
  );
}
