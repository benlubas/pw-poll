import React, { useState, useRef } from "react";
import Input from "./input/Input";

export default function CreateGroup() {
  const [state, setState] = useState("waiting");
  const [value, setVal] = useState("New Student Group");
  const validateAndSubmit = async () => {
    console.log("value: ", value);
    setState("sending");
    //valid date, throw it into the DB.
    const result = await fetch("http://localhost:5000/group", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: value })
    });
    setState("done");
  };

  let getVal;
  return (
    <form>
      <label HTMLfor="year">Create New Group</label>
      <Input
        label="Group Name"
        onChange={newValue => setVal(newValue)}
        getVal={getVal}
      />
      <div className="formSubmit" onClick={() => validateAndSubmit()}>
        Finalize
      </div>
    </form>
  );
}
