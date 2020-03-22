import React, { useState } from "react";
import { titlecase, dateFormat, bold } from "../../pipes";
import Alert from "./../alert/Alert";
import { ModalSet } from "./../modal/Modal";
import Textarea from "./../form/textarea/Textarea";
import Input from "./../form/input/Input";
import {
  DatePicker,
  TimePicker
} from "./../form/dateTimePicker/dateTimePicker";

import Card from "../card/Card";
import { CircleXSVG, EditSVG } from "../svg";
import Dropdown from "../form/dropdown/Dropdown";

import "./pollCard.css";

const PollCard = ({ data, ...props }) => {
  const [removed, setRemoved] = useState(false);
  //using props.data to display values normally
  //using editing to display/store the form values while editing
  //lift editing up to become data on save
  const [editing, setEditing] = useState(false);
  const [edit, setEdit] = useState({ ...data });

  //controlled form value for grad year who can vote input
  const [gc, setGc] = useState("");

  const title = (
    <div className="pollCardTitle">
      <div className="flex-grow-fill">
        {editing ? (
          <Input
            label="Title"
            value={edit.title}
            onChange={val => setEdit({ ...edit, title: val })}
            width="100%"
          />
        ) : (
          titlecase(data.title)
        )}
      </div>
      <div className="flex-space-between">
        {!editing ? (
          <EditSVG onClick={() => setEditing(true)} />
        ) : (
          <button
            onClick={() => {
              setEdit(data);
              setEditing(false);
            }}
            className="btn btn-small"
          >
            Discard Changes
          </button>
        )}
        <ModalSet
          customTrigger={<CircleXSVG />}
          height="200px"
          onConfirm={() => {
            props.remove("poll", data._id);
            setRemoved(true);
          }}
          title="Are you sure?"
          closeClass="default"
          confirmClass="danger"
        >
          Are you sure you want to delete {data.title}?
        </ModalSet>
      </div>
    </div>
  );
  return !removed ? (
    <Card
      classes={props.selected && !editing ? "decorated" : ""}
      onClick={props.onClick}
      title={title}
      footer=""
    >
      {editing ? (
        <Textarea
          label="Description"
          value={edit.desc}
          onChange={val => setEdit({ ...edit, desc: val })}
          width="100%"
        />
      ) : (
        <span>
          {bold("Description:")}
          <pre style={{ margin: "0px" }}>{data.desc}</pre>
        </span>
      )}
      <br />
      <br />
      <div className="lowerConetent">
        <div className="dates">
          <div>{bold("Start: ")}</div>
          {editing ? (
            <div className="flex-space-between">
              <DatePicker
                label="Start Date"
                value={new Date(edit.startDate)}
                onChange={val => setEdit({ ...edit, startDate: val })}
                touched
              />
              <TimePicker
                label="Start Time"
                value={new Date(edit.startDate)}
                onChange={val => setEdit({ ...edit, startDate: val })}
                touched
              />
            </div>
          ) : (
            <div>{dateFormat(data.startDate)}</div>
          )}
          <br />
          <div>{bold("End: ")}</div>
          {editing ? (
            <div className="flex-space-between flex-baseline">
              <DatePicker
                label="End Date"
                touched
                value={new Date(edit.endDate)}
                onChange={val => setEdit({ ...edit, endDate: val })}
              />
              <TimePicker
                label="End Time"
                touched
                value={new Date(edit.endDate)}
                onChange={val => setEdit({ ...edit, endDate: val })}
              />
            </div>
          ) : (
            dateFormat(data.endDate)
          )}
        </div>
        <br />
        <div className="otherInfo">
          <div>
            {bold("Who can view results: ")}
            {editing ? (
              <Dropdown
                clicked={true}
                label="Viewable By"
                values={["Admins", "Sponsors", "Teachers", "Students", "All"]}
                value={edit.viewableBy}
                onChange={val => setEdit({ ...edit, viewableBy: val })}
              />
            ) : (
              data.viewableBy
            )}
          </div>
          <div>
            {bold("Who can vote? ")}
            {editing ? (
              <Input
                value={gc}
                onChange={val => setGc(val)}
                onEnter={() => {
                  if (isNaN(parseInt(gc)) || gc.length !== 4) {
                    alert("Enter a four digit year");
                    return;
                  }
                  if (edit.gradYears.includes(gc)) {
                    setGc("");
                    return;
                  }
                  setEdit({
                    ...edit,
                    gradYears: [...edit.gradYears, gc]
                  });
                  setGc("");
                }}
                label="Add Year"
              />
            ) : null}
            {edit.gradYears.map((eVal, index) => (
              <div key={eVal + index}>
                <span
                  style={{ paddingLeft: "10px" }}
                  onClick={() => {
                    setEdit(() => {
                      let c = [];
                      edit.gradYears.forEach((val, i) =>
                        i === index ? null : c.push(val)
                      );
                      return { ...edit, gradYears: c };
                    });
                  }}
                  className={editing ? "hov-delete" : null}
                >
                  - {eVal}
                </span>
              </div>
            ))}
          </div>
        </div>
        {editing ? (
          <div className="card-footer">
            <br />
            <button
              onClick={() => {
                props.onSave(edit);
                setEditing(false);
              }}
              className="btn primary wide"
            >
              Save
            </button>
          </div>
        ) : null}
      </div>
    </Card>
  ) : (
    <Alert variant="warning">{titlecase(data.title)} has been removed.</Alert>
  );
};

export default PollCard;
