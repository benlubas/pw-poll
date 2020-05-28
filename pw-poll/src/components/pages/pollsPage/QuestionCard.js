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
  const [choose, setChoose] = useState(info.typeOptions.choose);
  const [newOption, setNewOption] = useState("");

  // console.log(data);

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
              {data.type === "MC"
                ? " Multiple Choice - Choose " + data.typeOptions.choose
                : data.type === "OE"
                ? " Open Ended"
                : " Choose " +
                  data.typeOptions.choose +
                  " Student" +
                  (data.typeOptions.choose === 1 ? "" : "s")}
            </div>
            <div className="md-padding-v">
              {data.type === "MC"
                ? bold("Options: ")
                : data.type === "CS"
                ? bold("Voters choose from students in the class of: ")
                : null}
              {data.type === "MC" || data.type === "CS"
                ? data.options.map((v, i) => <div key={v + i}>- {v}</div>)
                : null}
              <br />
              {data.type === "CS" ? (
                <div>
                  {bold("Gender: ")} {data.typeOptions.gender}
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
                value={edit.type}
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
              {edit.type === "MC" ? (
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
              ) : edit.type === "CS" ? (
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
                    value={edit.typeOptions.gender}
                    onChange={(val) =>
                      setEdit({
                        ...edit,
                        typeOptions: { ...edit.typeOptions, gender: val },
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
                if (edit.type === "MC" || edit.type === "CS") {
                  body = {
                    ...body,
                    typeOptions: { ...body.typeOptions, choose: choose },
                  };
                }
                securePut(url + "question/" + edit._id, body);
                if (edit.type === "MC" || edit.type === "CS") {
                  setData({
                    ...edit,
                    options: removeBlanks(edit.options),
                    type: body.type,
                    typeOptions: { ...edit.typeOptions, choose: choose },
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
