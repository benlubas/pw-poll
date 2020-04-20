import React from "react";
import { useSecureFetch } from "../../../hooks/useSecureFetch";
import LoadingScreen from "../../loadingScreen/LoadingScreen";
import Table from "./../../table/Table";
import { url } from "../../../url";
import { useParams, useHistory } from "react-router";
import { titlecase } from "../../../pipes";
import CSResults from "./CSResults";
import OEResults from "./OEResults";
import MCResults from "./MCResults";

import "./results.css";

export default function Results() {
  const [polls, loading] = useSecureFetch(url + "poll/");
  const { pollID } = useParams();
  const hist = useHistory();

  const checkDate = (start, end) => {
    if (new Date(start) < new Date()) {
      if (new Date(end) < new Date()) {
        return "Final";
      }
      return "Open";
    }
    return "Closed";
  };

  const setPoll = id => {
    hist.push("/results/" + id);
  };

  const pollList = loading ? (
    <LoadingScreen />
  ) : (
    <Table headers={["Poll", "Status"]}>
      {polls.map((val, index) => [
        titlecase(val.title),
        <div className="flex-space-between">
          <div>{checkDate(val.startDate, val.endDate)}</div>
          <button
            style={{ fontStyle: "italic" }}
            className="btn primary"
            onClick={() => setPoll(val._id)}
          >
            Results &gt;&gt;
          </button>
        </div>
      ])}
    </Table>
  );

  return (
    <div className="page-container">
      {pollID === "select" ? (
        pollList
      ) : loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="resultsItem">
            <div className="big-text">
              {titlecase(polls.find(elem => elem._id === pollID).title)}
            </div>
            <div className="small-text link" onClick={() => hist.goBack()}>
              &lt;&lt; Back
            </div>
          </div>
          <QuestionsWithResults
            poll={polls.find(elem => elem._id === pollID)}
          />
        </>
      )}
    </div>
  );
}

const QuestionsWithResults = ({ poll, ...props }) => {
  const [questions, questionsLoading] = useSecureFetch(
    url + "question/votes/" + poll._id
  );

  return questionsLoading ? (
    <LoadingScreen />
  ) : (
    <>
      {questions.map((question, index) => (
        <div key={question._id} className="resultsItem">
          {question.type === "CS" ? (
            <CSResults key={question._id} question={question} />
          ) : question.type === "OE" ? (
            <OEResults key={question._id} question={question} />
          ) : (
            <MCResults key={question._id} question={question} />
          )}
        </div>
      ))}
    </>
  );
};
