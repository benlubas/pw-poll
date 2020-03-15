import React from "react";
import { dateFormat } from "./../../pipes";

import "./../homeCard/homeCard.css";

const effects = ["blur", "flip"]; // this can be an array of effects on the cards

export default function HomeCard(props) {
  const voteClick = () => {};
  return (
    <div className={`homeCard ${effects[props.effectNum]}`}>
      {effects[props.effectNum] === "blur" ? (
        <>
          <div className="top">
            <div className="titleText">{props.title}</div>
          </div>
          <div className="bottom">
            <div className="content">
              <div className="descText">{props.desc}</div>
              <div className="endDate">Closes: {dateFormat(props.endDate)}</div>
            </div>
            <button onClick={() => voteClick()} className="btn vote">
              Vote
            </button>
          </div>
        </>
      ) : (
        <div className="inner">
          <div className="front">
            <div className="top">
              <div className="titleText">{props.title}</div>
            </div>
            <div className="bottom">
              <div className="content">
                <div className="descText">{props.desc}</div>
                <div className="endDate">
                  Closes: {dateFormat(props.endDate)}
                </div>
              </div>
            </div>
          </div>
          <div className="vote">
            <button onClick={() => voteClick()} className="btn primary">
              Vote
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
