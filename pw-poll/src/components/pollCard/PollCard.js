import React, { useState } from "react";
import { titlecase, dateFormat, bold } from "../../pipes";
import Alert from "./../alert/Alert";
import { ModalSet } from "./../modal/Modal";
import Textarea from "./../form/textarea/Textarea";
import Input from "./../form/input/Input";

import Card from "../card/Card";
import { CircleXSVG, EditSVG } from "../svg";
import DatePicker from "../form/datePicker/DatePicker";
import Dropdown from "../form/dropdown/Dropdown";

import "./pollCard.css";

const PollCard = props => {
  const [removed, setRemoved] = useState(false);
  const [editing, setEditing] = useState({ ...props.data });

  //controlled form value for grad year who can vote input
  const [gc, setGc] = useState("");

  const title = (
    <div className="pollCardTitle">
      <span>
        {props.edit ? (
          <Input
            label="Title"
            value={editing.title}
            onChange={val => setEditing({ ...editing, title: val })}
          />
        ) : (
          titlecase(props.data.title)
        )}
      </span>
      <div className="cardButtons">
        {props.editable && !props.edit ? (
          <EditSVG onClick={() => props.onEdit(props.num)} />
        ) : props.edit ? (
          <div
            onClick={() => {
              setEditing(props.data);
              props.onDiscardChanges(props.num);
            }}
          >
            <button className="btn btn-small">Discard Changes</button>
          </div>
        ) : null}
        <ModalSet
          customTrigger={<CircleXSVG />}
          height="200px"
          onConfirm={() => {
            props.remove("poll", props.data._id);
            setRemoved(true);
          }}
          title="Are you sure?"
          closeClass="default"
          confirmClass="danger"
        >
          Are you sure you want to delete {props.data.title}?
        </ModalSet>
      </div>
    </div>
  );
  return !removed ? (
    <Card
      classes={props.classes}
      onClick={props.onClick}
      title={title}
      footer=""
    >
      {props.edit ? (
        <Textarea
          label="Description"
          value={editing.desc}
          onChange={val => setEditing({ ...editing, desc: val })}
          width="100%"
        />
      ) : (
        <span>
          {bold("Description:")}
          <pre style={{ margin: "0px" }}>{props.data.desc}</pre>
        </span>
      )}
      <br />
      <br />
      <div className="lowerConetent">
        <div className="dates">
          {bold("Start:")}{" "}
          {props.edit ? (
            <DatePicker
              clicked={true}
              value={
                editing.startDate.length > 10
                  ? editing.startDate.substr(0, 5) +
                    editing.startDate.substr(5, 3) +
                    editing.startDate.substr(8, 2)
                  : editing.startDate
              }
              label="Start Date"
              onChange={val => setEditing({ ...editing, startDate: val })}
            />
          ) : (
            dateFormat(props.data.startDate)
          )}
          <br />
          {bold("End: ")}
          {props.edit ? (
            <DatePicker
              clicked={true}
              value={
                editing.endDate.length > 10
                  ? editing.endDate.substr(0, 5) +
                    editing.endDate.substr(5, 3) +
                    editing.endDate.substr(8, 2)
                  : editing.endDate
              }
              label="End Date"
              onChange={val => setEditing({ ...editing, endDate: val })}
            />
          ) : (
            dateFormat(props.data.endDate)
          )}
        </div>
        <div className="otherInfo">
          <div>
            {bold("Who can view results: ")}
            {props.edit ? (
              <Dropdown
                clicked={true}
                label="Viewable By"
                values={["Admins", "Sponsors", "Teachers", "Students", "All"]}
                value={editing.viewableBy}
                onChange={val => setEditing({ ...editing, viewableBy: val })}
              />
            ) : (
              props.data.viewableBy
            )}
          </div>
          <div>
            {bold("Who can vote? ")}
            {props.edit ? (
              <Input
                value={gc}
                onChange={val => setGc(val)}
                onEnter={() => {
                  if (isNaN(parseInt(gc)) || gc.length !== 4) {
                    alert("Enter a four digit year");
                    return;
                  }
                  if (editing.gradYears.includes(gc)) {
                    setGc("");
                    return;
                  }
                  setEditing({
                    ...editing,
                    gradYears: [...editing.gradYears, gc]
                  });
                  setGc("");
                }}
                label="Add Year"
              />
            ) : null}
            {editing.gradYears.map((eVal, index) => (
              <div key={eVal + index}>
                <span
                  style={{ paddingLeft: "10px" }}
                  onClick={() => {
                    setEditing(() => {
                      let c = [];
                      editing.gradYears.forEach((val, i) =>
                        i === index ? null : c.push(val)
                      );
                      return { ...editing, gradYears: c };
                    });
                  }}
                  className={props.edit ? "hov-delete" : null}
                >
                  - {eVal}
                </span>
              </div>
            ))}
          </div>
        </div>
        {props.edit ? (
          <div className="card-footer">
            <br />
            <button
              onClick={() => props.save(editing)}
              className="btn primary wide"
            >
              Save
            </button>
          </div>
        ) : null}
      </div>
    </Card>
  ) : (
    <Alert variant="warning">
      {titlecase(props.data.title)} has been removed.
    </Alert>
  );
};

export default PollCard;
