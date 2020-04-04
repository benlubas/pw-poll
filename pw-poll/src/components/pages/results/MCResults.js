import React, { useMemo } from "react";
import Card from "../../card/Card";
import { bold } from "../../../pipes";

const tally = (votes, options) => {
  let count = new Array(options.length).fill(0);
  for (let i = 0; i < votes.length; i++) {
    if (Array.isArray(votes[i].vote)) {
      votes[i].vote.forEach(vote => {
        if (options.indexOf(vote) !== -1) {
          count[options.indexOf(vote)]++;
        }
      });
    } else {
      if (options.indexOf(votes[i].vote) !== -1) {
        count[options.indexOf(votes[i].vote)]++;
      }
    }
  }
  return count;
};

export default function MCResults({ question, ...props }) {
  const orderedResults = useMemo(() => {
    let order = tally(question.votes, question.options);
    order = order
      .map((val, index) => ({
        totalVotes: val,
        option: question.options[index]
      }))
      .sort((a, b) => b.totalVotes - a.totalVotes);
    return order;
  }, [question]);

  return (
    <Card
      title={
        <div className="flex-space-between">
          <div>{question.text}</div>
          <div>MC Choose {question.type.charAt(question.type.length - 1)}</div>
        </div>
      }
    >
      <div>
        {orderedResults.map((o, i) => (
          <div key={question._id + i}>
            {bold(o.option)} - {o.totalVotes}
          </div>
        ))}
      </div>
    </Card>
  );
}