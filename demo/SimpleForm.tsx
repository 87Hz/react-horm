import React from 'react';
import * as Yup from 'yup';
import { Horm, useForm, useField } from '../src';

type FormValues = {
  email: string;
  password: string;
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),

  password: Yup.string()
    .min(6)
    .required(),
});

export const SimpleForm = () => {
  const initialValues = { email: '123', password: 'pass' };

  return (
    <Horm<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={console.log}
      render={() => {
        const form = useForm<FormValues>();
        const emailField = useField<FormValues, 'email'>('email');
        const passwordField = useField<FormValues, 'password'>('password');

        return (
          <form {...form.htmlProps}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <input type="text" {...emailField.htmlProps} />
                <h3>emailField.hormBag</h3>
                <pre>{JSON.stringify(emailField.hormBag, undefined, 2)}</pre>
                <h3>emailField.htmlProps</h3>
                <pre>{JSON.stringify(emailField.htmlProps, undefined, 2)}</pre>
              </div>

              <div>
                <input type="password" {...passwordField.htmlProps} />
                <h3>passwordField.hormBag</h3>
                <pre>{JSON.stringify(passwordField.hormBag, undefined, 2)}</pre>
                <h3>passwordField.htmlProps</h3>
                <pre>{JSON.stringify(passwordField.htmlProps, undefined, 2)}</pre>
              </div>

              <div>
                <button type="submit">submit</button>
                <h3>form.hormBag</h3>
                <pre>{JSON.stringify(form.hormBag, undefined, 2)}</pre>
              </div>
            </div>
          </form>
        );
      }}
    />
  );
};