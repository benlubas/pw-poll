import React, { useState } from "react";

const AddPollTest = props => {
  const [counter, increment] = useState(0);
  const url = "http://localhost:5000/polls/";
  const postBody = {
    title: "Poll " + counter,
    desc:
      "Test poll with same basic filler text with a really really really long description this time. bc we need one of those",
    openDate: Date.now(),
    closeDate: "12/12/2019",
    viewInProgress: false,
    pollType: "arbitrary",
    typeData: {}
  };
  const add = async () => {
    console.log("adding post");
    increment(counter + 1);
    try {
      const newPoll = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postBody)
      });
      const useable = await newPoll.json();
      props.forceUpdate();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      style={{
        flexGrow: "1",
        background: "var(--blue-grad)",
        padding: "10px",
        margin: "10px",
        cursor: "pointer"
      }}
      onClick={() => add()}
    >
      Add Test Element
    </div>
  );
};

export default AddPollTest;
