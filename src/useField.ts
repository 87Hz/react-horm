import { useContext, ChangeEventHandler, FocusEventHandler } from 'react';
import { prop } from 'ramda';
import { HormContext, HormCtx } from './context';
import { FieldStateSetter } from './types';

interface FieldHormBag {
  value: any;
  initialValue: any;
  dirty: boolean;
  touched: boolean;

  setTouched: FieldStateSetter<boolean>;
  setValue: FieldStateSetter;
}

interface FieldHtmlProps {
  name: string;
  value: any;

  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export function useField(name: string) {
  const ctx = useContext(HormContext) as HormCtx;

  // ----------------------------------------------------
  // hormBag
  //
  const hormBag: FieldHormBag = {
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
  const htmlProps: FieldHtmlProps = {
    name,
    value: hormBag.value,

    onChange: (e) => hormBag.setValue(e.currentTarget.value),
    onFocus: () => hormBag.setTouched(true),
  };

  return { hormBag, htmlProps };
}
