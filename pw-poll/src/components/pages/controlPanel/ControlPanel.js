import React, { useState, useEffect } from "react";
import Card from "../../card/Card";
import { useHistory } from "react-router";
import Input from "../../form/input/Input";
import { securePost } from "../../../hooks/securePost";
import { useSecureFetch } from "../../../hooks/useSecureFetch";
import { url } from "../../../url";
import AdminList from "./AdminList";
import { securePut } from "../../../hooks/securePut";
import PushPollForward from "./PushPollForward";

const validate = form => {
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
    class: ""
  });
  const history = useHistory();
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
        await securePut(url + "admin", {
          ...form,
          _id: editing
        });
        let c = [...admins];
        let i = c.findIndex(v => v._id === editing);
        c[i] = { ...c[i], ...form };
        setAdmins(c);
      }
      console.log(admins);
      setForm({ email: "", class: "" });
      setEditing(null);
    }
    //working in here. don't know if there server has this endpoint
    //or if it needs something else.
  };
  return (
    <div className="page-container">
      <div className="big-text">Control Panel</div>
      <div className="small-text link" onClick={() => history.goBack()}>
        &lt;&lt; Back
      </div>
      <Card title="Add an Admin">
        <div className="md-padding">
          There are two levels of admin: "normal" and "super". Normal admins
          have a grad year, and they can only interact with polls for that
          assigned year. Super admins can do everything and are also able to
          create and manage other admins.
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
              onChange={val => setForm({ ...form, email: val })}
              width={"var(--ta-width)"}
            />
            <div className="small-text md-padding">
              Must be a staff.coloniasld.org email
            </div>
            <Input
              value={form.class}
              label="Class"
              onChange={val => setForm({ ...form, class: val })}
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
                onClick={e => {
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
      {admins !== null ? (
        <Card title="Admins">
          <AdminList
            admins={admins}
            remove={index => {
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
      ) : null}
      <PushPollForward />
    </div>
  );
}
