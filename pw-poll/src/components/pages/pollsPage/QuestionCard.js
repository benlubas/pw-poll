import React, { useState } from "react";
import Card from "./../../card/Card";
import Input from "./../../form/input/Input";
import { EditSVG, CircleXSVG } from "./../../svg";
import { ModalSet } from "./../../modal/Modal";
import { bold, getGradYears } from "./../../../pipes";
import RadioGroup from "./../../form/radioGroup/RadioGroup";
import SelectionBar from "./../../form/selectionBar/SelectionBar";
import EditableListItem from "../../editableListItem/EditableListItem";
import { securePut } from "./../../../hooks/securePut";
import { url } from "./../../../url";

export default function QuestionCard({ remove, info, index, ...props }) {
  const [data, setData] = useState({ ...info });
  const [edit, setEdit] = useState({ ...data });
  const [editing, setEditing] = useState(false);
  const [choose, setChoose] = useState(1);
  const [newOption, setNewOption] = useState("");

  // console.log("type: ", data.type);

  const title = (
    <div className="flex-space-between">
      <span>
        {editing ? (
          <Input
            label="Question"
            value={edit.text}
            onChange={val => setEdit({ ...edit, text: val })}
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
              onClick={e => {
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
            onClick={() => {
              setEditing(true);
            }}
          />
        )}
        <ModalSet
          title="Are you sure you want to delete this question?"
          customTrigger={<CircleXSVG />}
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
      <Card title={title}>
        {!editing ? (
          <>
            <div className="md-padding-v">
              {bold("Type:")}
              {data.type && data.type.substr(0, 2) === "MC"
                ? " Multiple Choice - Choose " +
                  data.type.charAt(data.type.length - 1)
                : data.type === "OE"
                ? " Open Ended"
                : " Choose a Student"}
            </div>
            <div className="md-padding-v">
              {data.type && data.type.substr(0, 2) === "MC"
                ? bold("Options: ")
                : data.type === "CS"
                ? bold("Voters choose from students in the class(es) of: ")
                : null}
              {data.options.map((v, i) => (
                <div key={v + i}>- {v}</div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div>
              <SelectionBar
                options={["Multiple Choice", "Open Ended", "Choose Student"]}
                optionValues={["MC", "OE", "CS"]}
                value={edit.type.substr(0, 2)}
                onChange={val => setEdit({ ...edit, options: [], type: val })}
              />
            </div>
            <div>
              {edit.type && edit.type.substr(0, 2) === "MC" ? (
                <>
                  <div>How many options can students choose? </div>
                  <Input
                    label="Choose"
                    value={choose}
                    onChange={val => {
                      if (!isNaN(parseInt(val))) setChoose(parseInt(val));
                      if (val === "") setChoose(val);
                    }}
                  />
                  <div className="subtitle">Options:</div>
                  {edit.options.map((val, ind) => (
                    <EditableListItem
                      key={val + ind}
                      value={val}
                      onSave={val => {
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
                  <div>
                    <Input
                      value={newOption}
                      label="New Option"
                      onChange={val => setNewOption(val)}
                      onEnter={() => {
                        setEdit({
                          ...edit,
                          options: edit.options.concat([newOption])
                        });
                        setNewOption("");
                      }}
                    />
                  </div>
                </>
              ) : edit.type === "CS" ? (
                <>
                  <div>Which class(es) will voters select from?</div>
                  <RadioGroup
                    options={getGradYears()}
                    value={edit.options}
                    onChange={val => setEdit({ ...edit, options: val })}
                    inline
                  />
                </>
              ) : null}
            </div>
            <button
              className="btn primary wide"
              onClick={() => {
                let body = { ...edit, pollID: props.pollID };
                if (edit.type === "MC") {
                  body = { ...body, type: body.type + choose };
                }
                securePut(url + "question/" + edit._id, body);
                setData({ ...edit });
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
