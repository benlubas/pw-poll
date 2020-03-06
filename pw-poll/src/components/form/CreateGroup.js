import React, { useState } from "react";
import Input from "./input/Input";
import Alert from "./../alert/Alert";
import { url } from "./../../url";

export default function CreateGroup() {
  const [state, setState] = useState({
    value: "",
    alert: false,
    submitted: null
  });
  const validateAndSubmit = async () => {
    if (state.value.trim() !== "") {
      let result = await fetch(url + "group/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: state.value.trim() })
      });
      result = await result.json();
      setState({ value: "", alert: true, submitted: result.name });
    }
  };
  const successAlert = (
    <Alert
      varient="success"
      onClose={() => setState({ ...state, alert: false })}
    >
      You have successfully created a group named {state.submitted}
    </Alert>
  );
  return (
    <div>
      <Input
        onEnter={() => validateAndSubmit()}
        value={state.value}
        label="Group Name"
        onChange={newValue => setState({ ...state, value: newValue })}
      />
      <div className="formSubmit disabled" onClick={() => validateAndSubmit()}>
        Finalize
      </div>
      {state.alert ? successAlert : null}
    </div>
  );
}
