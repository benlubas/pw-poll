import React, { useState } from "react";
import Card from "./../../card/Card";
import Dropdown from "./../../form/dropdown/Dropdown";
import { useSecureFetch } from "../../../hooks/useSecureFetch";
import { url } from "./../../../url";
import { ModalSet } from "./../../modal/Modal";
import { securePut } from "./../../../hooks/securePut";

export default function PushPollForward() {
  const [form, setForm] = useState({
    pollID: -1,
    pollName: "",
    year: "",
  });
  const [polls, loading] = useSecureFetch(url + "poll");
  return (
    <Card title="Push Forward">
      Below you'll see a list of all of the polls. Here you have the option to
      "Push Polls Forward". Say you have a superlatives poll that's used for the
      class of 2020. Currently the students who can vote in the poll are in the
      class of 2020, and all of the questions are about students in the class of
      2020. Hitting the update to new year button will change every question in
      the poll to be about the new class. The students who can vote will also be
      changed.
      <hr />
      <div style={{ display: "flex" }}>
        <Dropdown
          style={{ flexGrow: "3", marginRight: "10px" }}
          label="Poll"
          value={form.pollID}
          disableFirst
          onChange={(val, disp) => {
            setForm({
              ...form,
              pollID: val,
              pollName: disp,
              year: polls.find((p) => p._id + "" === val).gradYears[0],
            });
          }}
          options={
            loading
              ? ["Loading..."]
              : ["Select Poll", ...polls.map((p) => p.title)]
          }
          values={loading ? ["loading"] : [-1, ...polls.map((p) => p._id)]}
        />
        <Dropdown
          label="Year"
          style={{ flexGrow: "1" }}
          value={form.year}
          onChange={(val) => setForm({ ...form, year: val })}
          values={[...[0, 0, 0, 0].map((v, i) => new Date().getFullYear() + i)]}
        />
      </div>
      <ModalSet
        customTrigger={
          form.year !== "" &&
          form.pollID !== "" &&
          form.pollID !== "-1" &&
          form.year !== "Select Year" ? (
            <button className="btn primary wide">Update</button>
          ) : (
            <div></div>
          )
        }
        title="Are you sure?"
        onConfirm={() => {
          securePut(url + "poll/pushForward/" + form.pollID + "/" + form.year);
          securePut(
            url + "question/pushForward/" + form.pollID + "/" + form.year
          );
          return true;
        }}
        height="200px"
        confirmClass="danger"
        closeClass="default"
      >
        <div>
          You're about to update "{form.pollName}". Are you sure you want to do
          that?
        </div>
      </ModalSet>
    </Card>
  );
}
