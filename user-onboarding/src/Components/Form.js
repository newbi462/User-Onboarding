import React, { useState, useEffect } from "react";

import {withFormik, Form, Field } from "formik";
import * as Yup from "yup"; // for everything


const PreFormikForm = ( { values, errors, touched } ) => {

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


      <button>Submit :)</button>
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
})(PreFormikForm);
export default FormikForm;
