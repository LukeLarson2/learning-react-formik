import React, {useState} from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

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
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const savedValues = {
  name: "Lucas",
  email: "l@example.com",
  channel: "asd",
  comments: "welcome to formik",
  address: "123 fake street",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
  console.log('Form data',values)
  console.log('Submit Props', onSubmitProps)
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm()
};

const validateComments = value => {
	let error
	if(!value) {
		error = 'Required'
	}
	return error
}

const YoutubeForm = () => {
  const [formValues, setFormValues] = useState(null)

  return (
    <Formik
      initialValues={formValues || initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      enableReinitialize
    >
      {formik => {
          return (
            <Form>
        <div className="form-control">
          <label htmlFor="name">
            Name<span className="error">*</span>
          </label>
          <Field
            className="field-form"
            type="text"
            id="name"
            name="name"
            placeholder="First and last name"
          />
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="email">
            E-mail<span className="error">*</span>
          </label>
          <Field
            className="field-form"
            type="email"
            id="email"
            name="email"
            placeholder="E-mail address"
          />
          <ErrorMessage name="email" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="channel">
            Channel<span className="error">*</span>
          </label>
          <Field
            type="text"
            id="channel"
            name="channel"
            className="field-form"
            placeholder="Youtube channel name"
          />
          <ErrorMessage name="channel" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field
	          as='textarea'
	          id='comments'
	          name='comments'
            placeholder='Leave a comment...'
	          validate={validateComments}
          />
          <ErrorMessage name='comments' component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="address">Address</label>
          <FastField name="address">
            {(props) => {
              const { field, meta } = props;
              return (
                <div>
                  <input
                    className="field-form"
                    type="text"
                    id="address"
                    placeholder="Mailing address"
                    {...field}
                  />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </FastField>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook Profile</label>
          <Field
            className="field-form"
            type="text"
            id="facebook"
            name="social.facebook"
            placeholder="Your profile name"
          />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter Profile</label>
          <Field
            className="field-form"
            type="text"
            id="twitter"
            name="social.twitter"
            placeholder="Twitter handle"
          />
        </div>

        <div className="form-control">
          <label htmlFor="primaryPh">Primary phone number</label>
          <Field
            className="field-form"
            type="text"
            id="primaryPh"
            name="phoneNumbers[0]"
            placeholder="(XXX) XXX-XXXX"
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondaryPh">Secondary phone number</label>
          <Field
            className="field-form"
            type="text"
            id="secondaryPh"
            name="phoneNumbers[1]"
            placeholder="(XXX) XXX-XXXX"
          />
        </div>

        <div className="form-control">
          <label>List of phone numbers</label>
          <FieldArray name="phNumbers">
            {(fieldArrayProps) => {
              const { form, push, remove } = fieldArrayProps;
              const { values } = form;
              const { phNumbers } = values;
              return (
                <div className="container">
                  {phNumbers.map((phNumber, index) => (
                    <div key={index} className="field">
                      <Field
                        type="text"
                        name={`phNumbers[${index}]`}
                        placeholder="(XXX) XXX-XXXX"
                        className="num-list"
                      />
                      {index > 0 && (
                        <AiOutlineMinusCircle
                          className="button remove"
                          onClick={() => remove(index)}
                        />
                      )}
                      <AiOutlinePlusCircle
                        className="button add"
                        onClick={() => push("")}
                      />
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>
        {/* <button type="button" onClick={() => formik.setFieldTouched('comments')}>Visit Comments</button>
        <button type="button" onClick={() => formik.setTouched({
          name: true,
          email:true,
          channel: true,
          comments:true
        })}>Visit Fields</button>
        <button type="button" onClick={() => formik.validateField('comments')}>Validate Comments</button>
        <button type="button" onClick={() => formik.validateForm()}>Validate All</button> */}
        <button type="button" onClick={() => setFormValues(savedValues)}>Load Saved Data</button>
        <button type="reset">Reset</button>
        <button type="submit" disabled={formik.isSubmitting || !formik.isValid}>Submit</button>
      </Form>
          )
        }
      }
    </Formik>
  );
};

export default YoutubeForm;
