import { useContext, ChangeEventHandler, FocusEventHandler } from 'react';
import R from 'ramda';
import { HormContext, HormCtx } from './Horm';

interface FieldHormBag<FV> {
  value: FV[keyof FV];
  touched: boolean;
  setValue: (val: FV[keyof FV]) => void;
  setTouched: (val: boolean) => void;
}

interface FieldHtmlProps<FV> {
  name: keyof FV;
  value: FV[keyof FV];
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus: FocusEventHandler;
}

export function useField<FV>(name: keyof FV) {
  const ctx = useContext<HormCtx<FV>>(HormContext);
  const value = R.prop(name, ctx.values);

  // ----------------------------------------------------
  // hormBag
  //
  const touched: boolean = R.propOr(false, name.toString(), ctx.touched);
  const setValue = (val: any) => ctx.setValues(R.assoc(name.toString(), val));
  const setTouched = (val: boolean) => ctx.setTouched(R.assoc(name.toString(), val));

  const hormBag: FieldHormBag<FV> = {
    value,
    touched,
    setValue,
    setTouched,
  };

  // ----------------------------------------------------
  // htmlProps
  //
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  const onFocus: FocusEventHandler = () => {
    setTouched(true);
  };

  const htmlProps: FieldHtmlProps<FV> = {
    name,
    value,
    onChange,
    onFocus,
  };

  return { hormBag, htmlProps };
}
