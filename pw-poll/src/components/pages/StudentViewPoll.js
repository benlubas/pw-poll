import React, { useState, useContext, useEffect } from "react";
import { useSecureFetch } from "./../../hooks/useSecureFetch";
import { securePut } from "./../../hooks/securePut";
import { useParams, useLocation } from "react-router";
import Card from "./../card/Card";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import Alert from "./../alert/Alert";

import { url } from "./../../url";
import RadioGroup from "../form/radioGroup/RadioGroup";
import Textarea from "../form/textarea/Textarea";
import UserProvider from "../../providers/UserProvider";

export default function StudentViewPoll(props) {
  const session = useContext(UserProvider.context);
  const loc = useLocation();
  // console.log("loc: ", loc);
  // console.log(loc.pathname.match(/(?<=\/vote\/)\S*/g)[0]);
  const [questions, questionsLoading] = useSecureFetch(
    url + "question/poll/" + loc.pathname.match(/(?<=\/vote\/)\S*/g)[0]
  );
  console.log("Questions", questions);
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
      <Card title={q.text} key={q._id}>
        {q.options.length > 0 ? (
          //MC
          <RadioGroup
            value={answers ? answers[i].value : null}
            onChange={val => {
              let c = [...answers];
              c[i].value = val;
              setAnswers(c);
            }}
            options={q.options}
          />
        ) : (
          //OE
          <Textarea
            label="Type your answer here"
            width="var(--ta-width)"
            value={answers[i] ? answers[i].value : ""}
            onChange={val => {
              let c = [...answers];
              c[i].value = val;
              setAnswers(c);
            }}
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
          submit();
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
