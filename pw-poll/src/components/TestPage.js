import React from "react";

import Alert from "./alert/Alert";

export default function TestPage() {
  return (
    <div style={{ height: "100vh", width: "100%" }} className="flex-center">
      <Alert>This is just a test alert. </Alert>
    </div>
  );
}
