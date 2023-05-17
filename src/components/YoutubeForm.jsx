import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import TextError from "./TextError.js";

const validationSchema = Yup.object({
  name: Yup.string().required("*Required"),
  email: Yup.string().email("*Invalid E-mail Format").required("*Required"),
  channel: Yup.string().required("*Required"),
});

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumber: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log(Formik.values);
};

const YoutubeForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" placeholder="Name" />
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field type="email" id="email" name="email" placeholder="E-mail" />
          <ErrorMessage name="email" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            id="channel"
            name="channel"
            placeholder="Channel Name"
          />
          <ErrorMessage name="channel" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field
            as="textarea"
            id="comments"
            name="comments"
            placeholder="Leave a comment..."
          />
        </div>

        <div className="form-control">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {(props) => {
              const { field, meta } = props;
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </Field>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook Profile</label>
          <Field
            type="text"
            id="facebook"
            name="social.facebook"
            placeholder="Your profile"
          />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter Profile</label>
          <Field
            type="text"
            id="twitter"
            name="social.twitter"
            placeholder="Your profile"
          />
        </div>

        <div className="form-control">
          <label htmlFor="primaryPh">Primary phone number</label>
          <Field
            type="text"
            id="primaryPh"
            name="phoneNumbers[0]"
            placeholder="(XXX)XXX-XXXX"
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondaryPh">Secondary phone number</label>
          <Field
            type="text"
            id="secondaryPh"
            name="phoneNumbers[1]"
            placeholder="(XXX)XXX-XXXX"
          />
        </div>

        <div className="form-control">
          <label>List of phone numbers</label>
          <FieldArray name="phNumbers">
            {(fieldArrayProps) => {
              console.log(fieldArrayProps);
              const { form, push, remove } = fieldArrayProps;
              const { values } = form;
              const { phNumbers } = values;
              return (
                <div>
                  {phNumbers.map((phNumber, index) => (
                    <div key={index}>
                      <Field name={`phNumbers[${index}]`} />
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          <AiOutlineMinus />
                        </button>
                      )}
                      <button type="button" onClick={() => push("")}>
                        <AiOutlinePlus />
                      </button>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default YoutubeForm;
