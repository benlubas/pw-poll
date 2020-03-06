import React, { useState } from "react";
import { useFetch } from "./../../hooks/useFetch";
import Card from "./../card/Card";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import Alert from "./../alert/Alert";

import { url } from "./../../url";
import RadioGroup from "../form/radioGroup/RadioGroup";
import Textarea from "../form/textarea/Textarea";

export default function StudentViewPoll(props) {
  const [questions, questionsLoading] = useFetch(
    url + "question/poll/" + props.pollID
  );
  const [answers, setAnswers] = useState([]);
  const [state, setState] = useState("default");

  const changeAns = (val, i) => {
    let cln = [...answers];
    cln[i] = { ...val, email: "benmlubas@gmail.com" };
    setAnswers(cln);
  };
  const validate = () => {
    for (let i = 0; i < answers.length; i++) {
      if (answers === undefined) {
        return false;
      }
      if (answers[i].value === "") {
        return false;
      }
    }
    return answers.length === questions.length;
  };

  const questionContent = questionsLoading ? (
    <LoadingScreen />
  ) : (
    questions.map((q, i) => (
      <Card title={q.text} key={q._id}>
        {q.options.length > 0 ? (
          //MC
          <RadioGroup
            value={answers[i] ? answers[i].value : null}
            onChange={val => changeAns({ value: val, key: q._id }, i)}
            options={q.options}
          />
        ) : (
          //OE
          <Textarea
            label="Type your answer here"
            width="var(--ta-width)"
            value={answers[i] ? answers[i].value : ""}
            onChange={val => changeAns({ value: val, key: q._id }, i)}
          />
        )}
      </Card>
    ))
  );

  return state === "default" ? (
    <>
      {questionContent}
      <button
        onClick={async e => {
          e.preventDefault();
          if (validate()) {
            console.log("VALID");
            try {
              const res = await fetch(url + "question/addVotes", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(answers)
              });
              console.log(await res.json());
              setAnswers([]);
              setState("success");
            } catch (err) {
              console.error(err);
            }
          } else {
            console.log("Form failed to validate");
          }
        }}
        className="btn success"
      >
        Submit
      </button>
    </>
  ) : (
    <Alert variant="success">Thank you for completing the poll!</Alert>
  );
}
