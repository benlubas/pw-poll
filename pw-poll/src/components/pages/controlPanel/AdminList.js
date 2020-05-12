import React, { useContext } from "react";
import Table from "./../../table/Table";
import { EditSVG, CircleXSVG } from "../../svg";
import { secureDelete } from "./../../../hooks/secureDelete";
import UserProvider from "../../../providers/UserProvider";
import { url } from "./../../../url";
import { ModalSet } from "../../modal/Modal";

export default function AdminList({ edit, admins, remove, ...props }) {
  const session = useContext(UserProvider.context);
  return (
    <div style={{ overflow: "scroll" }} {...props}>
      <Table headers={["Email", "Class", ""]}>
        {admins.map((val, index) =>
          val.email !== session.user.email
            ? [
                <div>{val.email}</div>,
                <div>{val.class}</div>,
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <EditSVG
                    className="pointer"
                    onClick={() => {
                      edit(val, index);
                    }}
                  />
                  <ModalSet
                    title="Are You Sure?"
                    customTrigger={<CircleXSVG className="pointer" />}
                    height="200px"
                    onConfirm={async () => {
                      await secureDelete(url + "admin/" + val._id);
                      remove(index);
                      return true;
                    }}
                    confirmClass="danger"
                    closeClass="default"
                  >
                    Are you sure you want to remove {val.email} as an admin?
                  </ModalSet>
                </div>,
              ]
            : []
        )}
      </Table>
    </div>
  );
}
