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
  return show ? (
    <div className="eliWrapper">
      <div>
        {editing ? (
          <Input
            label={"Option " + props.num}
            value={values.current}
            onChange={val => setValues({ ...values, current: val })}
          />
        ) : (
          <div
            onClick={() => {
              props.remove("question", props._id);
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
              setEditing(false);
            }}
            className="btn btn-small"
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
