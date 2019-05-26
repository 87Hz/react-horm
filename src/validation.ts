import { Schema, ValidationError } from 'yup';
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
// ValiationFn
//
export type SyncValidationFn = (formValues: FormState) => FormState<string[]>;

export type AsyncValidationFn = (
  formValues: FormState
) => Promise<FormState<string[]>>;

export type ValidationFn = SyncValidationFn | AsyncValidationFn;

export async function validateOnFn(
  values: FormState,
  validationFn: ValidationFn
): Promise<FormState<string[]>> {
  return await validationFn(values);
}

// ---------------------------------------------------------
// ValidateFormValues
//
export const validateFormValues = async (params: {
  valuesToValidate: FormState;
  validationSchema?: Schema<FormState>;
  validationFn?: ValidationFn;
}) => {
  const { valuesToValidate, validationSchema, validationFn } = params;

  if (validationSchema) {
    return await validateOnSchema(valuesToValidate, validationSchema);
  }

  if (validationFn) {
    return await validateOnFn(valuesToValidate, validationFn);
  }

  return {};
};
