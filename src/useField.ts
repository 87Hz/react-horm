import { useContext, ChangeEventHandler } from "react";
import { prop } from "ramda";
import { HormContext } from "./Horm";

interface FieldHormBag {
  value: any;
  touched: boolean;
  setValue: (val: any) => void;
  setTouched: (val: boolean) => void;
}

interface FieldHtmlProps {
  name: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const useField = (name: string) => {
  const ctx = useContext(HormContext);

  const value = prop(name, ctx.values);
  const touched = prop(name, ctx.touched);
  const setValue = ctx.setFieldValue(name);
  const setTouched = ctx.setFieldTouched(name);

  const harmBag: FieldHormBag = {
    value,
    touched,
    setValue,
    setTouched
  };

  const htmlProps: FieldHtmlProps = {
    name,
    value,
    onChange: e => setValue(e.currentTarget.value)
  };

  return { harmBag, htmlProps };
};
