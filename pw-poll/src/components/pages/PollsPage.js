import React, { useState } from "react";
import { useFetch, useDelete } from "../../hooks/useFetch";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import PollCard from "../pollCard/PollCard";
import AddPollTest from "./../AddPollTest";

const url = "http://localhost:5000/";

const PollsPage = () => {
  const [updater, setUpdater] = useState(0);
  const [state, setState] = useState({ small: false });
  const { data, loading } = useFetch(url + "polls/", updater);

  const remove = async id => {
    const result = await fetch(url + "polls/" + id, {
      method: "DELETE"
    });
    console.log(result);
    return result;
  };
  const pollContent = loading ? (
    <LoadingScreen />
  ) : (
    data.map((pollData, index) => (
      <PollCard
        small={state.small}
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
  return (
    <>
      <div style={{ display: "flex" }}>
        <AddPollTest forceUpdate={() => setUpdater(updater + 1)} />
        <div
          style={{
            flexGrow: "1",
            padding: "10px",
            margin: "10px",
            background: "var(--red)",
            cursor: "pointer"
          }}
          onClick={() => setState({ ...state, small: !state.small })}
        >
          Toggle List Display
        </div>
      </div>
      <div>{pollContent}</div>
    </>
  );
};

export default PollsPage;
