import React from "react";
import { Link } from "react-router-dom";
import { TMIcon } from "./../svg";

import { useHistory } from "react-router";

export default function About() {
  const history = useHistory();
  return (
    <div className="page-container">
      <div className="big-text">About</div>
      <div onClick={() => history.goBack()} className="link small-text">
        &lt;&lt; Back
      </div>
      <br /> <br />
      <div style={{ fontSize: "1.1rem" }}>
        This is the Plymouth Whitemarsh High School polling site, Poll W
        <TMIcon width="1rem" />. In order to use the site, you must log in with
        a student.colonialsd.org email account. The site is mainly used for
        class elections and Seinor event voting (Homecomming and Superlatives);
        however, your class sponsors can create polls for anything at any time.
        <br /> <br />
        For more information about how the site was made you can click{" "}
        <Link className="link" to="/devInfo">
          here.
        </Link>
      </div>
    </div>
  );
}
