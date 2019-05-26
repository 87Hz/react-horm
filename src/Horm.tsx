import React, { ReactNode, useState, useEffect } from 'react';
import {
  assoc,
  curry,
  propEq,
  complement,
  pipe,
  values,
  isEmpty,
  all,
} from 'ramda';
import { Schema } from 'yup';
import { FormState } from './types';
import { HormCtx, HormContext } from './context';
import { validateFormValues, ValidationFn } from './validation';

export type HormProps = {
  initialValues: FormState;
  onSubmit: (vals: FormState) => void;
  render?: React.FC;
  children?: ReactNode;
  isInitialValid?: boolean;
  validateOnBlur?: boolean; // happens in handleBlur and setTouched
  validateOnChange?: boolean; // happens in setValues
  enableReinitialize?: boolean;
  validationSchema?: Schema<FormState>;
  validationFn?: ValidationFn;
};

const propNotEq = complement(propEq);

export function Horm(props: HormProps) {
  const {
    render: Render,
    isInitialValid = false,
    validateOnBlur = true,
    validateOnChange = true,
    enableReinitialize = false,
  } = props;
  const children = Render ? <Render /> : props.children;

  // ----------------------------------------------------
  // States
  //
  const [initialValues, setInitialValues] = useState(props.initialValues);
  const [formValues, setFormValues] = useState(props.initialValues);
  const [isValid, setIsValid] = useState(isInitialValid);
  const [isValidating, setIsValidating] = useState(false);
  const [formDirty, setFormDirty] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});

  // ----------------------------------------------------
  // Effects
  //
  useEffect(() => {
    if (enableReinitialize) {
      reset(props.initialValues);
    }
  }, [props.initialValues]);

  // ----------------------------------------------------
  // Reset
  //
  const reset = (initialValues: FormState) => {
    setInitialValues(initialValues);
    setFormValues(initialValues);
    setIsValid(isInitialValid);
    setIsValidating(false);
    setFormDirty({});
    setFormErrors({});
    setFormTouched({});
  };

  // ----------------------------------------------------
  // Validations
  //
  const runValidation = async (valuesToValidate: FormState = formValues) => {
    setIsValidating(true);

    const errors = await validateFormValues({
      valuesToValidate,
      validationSchema: props.validationSchema,
      validationFn: props.validationFn,
    });

    const isValid = pipe(
      values,
      all(isEmpty)
    )(errors);

    setIsValid(isValid);
    setFormErrors(errors);
    setIsValidating(false);
  };

  // ----------------------------------------------------
  // Return
  //
  const ctx: HormCtx = {
    dirty: formDirty,
    errors: formErrors,
    initialValues,
    isValid,
    isValidating,
    touched: formTouched,
    values: formValues,

    onSubmit: props.onSubmit,
    validate: runValidation,

    setErrors: curry((name: string, val: string[]) => {
      setFormErrors(assoc(name, val));
    }),

    setTouched: curry((name: string, val: boolean) => {
      setFormTouched(assoc(name, val));
      validateOnBlur && runValidation();
    }),

    setValues: curry((name: string, val: any) => {
      const newValues = assoc(name, val, formValues);
      setFormValues(newValues);
      setFormDirty(assoc(name, propNotEq(name, val, initialValues)));
      validateOnChange && runValidation(newValues);
    }),

    handleBlur: () => {
      validateOnBlur && runValidation();
    },
  };

  return <HormContext.Provider value={ctx}>{children}</HormContext.Provider>;
}
