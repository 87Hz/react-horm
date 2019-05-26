import { createContext, FocusEventHandler } from 'react';
import { FormState, FormStateSetter } from './types';

export interface HormCtx {
  dirty: FormState<boolean>;
  errors: FormState<string[]>;
  initialValues: FormState;
  isValid: boolean;
  touched: FormState<boolean>;
  values: FormState;

  onSubmit: (vals: FormState) => void;
  setErrors: FormStateSetter<string[]>;
  setTouched: FormStateSetter<boolean>;
  setValues: FormStateSetter;
  handleBlur: FocusEventHandler;
}

export const HormContext = createContext<unknown>(undefined);
