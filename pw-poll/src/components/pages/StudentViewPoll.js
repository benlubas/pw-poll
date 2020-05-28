import React, { useState, useEffect, useContext } from "react";
import { useSecureFetch } from "./../../hooks/useSecureFetch";
import { securePut } from "./../../hooks/securePut";
import { useParams, useHistory } from "react-router";
import Card from "./../card/Card";
import LoadingScreen from "../loadingScreen/LoadingScreen";

import { url } from "./../../url";
import RadioGroup from "../form/radioGroup/RadioGroup";
import Textarea from "../form/textarea/Textarea";
import StudentSelector from "../form/studentSelector/StudentSelector";
import PageHead from "../PageHead";
import UserProvider from "../../providers/UserProvider";

export default function StudentViewPoll(props) {
  const history = useHistory();
  const session = useContext(UserProvider.context);
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
          value: v.response,
          qID: v.qID,
          vID: v.vID,
          pollID: v.pollID,
          type: v.type,
        }))
      );
  }, [questions]);
  const submit = () => {
    if (session && !session.admin) {
      let a = [];
      answers.forEach((ans) => {
        if (ans.value !== null) {
          a.push({ ...ans });
        }
      });
      a.forEach((ans) => {
        console.log(ans);
        securePut(url + "question/addVote/" + ans.vID, {
          pollID: id,
          vote:
            ans.type === "OE"
              ? [ans.value.replace(/['"\\]/g, "\\$&")]
              : !Array.isArray(ans.value)
              ? []
              : ans.value,
          qID: ans.qID,
        });
      });
    }
  };

  const questionContent = questionsLoading ? (
    <LoadingScreen />
  ) : (
    questions.map((q, i) => (
      <Card title={q.text} key={q._id + q.text}>
        {q.type === "MC" ? (
          //MC
          <>
            <div className="small-text">
              Please Select {q.typeOptions.choose} Option
              {q.typeOptions.choose !== 1 ? "s" : ""}
            </div>
            <RadioGroup
              value={answers ? answers[i].value : null}
              onChange={(val) => {
                let c = [...answers];
                c[i].value = val;
                setAnswers(c);
              }}
              choose={parseInt(q.typeOptions.choose)}
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
        ) : q.type === "CS" ? (
          <div style={{ width: "var(--ta-width)" }}>
            <div>
              Choose {q.typeOptions.choose} student
              {parseInt(q.typeOptions.choose) === 1 ? "" : "s"}:
            </div>
            <section className="selected-students">
              {answers &&
                answers[i] &&
                answers[i].value &&
                Array.isArray(answers[i].value) &&
                answers[i].value.map((n, ni) => (
                  <div className="flex-space-between" key={ni}>
                    <span style={{ marginBottom: "5px" }}>{n}</span>
                    <i
                      onClick={() => {
                        let c = [...answers];
                        let t = c[i].value.filter(
                          (filterVal) => filterVal !== n
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
              gender={q.typeOptions.gender}
              onFullName={(val) => {
                let c = [...answers];
                if (Array.isArray(c[i].value)) {
                  if (
                    c[i].value.find((selected) => selected === val) ===
                      undefined &&
                    val !== ""
                  ) {
                    c[i].value.push(val);
                  }
                } else {
                  c[i].value = [val];
                }
                if (c[i].value.length > parseInt(q.typeOptions.choose)) {
                  c[i].value.shift();
                }
                setAnswers(c);
              }}
            />
            <br />
          </div>
        ) : (
          console.log("invalid question type (this shouldn't happen): ", q.type)
        )}
      </Card>
    ))
  );

  return (
    <div className="page-container">
      <PageHead title={!loading ? poll.title : "Loading..."} />
      {!loading ? console.log("title", poll.title) : null}
      {questionContent}
      {!questionsLoading && !session.admin ? (
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
      ) : session.admin ? (
        <button className="btn primary wide">
          This button doesn't work for admins
        </button>
      ) : null}
    </div>
  );
}
