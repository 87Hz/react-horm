import { useContext, ChangeEvent } from 'react';
import { prop, propOr, isEmpty } from 'ramda';
import { HormContext, HormCtx } from './context';
import { FormState } from './types';

export function useField(name: string) {
  const ctx = useContext(HormContext) as HormCtx;

  // ----------------------------------------------------
  // hormBag
  //
  const errors = propOr<string[], FormState<string[]>, string[]>(
    [],
    name,
    ctx.errors
  );

  const hormBag = {
    value: prop(name, ctx.values),
    initialValue: prop(name, ctx.initialValues),
    dirty: propOr<boolean, FormState<boolean>, boolean>(false, name, ctx.dirty),
    touched: propOr<boolean, FormState<boolean>, boolean>(
      false,
      name,
      ctx.touched
    ),
    errors,
    isValid: isEmpty(errors),

    setValue: ctx.setValues(name),
    setTouched: ctx.setTouched(name),
    setErrors: ctx.setErrors(name),
  };

  // ----------------------------------------------------
  // htmlProps
  //
  const htmlProps = {
    name,
    value: hormBag.value,

    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      hormBag.setValue(e.currentTarget.value),

    onFocus: () => hormBag.setTouched(true),

    onBlur: ctx.handleBlur,
  };

  return { hormBag, htmlProps };
}
