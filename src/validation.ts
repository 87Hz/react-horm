import { Schema, ValidationError } from 'yup';
import { prop, pluck, zipObj } from 'ramda';

import { FormValues } from './Horm';

/* ---------------------------------------------------------
 * YupSchema
 *
 */
export async function validateOnSchema(
  values: FormValues,
  validationSchema?: Schema<FormValues>
): Promise<Record<string, string[]>> {
  if (!validationSchema) return {};

  try {
    await validationSchema.validate(values, { abortEarly: false });
    return {};
  } catch (e) {
    const inner = prop('inner', e as ValidationError);
    const fieldNames = pluck('path', inner);
    const fieldErrors = pluck('errors', inner);
    return zipObj(fieldNames, fieldErrors);
  }
}

/* ---------------------------------------------------------
 * TODO: CustomValiationFn
 *
 */
export type ValidationFn = (
  fieldValue: any,
  formValues: Record<string, any>
) => boolean;

export async function validateOnFn(
  values: FormValues,
  validationFns: Record<string, ValidationFn>
): Promise<Record<string, string[]>> {
  return {};
}
