import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CircleXSVG } from "./../svg";
import "./modal.css";

const modalRoot = document.getElementById("modal-root");

export const ModalSet = (props) => {
  const [shown, setShown] = useState(false);
  const color = props.triggerColor || "danger";
  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center" }}
        ref={props.triggerRef !== undefined ? props.triggerRef : null}
        className={props.customTrigger ? "" : "btn " + color}
        onClick={() => setShown(true)}
      >
        {props.customTrigger || props.trigger}
      </div>
      {shown ? (
        <Modal {...props} title={props.title} onClose={() => setShown(false)}>
          {props.children}
        </Modal>
      ) : null}
    </>
  );
};

export const Modal = (props) => {
  const [shown, setShown] = useState(props.standAlone || false);
  return shown || props.standAlone === undefined
    ? ReactDOM.createPortal(
        <div className="modal-bg">
          <div
            elevation={10}
            style={{
              width: props.width ? props.width : "60%",
              height: props.height ? props.height : "75%",
              borderRadius: props.borderRadius ? props.borderRadius : "0px",
            }}
            className="paper modal-container"
          >
            <div className="modal-header">
              {props.title}
              <button
                href="#"
                onClick={() =>
                  (props.onClose && props.onClose()) || setShown(false)
                }
                className="modal-close"
                title="close"
              >
                <CircleXSVG />
              </button>
              <hr />
            </div>
            <div className="modal-body">{props.children}</div>
            {props.noFooter ? null : (
              <div className="modal-footer">
                {props.noConfirm ? null : (
                  <div
                    className={`btn ${props.confirmClass || "success"}`}
                    onClick={() => {
                      if (props.onConfirm !== undefined) {
                        if (props.onConfirm()) props.onClose();
                      }
                    }}
                  >
                    Confirm
                  </div>
                )}
                <div
                  className={`btn ${
                    props.closeClass === undefined ? "danger" : props.closeClass
                  }`}
                  onClick={() =>
                    (props.onClose && props.onClose()) || setShown(false)
                  }
                >
                  Close
                </div>
              </div>
            )}
          </div>
        </div>,
        modalRoot
      )
    : null;
};
