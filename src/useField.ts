import { useContext, ChangeEvent } from 'react';
import { prop, propOr } from 'ramda';
import { HormContext, HormCtx } from './context';

export function useField(name: string) {
  const ctx = useContext(HormContext) as HormCtx;

  // ----------------------------------------------------
  // hormBag
  //
  const hormBag = {
    value: prop(name, ctx.values),
    initialValue: prop(name, ctx.initialValues),
    dirty: propOr(false, name, ctx.dirty),
    touched: propOr(false, name, ctx.touched),
    errors: propOr([], name, ctx.errors),

    setValue: ctx.setValues(name),
    setTouched: ctx.setTouched(name),
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
