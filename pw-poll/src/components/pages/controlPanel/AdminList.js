import React, { useContext } from "react";
import Table from "./../../table/Table";
import { EditSVG, CircleXSVG } from "../../svg";
import { secureDelete } from "./../../../hooks/secureDelete";
import UserProvider from "../../../providers/UserProvider";
import { url } from "./../../../url";

export default function AdminList({ edit, admins, remove, ...props }) {
  const session = useContext(UserProvider.context);
  return (
    <div {...props}>
      <Table headers={["Email", "Class", ""]}>
        {admins.map((val, index) =>
          val.email !== session.user.email
            ? [
                <div>{val.email}</div>,
                <div>{val.class}</div>,
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <EditSVG
                    onClick={() => {
                      edit(val, index);
                    }}
                  />
                  <CircleXSVG
                    onClick={async () => {
                      await secureDelete(url + "admin/" + val._id);
                      remove(index);
                    }}
                  />
                </div>
              ]
            : []
        )}
      </Table>
    </div>
  );
}
