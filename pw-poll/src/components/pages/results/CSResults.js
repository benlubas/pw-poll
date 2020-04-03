import React from "react";
import Card from "./../../card/Card";

export default function CSResults({ question, ...props }) {
  const tally = votes => {
    let counts = [];
    for (let i = 0; i < votes.length; i++) {
      let f = counts.findIndex(val => val.vote === votes[i].vote);
      if (f === -1) {
        counts.push({ vote: votes[i].vote, count: 1 });
      } else {
        counts[f].count++;
      }
    }
    return counts;
  };
  return (
    <Card
      title={
        <div className="flex-space-between">
          <div>{question.text}</div>
          <div>Choose Student</div>
        </div>
      }
    >
      {question.votes.length > 0 ? (
        tally(question.votes).map((val, index) => (
          <div key={val.vote.id + index} title={val.vote.id}>
            {val.vote.name} - {val.count}
          </div>
        ))
      ) : (
        <div>No One Voted</div>
      )}
    </Card>
  );
}
