import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import PollCard from "../pollCard/PollCard";
import Card from "./../card/Card";
import { bold } from "./../../pipes";
import { url } from "./../../url";
import Input from "./../form/input/Input";

import "./pollsPage.css";
import { EditSVG, CircleXSVG } from "../svg";
import { ModalSet } from "../modal/Modal";
import EditableListItem from "../editableListItem/EditableListItem";

const PollsPage = () => {
  const [updater, setUpdater] = useState(0);
  const [questions, qLoading] = useFetch(url + "question/", updater);
  const [data, loading] = useFetch(url + "poll/", updater);

  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState({ list: null, index: -1 });

  if (!loading && selected === null && data.length > 0) {
    setSelected(data[0]._id);
  }

  const remove = async (list, id) => {
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
  const saveQuestion = async info => {
    try {
      fetch(url + "question/" + info._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
      });
    } catch (err) {
      console.error(err);
    }
  };
  const savePoll = async vals => {
    try {
      await fetch(url + "poll/" + vals._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(vals)
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  const pollContent = loading ? (
    <LoadingScreen />
  ) : (
    data.map((pollData, index) => (
      <div
        className={
          selected === pollData._id
            ? "selectedPoll pollListCardWrapper"
            : "pollListCardWrapper"
        }
        key={pollData._id}
      >
        <PollCard
          num={index}
          edit={editing.list === "poll" && editing.index === index}
          editable={true} // This should maybe be based on passport (who's logged in)
          classes={`${selected === pollData._id ? "cardActive" : ""}`}
          data={pollData}
          key={pollData._id}
          remove={remove}
          onClick={() => setSelected(pollData._id)}
          onEdit={i => edit("poll", i)}
          save={vals => savePoll(vals)}
          onDiscardChanges={i => {
            setEditing({ list: null, index: -1 });
          }}
        />
      </div>
    ))
  );
  const questionContent = qLoading ? (
    <LoadingScreen />
  ) : (
    questions.map((data, index) =>
      selected === data.pollID ? (
        <div
          key={data._id}
          className={
            selected === data.pollID
              ? "show questionWrapper"
              : "hide questionWrapper"
          }
        >
          <Card
            key={data._id}
            title={
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignContent: "center"
                }}
              >
                <span>{data.number + 1 + ") " + data.text}</span>
                <div style={{ display: "flex", alignContent: "center" }}>
                  {editing.list === "question" &&
                  editing.index === index ? null : (
                    <EditSVG
                      onClick={() =>
                        setEditing({ list: "question", index: index })
                      }
                    />
                  )}
                  <ModalSet
                    title="Are you sure you want to delete this question?"
                    customTrigger={<CircleXSVG />}
                    onConfirm={() => {
                      remove("question", data._id);
                    }}
                    height="200px"
                  >
                    <h3 style={{ margin: "0px" }}>Question:</h3>{" "}
                    <div>{data.text}</div>
                  </ModalSet>
                </div>
              </div>
            }
          >
            {data.options.length > 0 ? (
              <div>
                {bold("Type: ")} Multiple Choice
                <br />
                <br />
                <div className="bold">Options: </div>
                <ol>
                  {data.options.map((o, i) =>
                    editing.list === "question" && editing.index === index ? (
                      <EditableListItem
                        remove={options => remove("option", data._id, options)}
                        key={"" + data._id + i}
                        value={o}
                      />
                    ) : (
                      <li>{o}</li>
                    )
                  )}
                </ol>
              </div>
            ) : (
              <div>{bold("Type: ")} Open Ended</div>
            )}
            {editing.list === "question" && editing.index === index ? (
              <button
                onClick={e => {
                  e.preventDefault();
                  setEditing({ index: -1, list: "question" });
                }}
                className="btn primary wide"
              >
                Save
              </button>
            ) : null}
          </Card>
        </div>
      ) : null
    )
  );
  return (
    <>
      <div className="pollPageWrapper">
        <div className="pollList">{pollContent}</div>
        <div className="questionList">{questionContent}</div>
      </div>
    </>
  );
};

export default PollsPage;
