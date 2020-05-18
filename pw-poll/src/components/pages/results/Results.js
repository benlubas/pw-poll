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
import PageHead from "../../PageHead";

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

  const setPoll = (id) => {
    hist.push("/results/" + id);
  };

  //!this page needs to be updated for the quesiton.type.options.choose thing
  const pollList = loading ? (
    <LoadingScreen />
  ) : (
    <>
      <PageHead title="Results" />
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
          </div>,
        ])}
      </Table>
    </>
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
            <PageHead
              title={titlecase(polls.find((elem) => elem._id === pollID).title)}
            />
          </div>
          <QuestionsWithResults
            poll={polls.find((elem) => elem._id === pollID)}
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
          {question.type.str === "CS" ? (
            <CSResults key={question._id} question={question} />
          ) : question.type.str === "OE" ? (
            <OEResults key={question._id} question={question} />
          ) : question.type.str === "MC" ? (
            <MCResults key={question._id} question={question} />
          ) : null}
        </div>
      ))}
    </>
  );
};
