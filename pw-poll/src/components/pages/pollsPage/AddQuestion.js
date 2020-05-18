import React, { useState } from "react";
import { url } from "../../../url";
import Input from "../../form/input/Input";
import RadioGroup from "../../form/radioGroup/RadioGroup";
import OptionBar from "../../form/selectionBar/SelectionBar";
import EditableListItem from "../../editableListItem/EditableListItem";
import { getGradYears, removeBlanks } from "../../../pipes";
import { securePost } from "../../../hooks/securePost";

export default function AddQuestion(props) {
  const [values, setValues] = useState({
    number: props.number,
    text: "",
    options: [],
    type: { str: "MC", options: { choose: 1 } },
  });
  const [newOption, setNewOption] = useState("");

  const validate = () => {
    if (values.text === "") return false;
    if (values.type.str === "MC" || values.type.str === "CS") {
      if (values.options.length === 0) return false;
    }
    return true;
  };
  const submit = async (pollID, values) => {
    const qurl = url + `question/`;
    try {
      let body = {
        ...values,
        options: removeBlanks(values.options),
        pollID: pollID,
      };
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
        onChange={(val) => setValues({ ...values, text: val })}
        label="Question"
        width="100%"
      />
      <div className="md-padding">
        <OptionBar
          value={values.type.str}
          options={[
            "Multiple Choice",
            "Open Ended",
            "Choose Student From Class",
          ]}
          optionValues={["MC", "OE", "CS"]}
          prompt="Type"
          onChange={(val) =>
            setValues({
              ...values,
              options: [],
              type: { ...values.type, str: val },
            })
          }
        />
      </div>
      {values.type.str === "MC" ? (
        <>
          <div>How many options may a student select? </div>
          <br />
          <Input
            label="Choose"
            value={values.type.options.choose}
            onChange={(num) => {
              if (!isNaN(parseInt(num))) {
                setValues({
                  ...values,
                  type: {
                    ...values.type,
                    options: { ...values.type.options, choose: parseInt(num) },
                  },
                });
                if (parseInt(num) === 0) {
                  setValues({
                    ...values,
                    type: {
                      ...values.type,
                      options: { ...values.type.options, choose: "" },
                    },
                  });
                }
              }
              if (num === "") {
                setValues({
                  ...values,
                  type: {
                    ...values.type,
                    options: { ...values.type.options, choose: "" },
                  },
                });
              }
            }}
          />
          <div className="mcOptions">
            {values.options.map((v, i) => (
              <EditableListItem
                key={v + i}
                value={v}
                onSave={(val) => {
                  setValues(() => {
                    let c = [...values.options];
                    c[i] = val;
                    return { ...values, options: c };
                  });
                }}
              />
            ))}
          </div>
          <br />
          <div className="flex-container flex-baseline">
            <Input
              onEnter={() => {
                if (newOption !== "") {
                  setValues({
                    ...values,
                    options: [...values.options, newOption],
                  });
                  setNewOption("");
                }
              }}
              value={newOption}
              onChange={(val) => setNewOption(val)}
              label={"New Option"}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                if (newOption !== "") {
                  setValues({
                    ...values,
                    options: [...values.options, newOption],
                  });
                  setNewOption("");
                }
              }}
              style={{ marginLeft: "1.5rem" }}
              className={(newOption !== "" ? "primary" : "") + " btn btn-small"}
            >
              Add
            </button>
          </div>
        </>
      ) : values.type.str === "CS" ? (
        <>
          <div>Which class will voters select from?</div>
          <RadioGroup
            options={getGradYears()}
            value={values.options}
            onChange={(val) => setValues({ ...values, options: val })}
            inline
          />
          <div>Gender:</div>
          <RadioGroup
            options={["Male", "Female", "Neutral"]}
            value={values.type.options.gender}
            onChange={(val) =>
              setValues({
                ...values,
                type: {
                  ...values.type,
                  options: { ...values.type.options, gender: val },
                },
              })
            }
            inline
          />
          <div>How many students are being selected? </div>
          <br />
          <Input
            label="Choose"
            value={values.type.options.choose}
            onChange={(num) => {
              if (!isNaN(parseInt(num))) {
                setValues({
                  ...values,
                  type: {
                    ...values.type,
                    options: { ...values.type.options, choose: parseInt(num) },
                  },
                });
                if (parseInt(num) === 0) {
                  setValues({
                    ...values,
                    type: {
                      ...values.type,
                      options: { ...values.type.options, choose: "" },
                    },
                  });
                }
              }
              if (num === "") {
                setValues({
                  ...values,
                  type: {
                    ...values.type,
                    options: { ...values.type.options, choose: "" },
                  },
                });
              }
            }}
          />
        </>
      ) : null}
      <button
        onClick={async () => {
          if (validate()) {
            const res = await submit(props._id, values);
            if (res.error) {
              alert("Error Adding Question" + res.error);
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
