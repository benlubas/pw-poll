import React from "react";
import Card from "./../../card/Card";

export default function PushPollForward() {
  return (
    <Card title="Push Polls Forward">
      Below you'll see a list of all of the polls. Here you have the option to
      "Push Polls Forward". Say you have a superlatives poll that's used for the
      class of 2020. Currently the students who can vote in the poll are in the
      class of 2020, and all of the questions are about students in the class of
      2020. Hitting the update to new year button will change every question in
      the poll to be about the new class. The students who can vote will also be
      changed.
    </Card>
  );
}
