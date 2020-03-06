import React, { useState, useRef } from "react";
import Input from "../../form/input/Input";
import DatePicker from "./../../form/datePicker/DatePicker";
import Checkbox from "./../../form/checkbox/Checkbox";
import Dropdown from "./../../form/dropdown/Dropdown";
import Textarea from "./../../form/textarea/Textarea";
import { ModalSet } from "./../../modal/Modal";
import RadioGroup from "./../../form/radioGroup/RadioGroup";
import { EditSVG, CircleXSVG } from "./../../svg";
import { url } from "./../../../url";

import "./addPoll.css";

export default function AddPoll(props) {
  const [values, setValues] = useState({
    title: "",
    desc: "",
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    viewInProgress: false,
    questions: [],
    viewableBy: ""
  });
  const [q, setQ] = useState({ text: "", options: [], type: null });
  const [newOption, setNewOption] = useState("");
  const [editQuestion, setEditQuestion] = useState(-1);
  const modalTrigger = useRef(null);
  const getEditedQuestion = index => {
    let temp = values.questions;
    temp[index] = q;
    return temp;
  };
  const deleteOption = num => {
    let n = [...q.options];
    n.splice(num - 1, 1);
    setQ({ ...q, options: n });
  };
  const confirmValue = (num, value) => {
    let n = [...q.options];
    n[num - 1] = value;
    setQ({ ...q, options: n });
  };
  const removeQuestion = i => {
    let op = values.questions;
    op.splice(i, 1);
    setValues({ ...values, questions: op });
  };
  const validateAndSubmit = async () => {
    if (
      values.name !== "" &&
      Date.parse(values.startDate) < Date.parse(values.endDate) &&
      values.questions.length > 0
    ) {
      //then its good, we can submit it
      const purl = url + `poll/`;
      let pollRes = await fetch(purl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: values.title,
          desc: values.desc,
          startDate: values.startDate,
          endDate: values.endDate,
          viewInProgress: values.viewInProg,
          viewableBy: values.viewableBy
        })
      });
      pollRes = await pollRes.json();
      const pollID = pollRes._id;
      console.log("pollRes: ", pollRes);
      const qurl = url + `question/multi/`;
      let questionRes = await fetch(qurl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          arr: values.questions.map((val, ind) => ({
            ...val,
            pollID: pollID,
            number: ind
          }))
        })
      });
      console.log("Done");
      questionRes = await questionRes.json();
      console.log("questionRes", questionRes);
    } else {
      alert("Form is incomplete");
    }
  };

  return (
    <div className="pollFormWrapper">
      <h1>Create a Poll</h1>
      <div className="group">
        <Input
          label="Poll Name"
          value={values.title}
          onChange={name => setValues({ ...values, title: name })}
        />
        <div>
          <Textarea
            label="Description"
            value={values.desc}
            onChange={newDesc => setValues({ ...values, desc: newDesc })}
            width="50%"
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
        <ModalSet
          triggerColor="success"
          triggerRef={modalTrigger}
          trigger="Add a Question"
          title="Add a Question"
          onConfirm={() => {
            if (
              q.text !== "" &&
              ((q.type === "Multiple Choice" && q.options.length > 0) ||
                q.type === "Open Ended")
            ) {
              if (editQuestion === -1) {
                setValues({ ...values, questions: [...values.questions, q] });
              } else {
                let index = editQuestion;
                setEditQuestion(-1);
                setValues({
                  ...values,
                  questions: getEditedQuestion(index)
                });
              }
              setQ({ text: "", options: [], type: null });
              return true;
            }
            return false;
          }}
          onClose={() => setQ({ text: "", options: [], type: null })}
        >
          <Input
            onChange={val => setQ({ ...q, text: val })}
            value={q.text}
            label="Question"
            width="100%"
          />
          <RadioGroup
            val={q.type}
            options={["Multiple Choice", "Open Ended"]}
            prompt="Type"
            onChange={val => setQ({ ...q, type: val })}
          />
          {q.type === "Multiple Choice" ? (
            <>
              <ol className="mcOptions">
                {q.options.map((v, i) => (
                  <MCOption
                    key={v + i}
                    initialVal={v}
                    deleteOption={deleteOption}
                    confirmValue={confirmValue}
                    num={i + 1}
                  />
                ))}
              </ol>
              <Input
                onEnter={() => {
                  if (newOption !== "") {
                    setQ({ ...q, options: [...q.options, newOption] });
                    setNewOption("");
                  }
                }}
                value={newOption}
                onChange={newV => setNewOption(newV)}
                label={"Option " + (q.options.length + 1)}
              />
              <div
                className={`${newOption !== "" ? "plusActive" : ""} plusBtn`}
                onClick={() => {
                  if (newOption !== "") {
                    setQ({ ...q, options: [...q.options, newOption] });
                    setNewOption("");
                  }
                }}
              ></div>
            </>
          ) : null}
        </ModalSet>
        {values.questions.map((v, i) => (
          <div className="card" key={v + i}>
            <div className="title">
              {v.text}
              <div className="right">
                <EditSVG
                  onClick={() => {
                    setEditQuestion(i);
                    setQ({ ...values.questions[i] });
                    modalTrigger.current.click();
                  }}
                />
                <CircleXSVG
                  onClick={() => {
                    removeQuestion(i);
                  }}
                />
              </div>
            </div>
            <div className="content">
              Type: {v.type}
              <br />
              {v.type === "Multiple Choice"
                ? v.options.map((oV, oI) => (
                    <div key={oV + oI}>
                      Option {oI + 1} - {oV}
                    </div>
                  ))
                : null}
            </div>
            <div className="card-footer"></div>
          </div>
        ))}
      </div>
      <div>
        <div className="header">
          Please select the lowest level who can view results.
        </div>
        <Dropdown
          style={{ marginTop: "5px" }}
          label="Viewable By"
          values={["Admins", "Sponsors", "Teachers", "Students", "All"]}
          value={values.viewableBy}
          onChange={val => setValues({ ...values, viewableBy: val })}
        />
      </div>
      <button
        onClick={e => {
          e.preventDefault();
          validateAndSubmit();
        }}
        className="btn success"
      >
        Submit
      </button>
    </div>
  );
}

function MCOption(props) {
  const [value, setValue] = useState(props.initialVal);

  const [editing, setEditing] = useState(false);
  return (
    <li className="newOption">
      {!editing ? (
        <>
          <span
            onClick={() => props.deleteOption(props.num)}
            className="optionText"
          >
            {value}
          </span>
          <EditSVG onClick={() => setEditing(true)} className="optionEdit" />
        </>
      ) : (
        <Input
          label={"Option " + props.num}
          value={value}
          onChange={val => setValue(val)}
          onEnter={() => props.confirmValue(props.num, value)}
        />
      )}
    </li>
  );
}
