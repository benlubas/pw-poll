import React, { useState } from "react";

import Input from "./form/input/Input";
import Dropdown from "./form/dropdown/Dropdown";

export default function TestPage() {
  const [form, setForm] = useState("");
  return (
    <div style={{ height: "100vh", width: "100%" }} className="flex-center">
      <Input value="HI" label="Text" />
      <Input value="" label="Empty" />
      <Dropdown
        values={["hi", "there", "buddy"]}
        onChange={(val) => setForm(val)}
        value={form}
      />
    </div>
  );
}
