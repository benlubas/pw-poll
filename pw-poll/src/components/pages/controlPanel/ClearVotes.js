import React, { useState } from "react";
import { useSecureFetch } from "./../../../hooks/useSecureFetch";
import { securePut } from "./../../../hooks/securePut";
import { url } from "./../../../url";

import Card from "../../card/Card";
import Dropdown from "../../form/dropdown/Dropdown";

export default function ClearVotes() {
  const [form, setForm] = useState({
    pollID: "",
  });
  const [polls, loading] = useSecureFetch(url + "poll");

  return (
    <Card title="Clear Votes">
      Want to reuse a poll? Make sure you get rid of all the old votes before
      you do so. Just select the voll and click the button. It's a good idea to
      confirm that it worked by checking the results page.
      <hr />
      <Dropdown
        style={{ width: "var(--ta-width)" }}
        label="Poll"
        value={form.pollID}
        onChange={(val) => {
          setForm({ pollID: val });
        }}
        options={
          loading
            ? ["Loading..."]
            : ["Choose a Poll", ...polls.map((p) => p.title)]
        }
        values={loading ? [-1] : [-1, ...polls.map((p) => p._id)]}
      />
      {form.pollID !== "-1" && form.pollID !== "" ? (
        <button
          onClick={async () => {
            securePut(url + "question/clearVotes/" + form.pollID);
            setForm({ pollID: "-1" });
          }}
          className="btn primary wide"
        >
          Clear Votes
        </button>
      ) : (
        <div></div>
      )}
    </Card>
  );
}
