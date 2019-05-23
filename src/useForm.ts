import { useContext, FormEventHandler } from 'react';
import R from 'ramda';
import { HormContext, HormCtx } from './Horm';

type FormHormBag<FV> = Pick<
  HormCtx<FV>,
  'dirty' | 'errors' | 'initialValues' | 'isValid' | 'setErrors' | 'setTouched' | 'setValues' | 'touched' | 'values'
>;

interface FormHtmlProps {
  onSubmit: FormEventHandler;
}

export function useForm<FV>() {
  const ctx = useContext<HormCtx<FV>>(HormContext);

  // ----------------------------------------------------
  // hormBag
  //
  const hormBag: FormHormBag<FV> = R.pickAll(
    ['dirty', 'errors', 'initialValues', 'isValid', 'setErrors', 'setTouched', 'setValues', 'touched', 'values'],
    ctx
  );

  // ----------------------------------------------------
  // htmlProps
  //
  const htmlProps: FormHtmlProps = {
    onSubmit: ctx.onSubmit,
  };

  return { hormBag, htmlProps };
}
