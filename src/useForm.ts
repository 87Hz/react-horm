import { useContext, FormEvent } from 'react';
import { HormContext, HormCtx } from './context';

export function useForm() {
  const ctx = useContext(HormContext) as HormCtx;

  // ----------------------------------------------------
  // hormBag
  //
  const hormBag = {
    dirty: ctx.dirty,
    errors: ctx.errors,
    isValid: ctx.isValid,
    isValidating: ctx.isValidating,
    touched: ctx.touched,
    values: ctx.values,
  };

  // ----------------------------------------------------
  // htmlProps
  //
  const htmlProps = {
    onSubmit: (e: FormEvent) => {
      e.preventDefault();
      ctx.isValid && ctx.onSubmit(ctx.values);
    },
  };

  return { hormBag, htmlProps };
}
