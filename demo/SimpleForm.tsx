import React from 'react';
import { Horm, useForm, useField } from '../src';

const initialValues = { email: '123', password: 'pass' };

export const SimpleForm = () => {
  return (
    <Horm
      initialValues={initialValues}
      isInitialValid
      onSubmit={console.log}
      render={() => {
        const form = useForm();
        const emailField = useField('email');
        const passwordField = useField('password');

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
                <pre>
                  {JSON.stringify(passwordField.htmlProps, undefined, 2)}
                </pre>
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
