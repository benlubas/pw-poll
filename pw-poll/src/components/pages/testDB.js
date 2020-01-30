import React from "react";
import AddPollTest from "../AddPollTest";
import AddPollForm from "../form/AddPollForm";
import UploadCSV from "../form/UploadCSV";
import CreateGroup from "./../form/CreateGroup";

const TestDB = props => {
  return (
    <>
      <AddPollTest />
      <div className="btn">A Test Button</div>
      <AddPollForm />
      <UploadCSV />
      <CreateGroup />
    </>
  );
};

export default TestDB;
