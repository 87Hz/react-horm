import { useContext, ChangeEventHandler, FocusEventHandler } from 'react';
import R from 'ramda';
import { HormContext, HormCtx } from './Horm';

interface FieldHormBag<V> {
  value: V;
  touched: boolean;
  setValue: (val: V) => void;
  setTouched: (val: boolean) => void;
}

interface FieldHtmlProps<N, V> {
  name: N;
  value: V;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus: FocusEventHandler;
}

export function useField<FV, N extends keyof FV>(name: N) {
  const ctx = useContext<HormCtx<FV>>(HormContext);
  const value = R.prop(name, ctx.values);

  // ----------------------------------------------------
  // hormBag
  //
  const touched: boolean = R.propOr(false, name.toString(), ctx.touched);
  const setValue = (val: any) => ctx.setValues(R.assoc(name.toString(), val));
  const setTouched = (val: boolean) => ctx.setTouched(R.assoc(name.toString(), val));

  const hormBag: FieldHormBag<FV[N]> = {
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

  const htmlProps: FieldHtmlProps<N, FV[N]> = {
    name,
    value,
    onChange,
    onFocus,
  };

  return { hormBag, htmlProps };
}
