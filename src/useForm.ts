import { useContext, FormEventHandler } from "react";
import { HormContext, MapOf } from "./Horm";

interface FormHormBag {
  values: MapOf<any>;
  touched: MapOf<boolean>;
  setValues: (val: MapOf<any>) => void;
  setTouched: (val: MapOf<boolean>) => void;
}

interface FormHtmlProps {
  onSubmit: FormEventHandler;
}

export const useForm = () => {
  const ctx = useContext(HormContext);

  const harmBag: FormHormBag = {
    values: ctx.values,
    touched: ctx.touched,
    setValues: ctx.setValues,
    setTouched: ctx.setTouched
  };

  const htmlProps: FormHtmlProps = {
    onSubmit: ctx.onSubmit
  };

  return { harmBag, htmlProps };
};
