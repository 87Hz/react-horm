import { Schema, ValidationError, boolean } from 'yup';
import { prop, pluck, zipObj } from 'ramda';
import { FormState } from './types';

// ---------------------------------------------------------
// YupSchema
//
export async function validateOnSchema(
  values: FormState,
  validationSchema: Schema<FormState>
): Promise<FormState<string[]>> {
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

// ---------------------------------------------------------
// TODO: CustomValiationFn
//
export type ValidationFn = (formValues: FormState) => boolean;

export async function validateOnFn(
  validationFn: ValidationFn
): Promise<Record<string, string[]>> {
  return {};
}

// ---------------------------------------------------------
// ValidateFormValues
//
export const validateFormValues = async (params: {
  formValues: FormState;
  validationSchema?: Schema<FormState>;
}) => {
  const { formValues, validationSchema } = params;

  if (validationSchema) {
    return await validateOnSchema(formValues, validationSchema);
  }

  return {};
};
