import React, { useState, useEffect } from "react";

import {withFormik, Form, Field } from "formik";
import * as Yup from "yup"; // for everything
import axios from "axios";


const PreFormikForm = ( { values, errors, touched, status } ) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <Form>
      <Field type="text" name="name" placeholder="Your Name" />
      {touched.name && errors.name && (
        <p className="errors">{errors.name}</p>
      )}

      <Field type="text" name="email" placeholder="E-Mail" />
      {touched.email && errors.email && (
        <p className="errors">{errors.email}</p>
      )}

      <Field type="password" name="password" placeholder="Password" />

      <label className="checkbox-container">
        Check to agree to the TOS
        <Field
          type="checkbox"
          name="tos"
          checked={values.tos}
        />
      </label>
      {touched.tos && errors.tos && (
        <p className="errors">{errors.tos}</p>
      )}

      <button>Submit</button>

      <>
      {users.map(item => (
        <ul key={item.id}>
          <li>Name: {item.name}</li>
          <li>Email: {item.email}</li>
        </ul>
      ))}
      </>
    </Form>


  );
};

const FormikForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    tos: Yup.boolean(true).required()
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(response => {
        setStatus(response.data);
        console.log(response);
      })
      .catch(error => console.log(error.response));
  }
})(PreFormikForm);
export default FormikForm;
