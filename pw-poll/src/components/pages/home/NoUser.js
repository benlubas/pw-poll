import React from "react";
import { url } from "./../../../url";

export default function NoUser() {
  return (
    <button
      className="btn primary"
      onClick={() => window.open(`${url}auth/`, "_self")}
    >
      Login With Google
    </button>
  );
}
