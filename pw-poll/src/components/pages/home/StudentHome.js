import React, { useContext } from "react";
import { titlecase } from "./../../../pipes";
import { useFetch } from "./../../../hooks/useFetch";
import HomeCard from "./../../homeCard/HomeCard.js";
import UserProvider from "./../../../providers/UserProvider";

import { url } from "./../../../url";
import LoadingScreen from "../../loadingScreen/LoadingScreen";

const checkDate = (start, end) => {
  return (
    new Date(start).valueOf() < Date.now() &&
    Date.now() < new Date(end).valueOf()
  );
};
export default function StudentHome() {
  const gradYear = 2020;
  const [pollData, pollLoading] = useFetch(url + "poll/stud/" + gradYear);
  const user = useContext(UserProvider);
  let empty = true;
  return (
    <div className="studentPageWrapper">
      <div className="cards">
        {!pollLoading ? (
          pollData.map((poll, index) =>
            checkDate(poll.startDate, poll.endDate) ? (
              <HomeCard
                key={poll._id + (empty = false)}
                title={titlecase(poll.title)}
                desc={poll.desc}
                endDate={poll.endDate}
                _id={poll._id}
              />
            ) : null
          )
        ) : (
          <LoadingScreen />
        )}
        {empty && !pollLoading ? (
          <div className="big-text">You don't have any polls at the moment</div>
        ) : null}
      </div>
    </div>
  );
}
