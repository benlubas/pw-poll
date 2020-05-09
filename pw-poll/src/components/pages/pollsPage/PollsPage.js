import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import PollList from "./PollList";
import QuestionList from "./QuestionList";
import { url } from "./../../../url";

import "./pollsPage.css";
import { Modal } from "../../modal/Modal";
import { secureDelete } from "./../../../hooks/secureDelete";

const PollsPage = () => {
  const [questionData, qLoading] = useFetch(url + "question/");
  const [questions, setQuestions] = useState(null);
  if (!qLoading && questions === null) {
    setQuestions(questionData);
  }

  const [selected, setSelected] = useState(null);

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
    await secureDelete(url + list + "/" + id);
    if (list === "poll") {
      await secureDelete(url + "question/purge/" + id);
    }
  };

  const [showAddPoll, setShowAddPoll] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  return (
    <>
      <div className="pollPageWrapper">
        {window.innerWidth < 600 ? (
          <Modal
            noConfirm
            standAlone
            height={"45%"}
            title={"It seems like you're on mobile"}
          >
            <div>
              This is a bad idea. This part of the site was not intended for
              mobile, and it NOT mobile friendly. Turn back now.{" "}
            </div>
          </Modal>
        ) : null}
        <div className="pollList">
          <PollList
            remove={remove}
            selected={selected}
            setSelected={setSelected}
            showAddPoll={showAddPoll}
            setShowAddPoll={setShowAddPoll}
          />
        </div>
        <QuestionList
          showAddPoll={showAddPoll}
          showAddQuestion={showAddQuestion}
          setShowAddQuestion={setShowAddQuestion}
          selectedPoll={selected}
          remove={remove}
        />
      </div>
    </>
  );
};

export default PollsPage;
