import React, { useState, useEffect } from "react";
import { useSecureFetch } from "./../../hooks/useSecureFetch";
import { securePut } from "./../../hooks/securePut";
import { useParams, useHistory } from "react-router";
import Card from "./../card/Card";
import LoadingScreen from "../loadingScreen/LoadingScreen";

import { url } from "./../../url";
import RadioGroup from "../form/radioGroup/RadioGroup";
import Textarea from "../form/textarea/Textarea";
import StudentSelector from "../form/studentSelector/StudentSelector";

export default function StudentViewPoll(props) {
  const history = useHistory();
  const { id } = useParams();
  const [poll, loading] = useSecureFetch(url + "poll/" + id);
  const [questions, questionsLoading] = useSecureFetch(
    url + "question/poll/" + id
  );

  const [answers, setAnswers] = useState(null);
  useEffect(() => {
    if (questions)
      setAnswers(
        questions.map((v) => ({
          _id: v._id,
          value: v.vote,
        }))
      );
  }, [questions]);

  const submit = () => {
    let a = [];
    answers.forEach((ans) => {
      if (ans.value !== null) {
        a.push(ans);
      }
    });
    a.forEach((ans) => {
      securePut(url + "question/addVote/" + ans._id, { vote: ans.value });
    });
  };

  const questionContent = questionsLoading ? (
    <LoadingScreen />
  ) : (
    questions.map((q, i) => (
      <Card title={q.text} key={q._id}>
        {q.type.substr(0, 2) === "MC" ? (
          //MC
          <>
            <div className="small-text">
              Please Select {q.type.charAt(q.type.length - 1)} Option
              {q.type.charAt(q.type.length - 1) !== "1" ? "s" : ""}
            </div>
            <RadioGroup
              value={answers ? answers[i].value : null}
              onChange={(val) => {
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
            onChange={(val) => {
              let c = [...answers];
              c[i].value = val;
              setAnswers(c);
            }}
          />
        ) : q.type.substr(0, 2) === "CS" ? (
          <div style={{ width: "var(--ta-width)" }}>
            <div>
              Choose {q.type.substr(2)} student{" "}
              {parseInt(q.type.substr(2)) === 1 ? "" : "s"}:
            </div>
            <section className="selected-students">
              {answers &&
                answers[i] &&
                answers[i].value &&
                Array.isArray(answers[i].value) &&
                answers[i].value.map((n, ni) => (
                  <div className="flex-space-between" key={ni}>
                    <span style={{ marginBottom: "5px" }}>{n.name}</span>
                    <i
                      onClick={() => {
                        let c = [...answers];
                        let t = c[i].value.filter(
                          (filterVal) => filterVal.id !== n.id
                        );
                        c[i].value = t;
                        setAnswers(c);
                      }}
                      className="pointer fas fa-trash"
                    ></i>
                  </div>
                ))}
            </section>
            <br />
            <StudentSelector
              label="Choose a Student"
              value={
                answers &&
                answers[i] &&
                answers[i].value &&
                Array.isArray(answers[i].value)
                  ? answers[i].value
                  : []
              }
              gradYear={q.options[0]}
              onFullName={(val) => {
                let c = [...answers];
                if (Array.isArray(c[i].value)) {
                  if (
                    c[i].value.find(
                      (selected) => selected.id === val.id + ""
                    ) === undefined &&
                    val.id !== null
                  ) {
                    c[i].value.push(val);
                  }
                } else {
                  c[i].value = [val];
                }
                //check for number of answers;
                console.log(parseInt(q.type.substr(2)));
                console.log(c[i].value.length);
                console.log(c[i].value);
                if (c[i].value.length > parseInt(q.type.substr(2))) {
                  c[i].value.shift();
                }
                setAnswers(c);
              }}
            />
            <br />
          </div>
        ) : (
          console.log("invalid question type: ", q.type)
        )}
      </Card>
    ))
  );

  return (
    <div className="page-container">
      <div className="big-text">{!loading ? poll.title : "Loading"}</div>
      <div className="small-text link" onClick={() => history.goBack()}>
        &lt;&lt; Back
      </div>

      {questionContent}
      {!questionsLoading ? (
        <button
          onClick={async (e) => {
            e.preventDefault();
            submit();
            history.goBack();
          }}
          className="btn primary wide"
        >
          Submit
        </button>
      ) : null}
    </div>
  );
}
