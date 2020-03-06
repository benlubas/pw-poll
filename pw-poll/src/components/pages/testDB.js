import React from "react";

import UploadCSV from "../form/UploadCSV";
import CreateGroup from "./../form/CreateGroup";
import Checkbox from "../form/checkbox/Checkbox";

const TestDB = () => {
  return (
    <>
      <UploadCSV />
      <CreateGroup />
      <Checkbox
        checkVal="Test"
        onChange={val => console.log(val)}
        label="Test:"
      />
    </>
  );
};

export default TestDB;
