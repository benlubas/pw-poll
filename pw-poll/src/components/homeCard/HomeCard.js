import React, { useState } from "react";
import { useHistory } from "react-router";
import { dateFormat } from "./../../pipes";

import "./../homeCard/homeCard.css";

export default function HomeCard(props) {
  const hist = useHistory();
  const [flipped, setFlipped] = useState(false);
  const voteClick = () => {
    hist.push(`/vote/${props._id}`);
  };
  return (
    <div className="homeCard flip" onTouchEnd={() => setFlipped(!flipped)}>
      <div className={`inner ${flipped ? "flipped" : ""}`}>
        <div className="front">
          <div className="top">
            <div className="titleText">{props.title}</div>
          </div>
          <div className="bottom">
            <div className="content">
              <div className="descText">{props.desc}</div>
              <div className="endDate">Closes: {dateFormat(props.endDate)}</div>
            </div>
          </div>
        </div>
        <div className="vote" onTouchEnd={() => setFlipped(false)}>
          <ul className="instructions">
            <li>You don't have to answer all the questions </li>
            <li>Be sure you hit the Save button before you leave the page</li>
            <li>Previously answered questions will be pre-filled</li>
          </ul>
          <button
            onTouchStart={() => voteClick()}
            onClick={() => voteClick()}
            className="btn primary"
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}
