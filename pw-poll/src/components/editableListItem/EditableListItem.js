import React, { useState } from "react";
import { EditSVG } from "./../svg";
import Input from "./../form/input/Input";

import "./editableListItem.css";

export default function EditableListItem(props) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({
    original: props.value,
    current: props.value
  });
  const [show, setShow] = useState(true);
  return show && values.original !== "" ? (
    <div className="eliWrapper">
      <div style={{ width: "calc(90%)" }}>
        {editing ? (
          <Input
            label={"Option"}
            value={values.current}
            width={"var(--ta-width)"}
            onChange={val => setValues({ ...values, current: val })}
            onEnter={() => {
              props.onSave(values.current);
              setEditing(false);
            }}
          />
        ) : (
          <div
            onClick={() => {
              props.onSave("");
              setShow(false);
            }}
            className="eliText"
          >
            {"- " + values.current}
          </div>
        )}
      </div>
      <div className="eliSvg">
        {editing ? (
          <button
            onClick={e => {
              e.preventDefault();
              props.onSave(values.current);
              setEditing(false);
            }}
            className="btn btn-small primary"
          >
            Save
          </button>
        ) : (
          <EditSVG onClick={() => setEditing(true)} />
        )}
      </div>
    </div>
  ) : null;
}
