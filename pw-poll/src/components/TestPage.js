import React, { useState } from "react";
import { DatePicker, TimePicker } from "./form/dateTimePicker/dateTimePicker";
import SearchableDropdown from "./form/searchableDropdown/SearchableDropdown";
import { useFetch } from "./../hooks/useFetch";

import { url } from "./.././url";
import Input from "./form/input/Input";
import TestDB from "./pages/testDB";

export default function TestPage() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [student, setStudent] = useState("");
  const [i, setI] = useState("");
  return (
    <div style={{ height: "100vh", width: "100%" }} className="flex-center">
      <TestDB />
    </div>
  );
}
