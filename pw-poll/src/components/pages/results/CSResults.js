import React from "react";
import Card from "./../../card/Card";

export default function CSResults({ question, ...props }) {
  const tally = (votes) => {
    let counts = [];
    for (let i = 0; i < votes.length; i++) {
      for (let j = 0; j < votes[i].vote.length; j++) {
        //if the student vote is unique add it to the array
        let foundI = counts.findIndex(
          (countVal) => countVal.id === votes[i].vote[j].id
        );
        if (foundI === -1) {
          counts.push({ ...votes[i].vote[j], numVotes: 1 });
        } else {
          // else add to the number of votes
          counts[foundI].numVotes++;
        }
      }
    }
    return counts.sort((a, b) => a.numVotes < b.numVotes);
  };
  return (
    <Card
      title={
        <div className="flex-space-between">
          <div>{question.text}</div>
          <div>
            Choose {question.type.options.choose} Student
            {question.type.options.choose === 1 ? "" : "s"}
          </div>
        </div>
      }
    >
      <section
        style={{ fontSize: "1rem", maxHeight: "350px", overflow: "scroll" }}
      >
        {question.votes.length > 0 ? (
          tally(question.votes).map((val, index) => (
            <div key={val.id + index} title={val.id}>
              {val.numVotes} - {val.name}
            </div>
          ))
        ) : (
          <div>No One Voted</div>
        )}
      </section>
    </Card>
  );
}
