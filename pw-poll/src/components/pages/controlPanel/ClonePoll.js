import React, { useState } from "react";
import { useSecureFetch } from "../../../hooks/useSecureFetch";
import { securePut } from "../../../hooks/securePut";
import { url } from "../../../url";

import Card from "../../card/Card";
import Dropdown from "../../form/dropdown/Dropdown";
import Input from "./../../form/input/Input";

export default function ClonePoll() {
  const [form, setForm] = useState({
    pollID: "",
    pollName: "",
    cloneName: "",
  });
  const [polls, loading] = useSecureFetch(url + "poll");

  return (
    <Card title="Clone a Poll">
      Cloning a poll makes an exact copy of it and all of its questions. Votes
      are not cloned.
      <hr />
      <Dropdown
        style={{ width: "var(--ta-width)" }}
        label="Poll"
        value={form.pollID}
        onChange={(val, disp) => {
          setForm({ ...form, pollID: val, cloneName: disp + " (Clone)" });
        }}
        options={loading ? ["Loading..."] : [...polls.map((p) => p.title)]}
        values={loading ? [-1] : [...polls.map((p) => p._id)]}
      />
      <br />
      <br />
      <Input
        width="var(--ta-width)"
        label="Clone Name"
        value={form.cloneName}
        onChange={(val) => setForm({ ...form, cloneName: val })}
      />
      {form.poll !== "" && form.cloneName !== "" ? (
        <button
          onClick={async () => {
            let res = await securePut(
              url + "poll/clone/" + form.pollID + "/" + form.cloneName
            );
            securePut(
              url + "question/clone/" + form.pollID + "/" + res.poll._id
            );
            setForm({
              pollID: "",
              pollName: "",
              cloneName: "",
            });
          }}
          className="btn primary wide"
        >
          Save Clone
        </button>
      ) : (
        <div></div>
      )}
    </Card>
  );
}
