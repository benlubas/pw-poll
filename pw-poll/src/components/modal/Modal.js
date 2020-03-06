import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CircleXSVG } from "./../svg";
import "./modal.css";

const modalRoot = document.getElementById("modal-root");

export const ModalSet = props => {
  const [shown, setShown] = useState(false);
  const color = props.triggerColor || "danger";
  return (
    <>
      <div
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

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="modal-bg">
      <div
        elevation={10}
        style={{
          width: props.width ? props.width : "60%",
          height: props.height ? props.height : "75%",
          borderRadius: props.borderRadius ? props.borderRadius : "0px"
        }}
        className="paper modal-container"
      >
        <div className="modal-header">
          {props.title}
          <button href="#" onClick={props.onClose} className="modal-close">
            <CircleXSVG />
          </button>
          <hr />
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <div
            className={`btn ${props.confirmClass || "success"}`}
            onClick={() => {
              if (props.onConfirm !== undefined) {
                props.onConfirm();
                if (props.onConfirm()) props.onClose();
              }
            }}
          >
            Confirm
          </div>
          <div
            className={`btn ${
              props.closeClass === undefined ? "danger" : props.closeClass
            }`}
            onClick={() => (props.onClose ? props.onClose() : null)}
          >
            Close
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
