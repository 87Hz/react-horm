import React, { ReactNode, useState, FormEventHandler, useEffect } from 'react';
import R from 'ramda';
import { Schema } from 'yup';

export type HormProps<FV> = {
  children?: ReactNode;
  enableReinitialization?: boolean;
  initialValues: FV;
  onSubmit: (vals: FV) => void;
  render?: React.FC;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validationSchema?: Schema<FV>;
};

export interface HormCtx<FV> extends Pick<HormProps<FV>, 'initialValues'> {
  dirty: Record<keyof FV, boolean>;
  errors: Record<keyof FV, string[]>;
  isValid: boolean;
  onSubmit: FormEventHandler;
  setErrors: React.Dispatch<React.SetStateAction<Record<keyof FV, string[]>>>;
  setTouched: React.Dispatch<React.SetStateAction<Record<keyof FV, boolean>>>;
  setValues: React.Dispatch<React.SetStateAction<Record<keyof FV, any>>>;
  touched: Record<keyof FV, boolean>;
  values: FV;
}

export const HormContext = React.createContext<any>(null);

// const validate = async (errorSetter: any, values: any, validationSchema: Schema<any>) => {
//   try {
//     await validationSchema.validate(values, { abortEarly: false });
//   } catch (e) {
//     console.log('e', e);
//   }
// };

export function Horm<FV>(props: HormProps<FV>) {
  const { render: Render } = props;
  const children = Render ? <Render /> : props.children;

  // states
  const [initialValues, setInitialValues] = useState(props.initialValues);
  const [dirty, setDirty] = useState<Record<any, boolean>>(R.mapObjIndexed(R.F, props.initialValues));
  const [errors, setErrors] = useState<Record<any, string[]>>(R.mapObjIndexed(R.always([]), props.initialValues));
  const [touched, setTouched] = useState<Record<any, boolean>>(R.mapObjIndexed(R.F, props.initialValues));
  const [values, setValues] = useState(props.initialValues);
  const [initialErrors, setInitialErrors] = useState<Record<any, string[]>>(
    R.mapObjIndexed(R.always([]), props.initialValues)
  );

  const isValid = R.pipe(
    R.values,
    R.all(R.isEmpty)
  )(errors);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    props.onSubmit(values);
  };

  const ctx: HormCtx<FV> = {
    dirty,
    errors,
    initialValues,
    isValid,
    onSubmit,
    setErrors,
    setTouched,
    setValues,
    touched,
    values,
  };

  return <HormContext.Provider value={ctx}>{children}</HormContext.Provider>;
}
