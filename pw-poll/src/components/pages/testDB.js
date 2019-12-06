import React from "react";
import AddPollTest from "../AddPollTest";
import AddPollForm from "../form/AddPollForm";

const TestDB = props => {
  return (
    <>
      <AddPollTest />
      <div className="btn">A Test Button</div>
      <AddPollForm />
    </>
  );
};

export default TestDB;
