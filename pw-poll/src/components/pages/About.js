import React from "react";
import { Link } from "react-router-dom";
import { TMIcon } from "./../svg";

import PageHead from "../PageHead";

export default function About() {
  return (
    <div className="page-container">
      <PageHead title="About" />
      <section>
        This is the Plymouth Whitemarsh High School polling site, Poll W
        <TMIcon width="1rem" />. In order to use the site, you must log in with
        a student.colonialsd.org email account. The site is mainly used for
        class elections and Seinor event voting (Homecomming and Superlatives);
        however, your class sponsors can create polls for anything at any time.
        <br /> <br />
        Polls that you can vote in will show up on the home page.
        <br /> <br />
        For more information about how the site was made you can click{" "}
        <Link className="link" to="/devInfo">
          here.
        </Link>
      </section>
    </div>
  );
}
