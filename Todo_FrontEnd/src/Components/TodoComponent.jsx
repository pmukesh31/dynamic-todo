import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTodoItem,
  reterieveTodoItem,
  updateTodoItem,
} from "./api/ApiServices";

export function TodoComponent() {
  const { username, id } = useParams();

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => refreshTodo());

  function refreshTodo() {
    reterieveTodoItem(username, id)
      .then((response) => {
        setDescription(response.data.description);
        setTargetDate(response.data.targetDate);
      })
      .catch((error) => console.log(error));
  }

  function onSubmit(values) {
    console.log(values);

    const todo = {
      id: id,
      description: values.description,
      targetDate: values.targetDate,
      username: username,
      done: false,
    };

    if (id === -1) {
      createTodoItem(username, todo)
        .then((response) => navigate("/todos"))
        .catch((error) => console.log(error));
    } else {
      updateTodoItem(username, id, todo)
        .then((response) => navigate("/todos"))
        .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    const errors = {
      //   description: "Description should have atleat 5 characters",
      //   targetDate: "Please select a target Date",
    };
    // console.log(values);
    if (values.description.length < 5)
      errors.description = "Description should have atleat 5 characters";
    if (values.targetDate == null || values.targetDate === "")
      errors.targetDate = "Please select a target Date";
    return errors;
  }

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>
        <Formik
          enableReinitialize={true}
          onSubmit={onSubmit}
          initialValues={{ description, targetDate }}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Enter Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Enter Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <button className="btn btn-success m-5" type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
