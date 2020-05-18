import React, { useState } from "react";
import Card from "./../../card/Card";
import Input from "./../../form/input/Input";
import { EditSVG, CircleXSVG } from "./../../svg";
import { ModalSet } from "./../../modal/Modal";
import { bold, getGradYears, removeBlanks } from "./../../../pipes";
import RadioGroup from "./../../form/radioGroup/RadioGroup";
import SelectionBar from "./../../form/selectionBar/SelectionBar";
import EditableListItem from "../../editableListItem/EditableListItem";
import { securePut } from "./../../../hooks/securePut";
import { url } from "./../../../url";

export default function QuestionCard({ remove, info, index, ...props }) {
  const [data, setData] = useState({ ...info });
  const [edit, setEdit] = useState({ ...data });
  const [editing, setEditing] = useState(false);
  const [choose, setChoose] = useState(info.type.options.choose);
  const [newOption, setNewOption] = useState("");

  const title = (
    <div className="flex-space-between">
      <span>
        {editing ? (
          <Input
            label="Question"
            value={edit.text}
            onChange={(val) => setEdit({ ...edit, text: val })}
            width="100%"
          />
        ) : (
          index + ") " + data.text
        )}
      </span>
      <div className="flex-space-between">
        {editing ? (
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditing(false);
              }}
              className="btn btn-small"
            >
              Discard Changes
            </button>
          </div>
        ) : (
          <EditSVG
            className="pointer"
            onClick={() => {
              setEditing(true);
            }}
          />
        )}
        <ModalSet
          title="Are you sure you want to delete this question?"
          customTrigger={<CircleXSVG className="pointer" />}
          onConfirm={() => {
            remove("question", data._id, index);
            return true;
          }}
          height="200px"
          confirmClass="danger"
          closeClass="default"
        >
          <h3 style={{ margin: "0px" }}>Question: </h3>
          <div>{data.text}</div>
        </ModalSet>
      </div>
    </div>
  ); //end title
  return (
    <div className="questionWrapper">
      <Card dragProps={props.dragHandleProps} title={title}>
        {!editing ? (
          <>
            <div className="md-padding-v">
              {bold("Type:")}
              {data.type && data.type.str === "MC"
                ? " Multiple Choice - Choose " + data.type.options.choose
                : data.type === "OE"
                ? " Open Ended"
                : " Choose " +
                  data.type.options.choose +
                  " Student" +
                  (data.type.options.choose === 1 ? "" : "s")}
            </div>
            <div className="md-padding-v">
              {data.type && data.type.str === "MC"
                ? bold("Options: ")
                : data.type && data.type.str === "CS"
                ? bold("Voters choose from students in the class of: ")
                : null}
              {data.options.map((v, i) => (
                <div key={v + i}>- {v}</div>
              ))}
              <br />
              {data.type.str === "CS" ? (
                <div>
                  {bold("Gender: ")} {data.type.options.gender}
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div>
              <SelectionBar
                options={["Multiple Choice", "Open Ended", "Choose Student"]}
                optionValues={["MC", "OE", "CS"]}
                value={edit.type.str}
                onChange={(val) =>
                  setEdit({
                    ...edit,
                    options: [],
                    type: { ...edit.type, str: val },
                  })
                }
              />
            </div>
            <div>
              {edit.type && edit.type.str === "MC" ? (
                <>
                  <br />
                  <Input
                    label="Choose"
                    value={choose}
                    onChange={(val) => {
                      if (!isNaN(parseInt(val))) setChoose(parseInt(val));
                      if (val === "") setChoose(val);
                    }}
                  />
                  <div className="subtitle" style={{ marginTop: "5px" }}>
                    Options:
                  </div>
                  {edit.options.map((val, ind) => (
                    <EditableListItem
                      key={val + ind}
                      value={val}
                      onSave={(val) => {
                        let c = [...edit.options];
                        if (val === "") {
                          c.splice(ind, 1);
                        } else {
                          c[ind] = val;
                        }
                        setEdit({ ...edit, options: c });
                      }}
                    />
                  ))}
                  <br />
                  <div>
                    <Input
                      style={{ display: "inline-block" }}
                      value={newOption}
                      label="New Option"
                      onChange={(val) => setNewOption(val)}
                      onEnter={() => {
                        setEdit({
                          ...edit,
                          options: edit.options.concat([newOption]),
                        });
                        setNewOption("");
                      }}
                    />
                    <button
                      style={{ marginLeft: "15px" }}
                      className={`btn btn-small ${
                        newOption === "" ? "default" : "primary"
                      }`}
                      onClick={() => {
                        if (newOption !== "") {
                          setEdit({
                            ...edit,
                            options: edit.options.concat([newOption]),
                          });
                          setNewOption("");
                        }
                      }}
                    >
                      Add
                    </button>
                  </div>
                </>
              ) : edit.type && edit.type.str === "CS" ? (
                <>
                  <div>Which class will voters select from?</div>
                  <RadioGroup
                    options={getGradYears()}
                    value={edit.options}
                    onChange={(val) => setEdit({ ...edit, options: val })}
                    inline
                  />
                  <div>Gender:</div>
                  <RadioGroup
                    options={["Male", "Female", "Neutral"]}
                    value={edit.type.options.gender}
                    onChange={(val) =>
                      setEdit({
                        ...edit,
                        type: {
                          ...edit.type,
                          options: { ...edit.type.options, gender: val },
                        },
                      })
                    }
                    inline
                  />
                  <br />
                  <div>How many students will be selected? </div>
                  <br />
                  <Input
                    label="Choose"
                    value={choose}
                    onChange={(val) => {
                      if (!isNaN(parseInt(val))) setChoose(parseInt(val));
                      if (val === "") setChoose(val);
                    }}
                  />
                </>
              ) : null}
            </div>
            <button
              className="btn primary wide"
              onClick={() => {
                let body = {
                  ...edit,
                  options: removeBlanks(edit.options),
                  pollID: props.pollID,
                };
                if (edit.type.str === "MC" || edit.type.str === "CS") {
                  body = {
                    ...body,
                    type: {
                      str: body.type.str,
                      options: { ...body.type.options, choose: choose },
                    },
                  };
                }
                securePut(url + "question/" + edit._id, body);
                if (edit.type.str === "MC" || edit.type.str === "CS") {
                  setData({
                    ...edit,
                    options: removeBlanks(edit.options),
                    type: {
                      str: body.type.str,
                      options: { ...edit.type.options, choose: choose },
                    },
                  });
                  setEdit({ ...edit, options: removeBlanks(edit.options) });
                } else {
                  setData({ ...edit });
                }
                setEditing(false);
              }}
            >
              Save
            </button>
          </>
        )}
      </Card>
    </div>
  );
}
