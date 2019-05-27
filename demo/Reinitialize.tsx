import React, { useState } from 'react';
import * as Yup from 'yup';
import { inc } from 'ramda';
import { Horm, useForm, useField } from '../src';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
});

export const Reinitialize = () => {
  const [val, setVal] = useState(0);
  const initialValues = { email: '123', counter: val };

  return (
    <>
      <button type="button" onClick={() => setVal(inc)}>
        IncCounter {val}
      </button>

      <Horm
        initialValues={initialValues}
        validationSchema={validationSchema}
        isInitialValid
        enableReinitialize
        onSubmit={console.log}
        render={() => {
          const form = useForm();
          const emailField = useField('email');
          const counterField = useField('counter');

          return (
            <form {...form.htmlProps}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <input type="text" {...emailField.htmlProps} />
                  <h3>emailField.hormBag</h3>
                  <pre>{JSON.stringify(emailField.hormBag, undefined, 2)}</pre>
                  <h3>emailField.htmlProps</h3>
                  <pre>
                    {JSON.stringify(emailField.htmlProps, undefined, 2)}
                  </pre>
                </div>

                <div>
                  <input type="text" {...counterField.htmlProps} />
                  <h3>counterField.hormBag</h3>
                  <pre>
                    {JSON.stringify(counterField.hormBag, undefined, 2)}
                  </pre>
                  <h3>counterField.htmlProps</h3>
                  <pre>
                    {JSON.stringify(counterField.htmlProps, undefined, 2)}
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
    </>
  );
};
