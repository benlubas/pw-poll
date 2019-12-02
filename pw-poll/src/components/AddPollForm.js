import React from "react";
import { Formik } from "formik";

export const AddPollForm = props => {
  const url = "http://localhost:5000/polls/";
  return (
    <Formik
      initialValues={{ title: "New Poll" }}
      onSubmit={(values, actions) => {
        fetch(url);
        actions.setSubmitting(false);
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.title}
            name="title"
          />
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};
export default AddPollForm;
