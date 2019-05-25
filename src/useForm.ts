import { useContext, FormEventHandler } from 'react';
import { HormContext, HormCtx } from './context';

type FormHormBag = Pick<HormCtx, 'dirty' | 'errors' | 'touched' | 'values'>;

interface FormHtmlProps {
  onSubmit: FormEventHandler;
}

export function useForm() {
  const ctx = useContext(HormContext) as HormCtx;

  // ----------------------------------------------------
  // hormBag
  //
  const hormBag: FormHormBag = {
    dirty: ctx.dirty,
    errors: ctx.errors,
    touched: ctx.touched,
    values: ctx.values,
  };

  // ----------------------------------------------------
  // htmlProps
  //
  const htmlProps: FormHtmlProps = {
    onSubmit: (e) => {
      e.preventDefault();
      if (ctx.isValid) {
        ctx.onSubmit(ctx.values);
      }
    },
  };

  return { hormBag, htmlProps };
}
