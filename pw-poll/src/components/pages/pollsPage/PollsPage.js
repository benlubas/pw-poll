import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import LoadingScreen from "../../loadingScreen/LoadingScreen";
import PollList from "./PollList";
import Card from "../../card/Card";
import AddPoll from "./AddPoll";
import AddQuestion from "./AddQuestion";
import QuestionList from "./QuestionList";
import { bold } from "../../../pipes";
import { url } from "./../../../url";

import "./pollsPage.css";
import { EditSVG, CircleXSVG, CirclePlusSVG } from "../../svg";
import { ModalSet } from "../../modal/Modal";
import EditableListItem from "../../editableListItem/EditableListItem";
import Input from "../../form/input/Input";

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

  const [showAddPoll, setShowAddPoll] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  return (
    <>
      <div className="pollPageWrapper">
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
