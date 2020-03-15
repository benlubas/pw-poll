import React, { useContext } from "react";
import { titlecase } from "./../../../pipes";
import { useFetch } from "./../../../hooks/useFetch";
import HomeCard from "./../../homeCard/HomeCard.js";
import UserProvider from "./../../../providers/UserProvider";

import { url } from "./../../../url";

export default function StudentHome() {
  const gradYear = 2020;
  const [pollData, pollLoading] = useFetch(url + "poll/stud/" + gradYear);
  const user = useContext(UserProvider);
  return (
    <div className="studentPageWrapper">
      <div className="cards">
        {!pollLoading
          ? pollData.map((poll, index) => (
              <HomeCard
                key={poll._id}
                title={titlecase(poll.title)}
                desc={poll.desc}
                endDate={poll.endDate}
                effectNum={index % 2}
              />
            ))
          : null}
      </div>
    </div>
  );
}
