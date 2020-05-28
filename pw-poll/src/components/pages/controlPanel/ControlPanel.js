import React, { useState, useEffect, useContext } from "react";
import Card from "./../../card/Card";
import Input from "../../form/input/Input";
import { securePost } from "../../../hooks/securePost";
import { useSecureFetch } from "../../../hooks/useSecureFetch";
import { url } from "../../../url";
import AdminList from "./AdminList";
import { securePut } from "../../../hooks/securePut";
import PushPollForward from "./PushPollForward";
import ClonePoll from "./ClonePoll";
import ClearVotes from "./ClearVotes";
import ExportToCSV from "./ExportToCSV";
import PageHead from "../../PageHead";
import UserProvider from "./../../../providers/UserProvider";

const validate = (form) => {
  if (form.email.indexOf("staff.colonialsd.org") !== -1) {
    if (!isNaN(parseInt(form.class))) {
      return true;
    }
    return "Invalid Class";
  }
  return "Invalid Email";
};

export default function ControlPanel() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    email: "",
    class: "",
  });
  const session = useContext(UserProvider.context);
  const [adminsData] = useSecureFetch(url + "admin");
  const [admins, setAdmins] = useState(null);
  useEffect(() => {
    setAdmins(adminsData);
  }, [adminsData]);
  const submit = async () => {
    if (validate(form) === true) {
      if (editing === null) {
        const newAdmin = await securePost(url + "admin", form);
        console.log(newAdmin);
        setAdmins([...admins, newAdmin]);
      } else {
        let c = [...admins];
        let i = c.findIndex((v) => v._id === editing);
        c[i] = { _id: c[i]._id, ...form };
        await securePut(url + "admin", c[i]);
        setAdmins(c);
      }
      setForm({ email: "", class: "" });
      setEditing(null);
    }
  };
  return (
    <div className="page-container">
      <PageHead title="Control Panel" />
      {session.user.class === 9999 && admins !== null ? (
        <>
          <Card title="Admins">
            <AdminList
              admins={admins}
              remove={(index) => {
                let c = [...admins];
                c.splice(index, 1);
                setAdmins(c);
              }}
              edit={(val, index) => {
                setShowAdminForm(true);
                setForm({ ...val });
                setEditing(val._id);
              }}
            />
          </Card>
          <Card title={`${editing === null ? "Add an" : "Edit"} Admin`}>
            <div className="md-padding">
              There are two levels of admin: "normal" and "super". The only
              difference is that super admins are allowed to add and edit other
              admins.
            </div>
            {!showAdminForm ? (
              <div className="flex-container">
                <button
                  className="btn primary"
                  style={{ flexGrow: 1 }}
                  onClick={() => setShowAdminForm(true)}
                >
                  Add
                </button>
              </div>
            ) : (
              <div>
                <Input
                  value={form.email}
                  label="Email"
                  onChange={(val) => setForm({ ...form, email: val })}
                  width={"var(--ta-width)"}
                />
                <div className="small-text md-padding">
                  Must be a staff.coloniasld.org email
                </div>
                <Input
                  value={form.class}
                  label="Class"
                  onChange={(val) => setForm({ ...form, class: val })}
                />
                <div className="small-text md-padding">
                  Use 9999 for a "super admin"
                </div>
                <hr />
                <div className="flex-container">
                  <button
                    style={{ flexGrow: "1" }}
                    className={`btn ${
                      validate(form) === true ? "primary" : "default"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      submit();
                    }}
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setShowAdminForm(false);
                      setEditing(null);
                      setForm({ email: "", class: "" });
                    }}
                    style={{ flexGrow: 1 }}
                    className="btn primary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Card>
        </>
      ) : null}
      <PushPollForward />
      <ClonePoll />
      <ExportToCSV />
      <ClearVotes />
    </div>
  );
}
