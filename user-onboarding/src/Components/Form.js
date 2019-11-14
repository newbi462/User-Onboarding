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

      <Field as="select" name="role" >
        <option>Please Choose Your Role</option>
        <option value="web25">Web 25</option>
        <option value="team-lead">Team Lead</option>
        <option value="master-of-the-universe">Master of the Universe</option>
      </Field>

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

      {users.map(item => (
        <>
        <h2>Name: {item.name}</h2>
        <ul key={item.id}>
          <li>Email: {item.email}</li>
          <li>Role: {item.role}</li>
        </ul>
        </>
      ))}
    </Form>


  );
};

const FormikForm = withFormik({
  mapPropsToValues({ name, email, password, tos, role }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
      role: role || "",
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
