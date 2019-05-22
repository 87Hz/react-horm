import React, { ReactNode, useState, FormEventHandler } from "react";
import { assoc } from "ramda";

export type MapOf<T = string> = { [K: string]: T };

export interface HormProps {
  initialValues: any;
  onSubmit: (values: MapOf<any>) => void;

  validationSchema?: any;
  enableReinitialization?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  render?: React.FC;
  children?: ReactNode;
}

export interface HormCtx {
  values: MapOf<any>;
  touched: MapOf<boolean>;
  setValues: (val: MapOf<any>) => void;
  setTouched: (val: MapOf<boolean>) => void;
  setFieldValue: (name: string) => (val: any) => void;
  setFieldTouched: (name: string) => (val: boolean) => void;
  onSubmit: FormEventHandler;
}

export const HormContext = React.createContext<HormCtx>(null);

export const Horm = (props: HormProps) => {
  const { render: Render } = props;
  const children = Render ? <Render /> : props.children;

  // states
  const [values, setValues] = useState(props.initialValues);
  const [touched, setTouched] = useState({});

  const setFieldValue = (name: string) => (val: any) =>
    setValues(assoc(name, val));

  const setFieldTouched = (name: string) => (val: boolean) =>
    setTouched(assoc(name, val));

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();
    props.onSubmit(values);
  };

  const ctx: HormCtx = {
    values,
    touched,
    setValues,
    setTouched,
    setFieldValue,
    setFieldTouched,
    onSubmit
  };

  return <HormContext.Provider value={ctx}>{children}</HormContext.Provider>;
};
