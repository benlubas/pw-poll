import React, { useState } from "react";
import Papa from "papaparse";
import { useFetch } from "../../hooks/useFetch";
import { url } from "./../../url";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import InputLabel from "@material-ui/core/InputLabel";

import Alert from "./../alert/Alert";
import LoadingScreen from "./../loadingScreen/LoadingScreen";
import Dropdown from "./dropdown/Dropdown";
import FileUpload from "./../form/fileUpload/FileUpload";

export default function UploadCSV() {
  const [state, setState] = useState("waiting");
  const [file, setFile] = useState(null);
  const [groupOptions, groupOptionsLoading] = useFetch(url + `group/`);
  const [group, setGroup] = useState("");

  const parseFile = async () => {
    setState("loading");

    // console.log("file: ", file);
    let done = null;
    Papa.parse(file, {
      header: true,
      complete: async function(res, file) {
        // console.log("Done!", res, file);
        if (res.errors.length === 0) {
          // console.log("Success");
          done = await addToDB(res.data, group);
        } else {
          console.log("error:", res.errors);
        }
      }
    });
    return done;
  };
  const addToDB = async (info, name) => {
    try {
      //val.Email, the Email should be the name of the header in the CSV file.
      let newStudents = info.map(val => val.Email);
      newStudents = { students: newStudents };

      const studUrl = url + `group/students/${name}`;
      const result = await fetch(studUrl, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newStudents)
      });
      setState("done");
      return await result.json();
    } catch (err) {
      console.error(err);
    }
  };
  return state === "waiting" || "done" || "addFile" ? (
    <>
      <FileUpload onChange={val => setFile(val)} label="Upload Student List" />
      <Dropdown
        label="Group"
        onChange={val => setGroup(val)}
        values={
          groupOptionsLoading
            ? ["loading..."]
            : groupOptions.map(val => val.name)
        }
        value={group}
      />
      <br />
      <div
        onClick={() => (file !== null ? parseFile() : setState("addFile"))}
        className="formSubmit"
      >
        Upload File
      </div>
      {state === "done" ? (
        <Alert onClose={() => setState("waiting")} varient="success">
          Done!
        </Alert>
      ) : state === "addFile" ? (
        <Alert onClose={() => setState("waiting")} varient="warning">
          Please Upload a File!
        </Alert>
      ) : null}
    </>
  ) : (
    <LoadingScreen />
  );
}
