import React, { ReactNode, useState } from 'react';
import { assoc, curry, propEq, complement } from 'ramda';
import { Schema } from 'yup';
import { FormState } from './types';
import { HormCtx, HormContext } from './context';
import { validateFormValues } from './validation';

export type HormProps = {
  initialValues: FormState;
  onSubmit: (vals: FormState) => void;
  render?: React.FC;
  children?: ReactNode;
  isInitialValid?: boolean;
  // happens in handleBlur and setTouched
  validateOnBlur?: boolean;
  // happens in setValues
  validateOnChange?: boolean;
  enableReinitialization?: boolean;
  validationSchema?: Schema<FormState>;
};

const propNotEq = complement(propEq);

export function Horm(props: HormProps) {
  const {
    render: Render,
    isInitialValid = false,
    validateOnBlur = true,
    validateOnChange = true,
  } = props;
  const children = Render ? <Render /> : props.children;

  // ----------------------------------------------------
  // States
  //
  const [initialValues, setInitialValues] = useState(props.initialValues);
  const [formValues, setFormValues] = useState(props.initialValues);
  const [isValid, setIsValid] = useState(isInitialValid);
  const [formDirty, setFormDirty] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});

  // ----------------------------------------------------
  // Effects
  //

  // ----------------------------------------------------
  // Return
  //
  const ctx: HormCtx = {
    dirty: formDirty,
    errors: formErrors,
    initialValues,
    isValid,
    touched: formTouched,
    values: formValues,

    onSubmit: props.onSubmit,

    setErrors: curry((name: string, val: string[]) => {
      setFormErrors(assoc(name, val));
    }),

    setTouched: curry(async (name: string, val: boolean) => {
      setFormTouched(assoc(name, val));

      if (validateOnBlur) {
        const errors = await validateFormValues({
          formValues,
          validationSchema: props.validationSchema,
        });
        setFormErrors(errors);
      }
    }),

    setValues: curry(async (name: string, val: any) => {
      const newValues = assoc(name, val, formValues);
      setFormValues(newValues);
      setFormDirty(assoc(name, propNotEq(name, val, initialValues)));

      if (validateOnChange) {
        const errors = await validateFormValues({
          formValues: newValues,
          validationSchema: props.validationSchema,
        });
        setFormErrors(errors);
      }
    }),

    handleBlur: async () => {
      if (validateOnBlur) {
        const errors = await validateFormValues({
          formValues,
          validationSchema: props.validationSchema,
        });
        setFormErrors(errors);
      }
    },
  };

  return <HormContext.Provider value={ctx}>{children}</HormContext.Provider>;
}
