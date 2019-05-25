import { useContext, ChangeEvent } from 'react';
import { prop } from 'ramda';
import { HormContext, HormCtx } from './context';

export function useField(name: string) {
  const ctx = useContext(HormContext) as HormCtx;

  // ----------------------------------------------------
  // hormBag
  //
  const hormBag = {
    value: prop(name, ctx.values),
    initialValue: prop(name, ctx.initialValues),
    dirty: prop(name, ctx.dirty),
    touched: prop(name, ctx.touched),

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
  };

  return { hormBag, htmlProps };
}
