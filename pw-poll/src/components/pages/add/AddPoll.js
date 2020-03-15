import React, { useState } from "react";
import Input from "../../form/input/Input";
import DatePicker from "../../form/datePicker/DatePicker";
import Checkbox from "../../form/checkbox/Checkbox";
import Dropdown from "../../form/dropdown/Dropdown";
import Textarea from "../../form/textarea/Textarea";
import { url } from "../../../url";

import "./addPoll.css";

export default function AddPoll(props) {
  const [values, setValues] = useState({
    title: "",
    desc: "",
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    viewInProgress: false,
    questions: [],
    gradYears: [],
    viewableBy: ""
  });
  const [ng, setNg] = useState("");

  const validate = () => {
    if (
      values.name !== "" &&
      values.viewableBy !== "" &&
      Date.parse(values.startDate) < Date.parse(values.endDate)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const submit = async () => {
    const purl = url + `poll/`;
    let pollRes = await fetch(purl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...values })
    });
    pollRes = await pollRes.json();
    return pollRes._id;
  };

  return (
    <div className="pollFormWrapper">
      <div className="group">
        <Input
          label="Poll Name"
          value={values.title}
          onChange={name => setValues({ ...values, title: name })}
          width="100%"
        />
        <div>
          <Textarea
            label="Description"
            value={values.desc}
            onChange={newDesc => setValues({ ...values, desc: newDesc })}
            width="100%"
          />
        </div>
        <DatePicker
          label="Start Date"
          value={values.startDate}
          onChange={date => setValues({ ...values, startDate: date })}
        />
        <DatePicker
          label="End Date"
          value={values.endDate}
          onChange={date => setValues({ ...values, endDate: date })}
        />
        <Checkbox
          label="Viewable in Progress"
          onChange={val => setValues({ ...values, viewInProgress: val })}
        />
      </div>
      <div>
        <div className="header">
          Select the lowest level who can view results.
        </div>
        <Dropdown
          style={{ marginTop: "5px" }}
          label="Viewable By"
          values={["Admins", "Sponsors", "Teachers", "Students", "All"]}
          value={values.viewableBy}
          onChange={val => setValues({ ...values, viewableBy: val })}
        />
        <div className="header">Who can vote in the poll?</div>
        <Input
          label="Grad Year"
          value={ng}
          onChange={val => setNg(val)}
          onEnter={() => {
            let c = [...values.gradYears];
            if (isNaN(parseInt(ng)) || ng.length !== 4) {
              alert("Must be a valid four digit year");
              setNg("");
              return;
            }
            if (!c.includes(ng)) {
              c.push(ng);
            }
            setNg("");
            setValues({ ...values, gradYears: c });
          }}
        />
        {values.gradYears.map((y, i) => (
          <div
            className="hov-delete"
            onClick={() => {
              let c = [];
              values.gradYears.forEach((item, indx) =>
                indx === i ? null : c.push(item)
              );
              setValues({ ...values, gradYears: c });
            }}
            key={"" + y + i}
          >
            - {y}
          </div>
        ))}
      </div>
      <button
        onClick={async e => {
          e.preventDefault();
          if (validate()) {
            props.save(await submit(), values);
            setValues({
              title: "",
              desc: "",
              startDate: new Date().toISOString().substr(0, 10),
              endDate: new Date().toISOString().substr(0, 10),
              viewInProgress: false,
              questions: [],
              gradYears: [],
              viewableBy: ""
            });
          } else {
            console.log("invalid");
          }
        }}
        className="btn wide primary"
      >
        Save
      </button>
    </div>
  );
}
