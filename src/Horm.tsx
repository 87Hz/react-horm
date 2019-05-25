import React, { ReactNode, useState } from 'react';
import { assoc, curry } from 'ramda';
import { Schema } from 'yup';
import { FormState } from './types';
import { HormCtx, HormContext } from './context';

export type HormProps = {
  initialValues: FormState;
  onSubmit: (vals: FormState) => void;
  render?: React.FC;
  children?: ReactNode;
  isInitialValid?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  enableReinitialization?: boolean;
  validationSchema?: Schema<FormState>;
};

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
  // Handlers
  //
  const setValues = curry((name: string, val: any) => {
    setFormValues(assoc(name, val));
  });

  const setTouched = curry((name: string, val: boolean) => {
    setFormTouched(assoc(name, val));
  });

  const setErrors = curry((name: string, val: string[]) => {
    setFormErrors(assoc(name, val));
  });

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
    setErrors,
    setTouched,
    setValues,
  };

  return <HormContext.Provider value={ctx}>{children}</HormContext.Provider>;
}
