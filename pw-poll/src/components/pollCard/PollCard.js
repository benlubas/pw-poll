import React, { useState } from "react";
import { titlecase, dateFormat, bold } from "../../pipes";
import Alert from "./../alert/Alert";
import { ModalSet } from "./../modal/Modal";
import Textarea from "./../form/textarea/Textarea";

import "./pollCard.css";
import Card from "../card/Card";
import { CircleXSVG, EditSVG } from "../svg";
import DatePicker from "../form/datePicker/DatePicker";
import RadioGroup from "../form/radioGroup/RadioGroup";
import Dropdown from "../form/dropdown/Dropdown";

const PollCard = props => {
  const [removed, setRemoved] = useState(false);
  const [editing, setEditing] = useState({ ...props.data });

  const title = (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <span>{titlecase(props.data.title)}</span>
      <div style={{ display: "flex" }}>
        {props.editable && !props.edit ? (
          <div onClick={() => props.onEdit(props.num)}>
            <EditSVG />
          </div>
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
          {bold("Description:")} {props.data.desc}
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
          {bold("End:")}{" "}
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
          <div
            style={
              props.edit ? { marginTop: "5px", position: "relative" } : null
            }
          >
            <span
              className="bold"
              style={props.edit ? { position: "absolute", top: "0px" } : null}
            >
              Results viewable in progress:
            </span>
            {props.edit ? (
              <RadioGroup
                options={["Yes", "No"]}
                value={editing.viewInProgress ? "Yes" : "No"}
                onChange={val =>
                  setEditing({ ...editing, viewInProgress: val === "Yes" })
                }
              />
            ) : props.data.viewInProgress ? (
              " Yes"
            ) : (
              " No"
            )}
          </div>
          <div>
            {bold("Who can view:")}{" "}
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
