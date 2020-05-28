import React, { useState } from "react";
import Card from "../../card/Card";
import Dropdown from "./../../form/dropdown/Dropdown";
import { useSecureFetch } from "../../../hooks/useSecureFetch";
import { url, furl } from "../../../url";

import Papa from "papaparse";

async function getQuestions(pollID) {
  try {
    let votes = await fetch(url + "question/votes/" + pollID, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": furl,
        "Access-Control-Allow-Credentials": true,
      },
    });
    let questions = await fetch(url + "question/poll/" + pollID, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": furl,
        "Access-Control-Allow-Credentials": true,
      },
    });
    votes = await votes.json();
    questions = await questions.json();

    questions = questions.map((q) => ({
      ...q,
      votes: votes.filter((v) => v.questionID === q._id),
    }));
    return questions;
  } catch (err) {
    console.log(err);
    return "error";
  }
}

export default function ExportToCSV() {
  const [form, setForm] = useState({ pollID: -1, pollName: "" });
  const [polls, loading] = useSecureFetch(url + "poll");

  return (
    <Card title="Export Votes to CSV">
      A CSV file is something you open with Exel or Google Sheets.
      <hr />
      <Dropdown
        style={{ width: "var(--ta-width)" }}
        label="Poll"
        value={form.pollID}
        disableFirst
        onChange={(val, disp) => {
          setForm({ pollID: val, pollName: disp });
        }}
        options={
          loading
            ? ["Loading..."]
            : ["Choose a Poll", ...polls.map((p) => p.title)]
        }
        values={loading ? [-1] : [-1, ...polls.map((p) => p._id + "")]}
      />
      {form.pollID !== "" && form.pollID !== "-1" ? (
        <button
          onClick={async () => {
            const questions = await getQuestions(form.pollID);
            const formatted = {};
            formatted.fields = [...questions.map((q) => q.text)];
            formatted.data = [
              questions.map((q) =>
                q.votes.map(
                  (v) =>
                    (Array.isArray(v.response)
                      ? v.response.join(" & ")
                      : v.response) +
                    " - " +
                    v.studentEmail
                )
              ),
            ];

            const parsed = Papa.unparse(formatted);
            const fileName = form.pollName.replace(" ", "_") + "-votes.csv";
            const blob = new Blob([parsed], {
              type: "text/csv;charset=utf-8;",
            });
            if (navigator.msSaveBlob) {
              navigator.msSaveBlob(blob, fileName);
            } else {
              const url = URL.createObjectURL(blob);
              let link = document.createElement("a");
              link.setAttribute("href", url);
              link.setAttribute("download", fileName);
              link.style.visibility = "hidden";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}
          className="btn primary wide"
        >
          Download CSV
        </button>
      ) : null}
    </Card>
  );
}
