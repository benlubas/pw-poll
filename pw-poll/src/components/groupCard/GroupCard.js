import React, { useState } from "react";
import { ModalSet } from "../modal/Modal";
import Alert from "./../alert/Alert";

import "./groupCard.css";

export default function GroupCard(props) {
  const [removed, setRemoved] = useState(false);

  const confirm = async () => {
    //props.DBid
    console.log("id: ", props.DBid);
    let res = await fetch(`http://localhost:5000/group/${props.DBid}`, {
      method: "DELETE"
    });
    res = await res.json();
    setRemoved(res);
  };

  return !removed ? (
    <div className="card">
      <div className="title">{props.name}</div>
      <div className="content">{props.children}</div>
      <div className="card-footer">
        <ModalSet
          onConfirm={confirm}
          height="200px"
          trigger="Remove"
          title={`Delete ${props.title}?`}
          closeClass="default"
          confirmClass="danger"
        >
          Believe it or not, that button will actually delete the group. You
          won't get it back. So are you sure?
        </ModalSet>
      </div>
    </div>
  ) : (
    <Alert>Alright, {removed.name} is gone. You can't get it back. </Alert>
  );
}
