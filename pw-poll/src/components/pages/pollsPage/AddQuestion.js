import React, { useState } from "react";
import { url } from "../../../url";
import Input from "../../form/input/Input";
import RadioGroup from "../../form/radioGroup/RadioGroup";
import EditableListItem from "../../editableListItem/EditableListItem";

const submit = async (pollID, values) => {
  const qurl = url + `question/`;
  try {
    let result = await fetch(qurl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        ...values,
        pollID: pollID
      })
    });
    result = await result.json();
    return result;
  } catch (err) {
    return { error: err, ...values, pollID: pollID };
  }
};
export default function AddQuestion(props) {
  const [values, setValues] = useState({
    number: props.number,
    text: "",
    options: [],
    type: null
  });
  const [newOption, setNewOption] = useState("");

  const validate = () => {
    if (values.text === "") return false;
    if (values.type === "Multiple Choice") {
      if (values.options.length === 0) return false;
    }
    return true;
  };

  return (
    <div>
      <Input
        value={values.text || ""}
        onChange={val => setValues({ ...values, text: val })}
        label="Question"
        width="100%"
      />
      <RadioGroup
        value={values.type}
        options={["Multiple Choice", "Open Ended"]}
        prompt="Type"
        onChange={val => setValues({ ...values, type: val })}
      />
      {values.type === "Multiple Choice" ? (
        <>
          <ol className="mcOptions">
            {values.options.map((v, i) => (
              <EditableListItem
                key={v + i}
                value={v}
                onSave={val => {
                  setValues(() => {
                    let c = [...values.options];
                    c[i] = val;
                    return { ...values, options: c };
                  });
                }}
              />
            ))}
          </ol>
          <div className="flex-container flex-baseline">
            <Input
              onEnter={() => {
                if (newOption !== "") {
                  setValues({
                    ...values,
                    options: [...values.options, newOption]
                  });
                  setNewOption("");
                }
              }}
              value={newOption}
              onChange={val => setNewOption(val)}
              label={"New Option"}
            />
            <button
              style={{ marginLeft: "1.5rem" }}
              className={(newOption !== "" ? "primary" : "") + " btn btn-small"}
            >
              Add
            </button>
          </div>
        </>
      ) : null}
      <button
        onClick={async () => {
          if (validate()) {
            const res = await submit(props._id, values);
            if (res.error) {
              alert("Error Adding Question");
            } else {
              props.save(res);
            }
          }
        }}
        className="btn wide primary"
      >
        Save
      </button>
    </div>
  );
}
