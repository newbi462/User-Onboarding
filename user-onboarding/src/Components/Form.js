import React, { useState, useEffect } from "react";

import {withFormik, Form, Field } from "formik";


const PreFormikForm = ( { values } ) => {


  return (
    <Form>
      <Field type="text" name="name" placeholder="Your Name" />
      <Field type="text" name="email" placeholder="E-Mail" />
      <Field type="password" name="password" placeholder="Password" />

      <Field
        type="checkbox"
        name="tos"
        checked={values.tos}
      />

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
})(PreFormikForm);
export default FormikForm;
