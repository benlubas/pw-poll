import React, { useContext } from "react";
import { useSecureFetch } from "./../../../hooks/useSecureFetch";
import HomeCard from "./../../homeCard/HomeCard.js";
import UserProvider from "./../../../providers/UserProvider";

import { url } from "./../../../url";
import LoadingScreen from "../../loadingScreen/LoadingScreen";
import PageHead from "../../PageHead";

const checkDate = (start, end) => {
  return (
    new Date(start).valueOf() < Date.now() &&
    Date.now() < new Date(end).valueOf()
  );
};
export default function StudentHome({ year, adminView, ...props }) {
  const session = useContext(UserProvider.context);
  let fYear;
  if (year && session.user.class === year) {
    //we good
    fYear = year;
  } else if (year && session.user.class === 9999) {
    //this is an admin
    fYear = year;
  } else if (!year) {
    fYear = session.user.class;
  }
  const [pollData, pollLoading] = useSecureFetch(url + "poll/stud/" + fYear);
  let empty = true;
  return (
    <div className="page-container">
      {adminView ? null : <PageHead title="Home" noBack />}
      <div className="cards">
        {!pollLoading ? (
          pollData.map((poll, index) =>
            checkDate(poll.startDate, poll.endDate) ? (
              <HomeCard
                key={poll._id + (empty = false)}
                title={poll.title}
                description={poll.description}
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
