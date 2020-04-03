import React, { useState, useEffect } from "react";
import { useSecureFetch } from "./../../hooks/useSecureFetch";
import { securePut } from "./../../hooks/securePut";
import { useParams } from "react-router";
import Card from "./../card/Card";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import Alert from "./../alert/Alert";

import { url } from "./../../url";
import RadioGroup from "../form/radioGroup/RadioGroup";
import Textarea from "../form/textarea/Textarea";
import SearchableDropdown from "../form/searchableDropdown/SearchableDropdown";

export default function StudentViewPoll(props) {
  const { id } = useParams();
  const [questions, questionsLoading] = useSecureFetch(
    url + "question/poll/" + id
  );
  // console.log("Questions", questions);
  const [answers, setAnswers] = useState(null);
  useEffect(() => {
    if (questions)
      setAnswers(
        questions.map(v => ({
          _id: v._id,
          value: v.vote
        }))
      );
  }, [questions]);

  console.log("questions: ", questions);

  const [state, setState] = useState("default");

  const submit = () => {
    let a = [];
    answers.forEach(ans => {
      if (ans.value !== null) {
        a.push(ans);
      }
    });
    a.forEach(ans => {
      securePut(url + "question/addVote/" + ans._id, { vote: ans.value });
    });
  };

  const questionContent = questionsLoading ? (
    <LoadingScreen />
  ) : (
    questions.map((q, i) => (
      <Card
        title={q.text}
        key={q._id}
        classes={answers && answers[i].value !== null ? "decorated" : ""}
      >
        {q.type.substr(0, 2) === "MC" ? (
          //MC
          <>
            <div className="small-text">
              Please Select {q.type.charAt(q.type.length - 1)} Option
              {q.type.charAt(q.type.length - 1) !== "1" ? "s" : ""}
            </div>
            <RadioGroup
              value={answers ? answers[i].value : null}
              onChange={val => {
                let c = [...answers];
                c[i].value = val;
                setAnswers(c);
              }}
              choose={parseInt(q.type.charAt(q.type.length - 1))}
              options={q.options}
            />
          </>
        ) : q.type === "OE" ? (
          //OE
          <Textarea
            label="Type your answer here"
            width="var(--ta-width)"
            value={
              answers && answers[i] && answers[i].value ? answers[i].value : ""
            }
            onChange={val => {
              let c = [...answers];
              c[i].value = val;
              setAnswers(c);
            }}
          />
        ) : q.type === "CS" ? (
          <div style={{ width: "75%" }}>
            <SearchableDropdown
              label="Choose a Student"
              value={
                answers && answers[i] && answers[i].value
                  ? answers[i].value.id
                  : ""
              }
              gradYear={q.options[0]}
              onFullName={val => {
                let c = [...answers];
                c[i].value = val;
                setAnswers(c);
              }}
            />
          </div>
        ) : (
          console.log("invalid question type: ", q.type)
        )}
      </Card>
    ))
  );

  return state === "default" ? (
    <div className="studPollWrapper">
      {questionContent}
      {!questionsLoading ? (
        <button
          onClick={async e => {
            e.preventDefault();
            submit();
          }}
          className="btn primary wide"
        >
          Submit
        </button>
      ) : null}
    </div>
  ) : (
    <Alert variant="success">Thank you for completing the poll!</Alert>
  );
}
