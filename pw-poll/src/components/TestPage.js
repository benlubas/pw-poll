import React, { useState } from "react";
import { DatePicker, TimePicker } from "./form/dateTimePicker/dateTimePicker";
import SearchableDropdown from "./form/searchableDropdown/SearchableDropdown";
import { useFetch } from "./../hooks/useFetch";

import { url } from "./.././url";
import Input from "./form/input/Input";

export default function TestPage() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [student, setStudent] = useState("");
  const [i, setI] = useState("");
  return (
    <div style={{ height: "100vh", width: "100%" }} className="flex-center">
      <div className="flex-baseline">
        <div className="md-padding">
          <Input label="Test Date" value={i} onChange={d => setI(d)} />
        </div>
        <div className="md-padding">
          <DatePicker
            label="Test Date"
            value={date}
            onChange={d => setDate(d)}
          />
        </div>
        <div className="md-padding">
          <TimePicker
            label="Test Time"
            value={time}
            onChange={t => setTime(t)}
          />
        </div>
        <div className="md-padding">
          <SearchableDropdown
            label="Testing"
            value={student}
            onFullName={id => {
              console.log(id);
            }}
            gradYear={2020}
          />
        </div>
      </div>
    </div>
  );
}
