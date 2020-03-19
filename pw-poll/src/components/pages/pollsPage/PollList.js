import React, { useState, useEffect } from "react";
import { useSecureFetch } from "./../../../hooks/useSecureFetch";
import { url } from "./../../../url";
import LoadingScreen from "./../../loadingScreen/LoadingScreen";
import PollCard from "./../../pollCard/PollCard";
import { securePut } from "./../../../hooks/securePut";
import Card from "./../../card/Card";
import AddPoll from "./AddPoll";

export default function PollList({ remove, selected, setSelected, ...props }) {
  const [pollData] = useSecureFetch(url + "poll/");
  const [polls, setPolls] = useState(null);
  useEffect(() => {
    setPolls(pollData);
  }, [pollData]);
  const savePoll = async (newInfo, index) => {
    let temp = [...polls];
    temp[index] = newInfo;
    setPolls(temp);
    try {
      securePut(url + "poll/" + newInfo._id, newInfo);
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
            selected={selected === poll._id}
            data={poll}
            key={poll._id}
            remove={remove}
            onClick={() => setSelected(poll._id)}
            onSave={newPoll => {
              savePoll(newPoll, index);
            }}
          />
        </div>
      ))
    );
  return (
    <>
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
              {props.showAddPoll ? (
                <div>
                  <button
                    onClick={() => props.setShowAddPoll(false)}
                    className="btn btn-small"
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>
          }
        >
          {props.showAddPoll ? (
            <AddPoll
              save={(id, saved) => {
                let np = { ...saved, _id: id };
                delete np.questions;
                setPolls([np, ...polls]);
                props.setShowAddPoll(false);
              }}
            />
          ) : (
            <button
              onClick={() => {
                props.setShowAddPoll(true);
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
    </>
  );
}
