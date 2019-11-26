import React, { useState } from "react";
import { useFetch, useDelete } from "../../hooks/useFetch";
import LoadingScreen from "../LoadingScreen";
import PollCard from "./../PollCard";
import SmallPollCard from "./../SmallPollCard";
import AddPollTest from "./../AddPollTest";

const url = "http://localhost:5000/";

const PollsPage = () => {
  const [updater, setUpdater] = useState(0);
  const [state, setState] = useState({ listSM: false });
  const { data, loading } = useFetch(url + "polls/", updater);
  const remove = async id => {
    const result = await fetch(url + "polls/delete/" + id, {
      method: "DELETE"
    });
  };
  const bigList = loading ? (
    <LoadingScreen />
  ) : (
    data.map((pollData, index) => (
      <PollCard
        title={pollData.title}
        desc={pollData.desc}
        openDate={pollData.openDate}
        closeDate={pollData.closeDate}
        key={pollData._id}
        dbID={pollData._id}
        remove={remove}
      />
    ))
  );
  const smallList = loading ? (
    <LoadingScreen />
  ) : (
    data.map(d => (
      <SmallPollCard
        title={d.title}
        desc={d.desc}
        openDate={d.openDate}
        closeDate={d.closeDate}
        key={d._id}
        dbID={d._id}
        remove={remove}
      />
    ))
  );
  return (
    <>
      <div style={{ display: "flex" }}>
        <AddPollTest forceUpdate={() => setUpdater(updater + 1)} />
        <div
          style={{
            flexGrow: "1",
            padding: "10px",
            margin: "10px",
            backgroundColor: "lightblue",
            cursor: "pointer"
          }}
          onClick={() => setState({ ...state, listSM: !state.listSM })}
        >
          Toggle List Display
        </div>
      </div>
      <div>{state.listSM ? bigList : smallList}</div>
    </>
  );
};

export default PollsPage;
