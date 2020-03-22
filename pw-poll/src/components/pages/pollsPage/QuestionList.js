import React, { useState, useEffect } from "react";
import { useSecureFetch } from "../../../hooks/useSecureFetch";
import { url } from "./../../../url";
import LoadingScreen from "./../../loadingScreen/LoadingScreen";
import QuestionCard from "./QuestionCard";
import Card from "./../../card/Card";
import AddQuestion from "./AddQuestion";

export default function QuestionList({ selectedPoll, remove, ...props }) {
  const [questionData] = useSecureFetch(url + "question/");
  const [questions, setQuestions] = useState(questionData);
  useEffect(() => {
    setQuestions(questionData);
  }, [questionData]);

  let shownQuestions = 0;
  const questionContent =
    questions === null ? (
      <LoadingScreen />
    ) : (
      questions.map((question, index) =>
        selectedPoll === question.pollID ? (
          <QuestionCard
            key={question._id}
            info={question}
            index={shownQuestions++}
            remove={remove}
          />
        ) : null
      )
    );
  return (
    <div className="questionList">
      {questionContent}
      {selectedPoll === null || selectedPoll === "newPoll" ? (
        <div className="noQuestions questionWrapper">
          <div>Choose a poll</div>
        </div>
      ) : shownQuestions === 0 && !props.showAddQuestion ? (
        <div className="noQuestions questionWrapper">
          <div>
            <div>There aren't any questions yet</div>
            <button
              onClick={() => props.setShowAddQuestion(true)}
              className="btn primary"
            >
              Add One!
            </button>
          </div>
        </div>
      ) : props.showAddQuestion ? (
        <div className="questionWrapper">
          <Card
            title={
              <div className="flex-space-between">
                <div>New Question</div>
                <div>
                  <button
                    onClick={() => props.setShowAddQuestion(false)}
                    className="btn btn-small"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            }
          >
            <AddQuestion
              save={saved => {
                setQuestions([...questions, saved]);
                props.setShowAddQuestion(false);
              }}
              number={shownQuestions + 1}
              _id={selectedPoll}
            />
          </Card>
        </div>
      ) : (
        <Card title="Add a Question">
          {props.showAddQuestion ? (
            <AddQuestion _id={selectedPoll} />
          ) : (
            <button
              onClick={() => props.setShowAddQuestion(true)}
              className="btn primary wide"
            >
              Add
            </button>
          )}
        </Card>
      )}
    </div>
  );
}
