import React, { useState } from "react";
import { url } from "../../../url";
import Input from "../../form/input/Input";
import RadioGroup from "../../form/radioGroup/RadioGroup";
import EditableListItem from "../../editableListItem/EditableListItem";
import { getGradYears } from "../../../pipes";
import { securePost } from "../../../hooks/securePost";

export default function AddQuestion(props) {
  const [values, setValues] = useState({
    number: props.number,
    text: "",
    options: [],
    type: null
  });
  const [newOption, setNewOption] = useState("");
  const [choose, setChoose] = useState(1);

  const validate = () => {
    if (values.text === "") return false;
    if (values.type === "Multiple Choice") {
      if (values.options.length === 0) return false;
    }
    return true;
  };
  const submit = async (pollID, values) => {
    const qurl = url + `question/`;
    try {
      let body = { ...values, pollID: pollID };
      if (values.type === "MC") {
        body = { ...body, type: body.type + choose };
      }
      let result = securePost(qurl, body);
      return result;
    } catch (err) {
      return { error: err, ...values, pollID: pollID };
    }
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
        options={["Multiple Choice", "Open Ended", "Choose Student From Class"]}
        optionValues={["MC", "OE", "CS"]}
        prompt="Type"
        onChange={val => setValues({ ...values, options: [], type: val })}
      />
      {values.type === "MC" ? (
        <>
          <div>How many options may a student select? </div>
          <Input
            label="Choose"
            value={choose}
            onChange={num => {
              if (!isNaN(parseInt(num))) {
                setChoose(parseInt(num));
              }
              if (num === "") {
                setChoose("");
              }
            }}
          />
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
      ) : values.type === "CS" ? (
        <RadioGroup
          options={getGradYears()}
          value={values.options}
          choose="4"
          onChange={val => setValues({ ...values, options: val })}
        />
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
