import { createContext, FocusEventHandler } from 'react';
import { FormState, FormStateSetter } from './types';

export interface HormCtx {
  dirty: FormState<boolean>;
  errors: FormState<string[]>;
  initialValues: FormState;
  isValid: boolean;
  isValidating: boolean;
  touched: FormState<boolean>;
  values: FormState;

  validate: () => void;
  onSubmit: (vals: FormState) => void;
  setErrors: FormStateSetter<string[]>;
  setTouched: FormStateSetter<boolean>;
  setValues: FormStateSetter;
  handleBlur: FocusEventHandler;
}

export const HormContext = createContext<unknown>(undefined);
