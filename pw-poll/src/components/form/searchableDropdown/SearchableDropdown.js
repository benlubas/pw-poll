import React, { useState, useEffect, useRef } from "react";
import { useFetch } from "./../../../hooks/useFetch";

import { url } from "./../../../url";

import "./searchableDropdown.css";
import "./../InputStyle.css";

export default function SearchableDropdown({
  value,
  label,
  gradYear,
  onFullName,
  ...props
}) {
  const [names] = useFetch(url + "students/" + gradYear);
  const [focus, setFocus] = useState(false);
  const [disp, setDisp] = useState("");
  const [error, setError] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (names) {
      for (let i = 0; i < names.length; i++) {
        if (names[i].id === value) {
          setDisp(makeName(names[i]));
        }
      }
    }
  }, [names, value]);

  const countIgnoreCase = (arr, thing) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      // console.log(arr[i].toLowerCase(), thing.toLowerCase());
      if (arr[i].toLowerCase().includes(thing.toLowerCase())) {
        count++;
      }
    }
    return count;
  };
  const makeName = obj =>
    obj.firstName +
    " " +
    (obj.middleName !== "" ? obj.middleName + " " : "") +
    obj.lastName;
  const findName = str => {
    // console.log("searching for... ", str);
    for (let i = 0; i < names.length; i++) {
      let n = makeName(names[i]);
      if (n.toLowerCase().includes(str.toLowerCase())) return [n, names[i].id];
    }
    console.log("No name found");
  };

  return (
    <div className={`input-wrapper ${focus || disp !== "" ? "underline" : ""}`}>
      <label className={`label ${focus || disp !== "" ? "active" : ""}`}>
        {label}
      </label>
      <input
        ref={ref}
        className="input"
        type="text"
        onKeyPress={e => {
          if (e.key === "Enter") {
            e.target.blur();
          }
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          let c = countIgnoreCase(
            names.map(
              (val, index) =>
                `${val.firstName} ${
                  val.middleName !== "" ? val.middleName + " " : ""
                }${val.lastName}`
            ),
            disp
          );
          c === 0
            ? setError("No Matches")
            : c > 1
            ? setError("Ambiguity")
            : setError("");
          if (c === 1) {
            const [n, id] = findName(disp);
            onFullName({ id: id, name: n });
            setDisp(n);
          }
          if (disp === "") setError("");
          setFocus(false);
        }}
        {...props}
        onChange={e => setDisp(e.target.value)}
        value={disp}
      />
      {disp !== "" ? (
        <div
          className="input-times"
          onClick={() => {
            setDisp("");
            onFullName({ id: null, name: "" });
          }}
        >
          &times;
        </div>
      ) : null}
      <div className="input-error">{error}</div>
      <div className={`sd-dropdown ${!focus ? "smol" : ""}`}>
        {names
          ? names.map((v, i) => {
              let name = makeName(v);
              // console.log("name: ", name);
              return name.toLowerCase().includes(disp.toLowerCase()) ? (
                <div
                  role="button"
                  onMouseDown={() => {
                    setDisp(name);
                    onFullName({ id: v.id, name: name });
                  }}
                  value={v.id}
                  key={i}
                  className="sd-drop-item"
                >
                  {name}
                </div>
              ) : null;
            })
          : null}
      </div>
    </div>
  );
}
