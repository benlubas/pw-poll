import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import PollCard from "../pollCard/PollCard";
import Card from "./../card/Card";
import AddPoll from "./add/AddPoll";
import AddQuestion from "./add/AddQuestion";
import { bold } from "./../../pipes";
import { url } from "./../../url";

import "./pollsPage.css";
import { EditSVG, CircleXSVG, CirclePlusSVG } from "../svg";
import { ModalSet } from "../modal/Modal";
import EditableListItem from "../editableListItem/EditableListItem";
import Input from "./../form/input/Input";

const removeBlanks = arr => {
  let c = [];
  for (let s of arr) {
    if (s !== "") c.push(s);
  }
  return c;
};
const PollsPage = () => {
  const [questionData, qLoading] = useFetch(url + "question/");
  const [questions, setQuestions] = useState(null);
  if (!qLoading && questions === null) {
    setQuestions(questionData);
  }
  let shownQuestions = 1;

  const [pollData, loading] = useFetch(url + "poll/");
  const [polls, setPolls] = useState(null);
  if (!loading && polls === null) {
    setPolls(pollData);
  }

  const [selected, setSelected] = useState(null);

  const [editing, setEditing] = useState({ list: null, index: -1 });
  const [eq, setEq] = useState({ text: "", options: [] });

  const [newOption, setNewOption] = useState("");

  useLayoutEffect(() => {
    if (selected !== "newPoll") {
      setShowAddQuestion(false);
      setShowAddPoll(false);
    }
  }, [selected]);

  const remove = async (list, id, index) => {
    if (list === "question") {
      let temp = [...questions];
      temp.splice(index, 1);
      setQuestions(temp);
    }
    await fetch(url + list + "/" + id, {
      method: "DELETE"
    });
    if (list === "poll") {
      await fetch(url + "question/purge/" + id, {
        method: "DELETE"
      });
    }
  };
  const edit = (list, index) => {
    if (editing.index === -1) {
      setEditing({ list: list, index: index });
    } else {
      alert("Already editing");
    }
  };
  const saveQuestion = async (old, newInfo, index) => {
    const temp = [...questions];
    temp[index] = {
      ...old,
      options: removeBlanks(newInfo.options),
      text: newInfo.text
    };
    setQuestions(temp);
    try {
      fetch(url + "question/" + old.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(temp[index])
      });
    } catch (err) {
      console.error(err);
    }
  };
  const savePoll = async (newInfo, index) => {
    let temp = [...polls];
    temp[index] = newInfo;
    setPolls(temp);
    try {
      await fetch(url + "poll/" + newInfo._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newInfo)
      });
    } catch (err) {
      console.error(err);
    }
  };
  const pollContent =
    polls === null ? (
      <LoadingScreen />
    ) : (
      polls.map((poll, index) => (
        <div
          className={
            selected === poll._id
              ? "selectedPoll pollListCardWrapper"
              : "pollListCardWrapper"
          }
          key={poll._id}
        >
          <PollCard
            num={index}
            edit={editing.list === "poll" && editing.index === index}
            editable={true} // This should maybe be based on passport (who's logged in)
            classes={`${selected === poll._id ? "cardActive" : ""} ${
              !(editing.list === "poll" && editing.index === index) &&
              selected === poll._id
                ? "decorated"
                : ""
            }`}
            data={poll}
            key={poll._id}
            remove={remove}
            onClick={() => setSelected(poll._id)}
            onEdit={i => edit("poll", i)}
            save={vals => {
              savePoll(vals, index);
              setEditing({ ...editing, index: -1 });
            }}
            onDiscardChanges={i => {
              setEditing({ list: null, index: -1 });
            }}
          />
        </div>
      ))
    );

  const questionContent =
    questions === null ? (
      <LoadingScreen />
    ) : (
      questions.map((question, index) =>
        selected === question.pollID ? (
          <div
            key={question._id}
            className={
              selected === question.pollID
                ? "show questionWrapper"
                : "hide questionWrapper"
            }
          >
            <Card //Questions
              key={question._id}
              title={
                <div className="flex-space-between">
                  <span>
                    {editing.index === index && editing.list === "question" ? (
                      <Input
                        label="Question"
                        value={eq.text}
                        onChange={val => setEq({ ...eq, text: val })}
                        width="100%"
                      />
                    ) : (
                      shownQuestions++ + ") " + question.text
                    )}
                  </span>
                  <div style={{ display: "flex", alignContent: "center" }}>
                    {editing.list === "question" && editing.index === index ? (
                      <div>
                        <button
                          onClick={e => {
                            e.preventDefault();
                            setEditing({ ...editing, index: -1 });
                          }}
                          className="btn btn-small"
                        >
                          Discard Changes
                        </button>
                      </div>
                    ) : (
                      <EditSVG
                        onClick={() => {
                          setEditing({ list: "question", index: index });
                          //all of the information that would otherwise be stored in
                          //the ediableListItem component is now in eq.
                          setEq({
                            options: question.options,
                            text: question.text
                          });
                        }}
                      />
                    )}
                    <ModalSet
                      title="Are you sure you want to delete this question?"
                      customTrigger={<CircleXSVG />}
                      onConfirm={() => {
                        remove("question", question._id, index);
                        return true;
                      }}
                      height="200px"
                    >
                      <h3 style={{ margin: "0px" }}>Question: </h3>
                      <div>{question.text}</div>
                    </ModalSet>
                  </div>
                </div>
              }
            >
              {question.options.length > 0 ? (
                <div>
                  {bold("Type: ")} Multiple Choice
                  <br />
                  <br />
                  <div className="bold">Options: </div>
                  <ol>
                    {editing.list === "question" &&
                    editing.index === index &&
                    eq.options !== undefined
                      ? eq.options.map((o, i) => (
                          <EditableListItem
                            key={"" + question._id + i}
                            value={o}
                            onSave={val => {
                              let c = [...eq.options];
                              c[i] = val;
                              setEq({ ...eq, options: [...c] });
                            }}
                          />
                        ))
                      : question.options.map((o, i) => (
                          <li key={"" + question._id + i}>{o}</li>
                        ))}
                    {editing.list === "question" && editing.index === index ? (
                      <>
                        <Input
                          value={newOption}
                          label="New Option"
                          onChange={val => setNewOption(val)}
                          onEnter={() => {
                            let c = [...eq.options];
                            c.push(newOption);
                            setEq({ ...eq, options: c });
                            setNewOption("");
                          }}
                        />
                        <CirclePlusSVG
                          onClick={() => {
                            let c = [...eq.options];
                            c.push(newOption);
                            setEq({ ...eq, options: c });
                            setNewOption("");
                          }}
                        />
                      </>
                    ) : null}
                  </ol>
                </div>
              ) : (
                <div>{bold("Type: ")} Open Ended</div>
              )}
              {editing.list === "question" && editing.index === index ? (
                <button
                  onClick={e => {
                    e.preventDefault();
                    saveQuestion(question, eq, index);
                    setEditing({ index: -1, list: "question" });
                    setEq({});
                  }}
                  className="btn primary wide"
                >
                  Save
                </button> //Save Question
              ) : null}
            </Card>
          </div>
        ) : null
      )
    );
  const [showAddPoll, setShowAddPoll] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  return (
    <>
      <div className="pollPageWrapper">
        <div className="pollList">
          <div
            className={
              (selected === "newPoll" ? "selectedPoll " : "") +
              "pollListCardWrapper"
            }
          >
            <Card
              classes={selected === "newPoll" ? "cardActive" : ""}
              title={
                <div className="titleFlex">
                  <div>Create a Poll</div>
                  {showAddPoll ? (
                    <div>
                      <button
                        onClick={() => setShowAddPoll(false)}
                        className="btn btn-small"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </div>
              }
            >
              {showAddPoll ? (
                <AddPoll
                  save={(id, saved) => {
                    let np = { ...saved, _id: id };
                    delete np.questions;
                    setPolls([np, ...polls]);
                    setShowAddPoll(false);
                  }}
                />
              ) : (
                <button
                  onClick={() => {
                    setShowAddPoll(true);
                    setSelected("newPoll");
                  }}
                  className="btn primary wide"
                >
                  Add
                </button>
              )}
            </Card>
          </div>
          {pollContent}
        </div>
        <div className="questionList">
          {questionContent}
          {selected === null || (selected === "newPoll" && !showAddPoll) ? (
            <div className="noQuestions questionWrapper">
              <div>
                <div>Choose a poll</div>
              </div>
            </div>
          ) : shownQuestions === 1 && !showAddQuestion ? (
            <div className="noQuestions questionWrapper">
              <div>
                <div>There aren't any questions yet</div>
                <button
                  onClick={() => setShowAddQuestion(true)}
                  className="btn primary"
                >
                  Add One!
                </button>
              </div>
            </div>
          ) : showAddQuestion ? (
            <div className="questionWrapper">
              <Card
                title={
                  <div className="flex-space-between">
                    <div>New Question</div>
                    <div>
                      <button
                        onClick={() => setShowAddQuestion(false)}
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
                    setShowAddQuestion(false);
                  }}
                  number={shownQuestions + 1}
                  _id={selected}
                />
              </Card>
            </div>
          ) : (
            <Card title="Add a Question">
              {showAddQuestion ? (
                <AddQuestion _id={selected} />
              ) : (
                <button
                  onClick={() => setShowAddQuestion(true)}
                  className="btn primary wide"
                >
                  Add
                </button>
              )}
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default PollsPage;
