import React from "react";
import Card from "./../../card/Card";

import "./adminHome.css";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="page-container">
      <div className="big-text">Home</div>
      <section style={{ marginTop: "10px", marginBottom: "10px" }}>
        Welcome to Poll W! This site allows you to create polls for PW students.
        As an admin, you have control over a bunch of different things. Click on
        the cards below to learn how to use the site!
        <br />
        <br />
        <div className="small-text">
          These cards don't take you to the pages, use the nav for that. These
          cards are for learning how to use the site.
        </div>
      </section>
      <div className="instruction-container">
        <Link className="instruction-card" to={"/info/polls"}>
          <div>Polls</div>
          <div className="small">The bread and butter of the page</div>
        </Link>
        <Link className="instruction-card" to={"/info/student%20view"}>
          <div>Student View</div>
          <div className="small">You can see what a student sees</div>
        </Link>
        <Link className="instruction-card" to={"/info/results"}>
          <div>Results</div>
          <div className="small">
            What's the point if you can't see the results
          </div>
        </Link>
        <Link className="instruction-card" to={"/info/control%20panel"}>
          <div>Control Panel</div>
          <div className="small">Fancy buttons and stuff</div>
        </Link>
        <Link className="instruction-card" to={"/info/tips"}>
          <div>Tips</div>
          <div className="small">tricks and other things you should know</div>
        </Link>
      </div>
    </div>
  );
}
