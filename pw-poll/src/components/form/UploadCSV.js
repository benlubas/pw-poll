import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { useFetch } from "../../hooks/useFetch";
import Dropdown from "./dropdown/Dropdown";
import Alert from "./../alert/Alert";
import LoadingScreen from "./../loadingScreen/LoadingScreen";

export default function UploadCSV() {
  const [state, setState] = useState("waiting");
  const fileRef = useRef(null);
  const selectRef = useRef(null);
  const groupOptions = useFetch(`http://localhost:5000/group`);
  const [group, setGroup] = useState(-1);

  const parseFile = async () => {
    setState("loading");
    const file = fileRef.current.files[0];
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

      const url = `http://localhost:5000/group/students/${name}`;
      const result = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newStudents)
      });
      setState("done");
      return await result.json();
      // const usable = await result.json();
      // console.log(usable);
      // console.log("new students: ", newStudents);
    } catch (err) {
      console.error(err);
    }
  };
  return state === "waiting" || "done" || "addFile" ? (
    <>
      <form>
        <label>Upload Files: </label>
        <input
          ref={fileRef}
          id="files"
          name="files"
          type="file"
          accept=".csv"
          required
        />
        <Dropdown
          values={
            groupOptions.loading
              ? ["loading"]
              : groupOptions.data.map(val => val.name)
          }
          onUpdate={val => setGroup(val)}
          initialVal={"Graduation Year"}
        />

        <div
          onClick={() =>
            fileRef.current.files.length !== 0
              ? parseFile()
              : setState("addFile")
          }
          className="formSubmit"
        >
          Upload File
        </div>
      </form>
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
