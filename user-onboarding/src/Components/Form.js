import React, { useState, useEffect } from "react";

import {withFormik, Form, Field } from "formik";


const PreFormikForm = props => {


  return (
    <Form>
      <Field type="text" name="name" placeholder="Your Name" />
    </Form>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ name }) {
    return {
      name: name || "",
    };
  },
})(PreFormikForm);
export default FormikForm;
