# react-horm

## React H(ookF)orm

This package will provide `formik`-like features with React Hook Support.

It uses context internally, which means as long as it is rendered within `Horm`, you could get access to the form by using hooks instead of passing any reference down deeply to the field component. It will be very handy especially for those complex FormInput which is defined outside of the main form.

## TechStack

- React (with Hook)
- ramda
- Yup

## Installation

```bash
yarn add react-horm
```

## Usage

```ts
import { Horm, useField, useForm, useCountDown } from 'react-horm';
```

## APIs

### Horm (Component)

```tsx
// render form as children
<Horm>
  <FormComponent />
</Horm>

// render form as prop
<Horm render={FormComponent} />
```

Horm props:

- initialValues [`required`]: Initial form values, it MUST contains all the fields.
- onSubmit [`required`]: It will be called in `useForm.htmlProps.onSubmit` if the form is valid.

- initialValid [`optional`]: Initial value of `useForm.hormBag.isValid`
- validateOnBlur [`optional`]: Default is true. Whether validation should be run in case of blur and focus.
- validateOnChange [`optional`]: Default is true. Whether validation should be run in case of value change.
- enableReinitialize [`optional`]: Default is false. If set as true, the form will be reset in case of new `initialValues` passed in.
- validationSchema [`optional`]: Yup schema. See example below.
- validationFn [`optional`]: Validation function which takes form values as parameter and return object contains field errors. See example below.

```ts
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),

  password: Yup.string()
    .min(6)
    .required(),
});
```

```ts
const validationFn: ValidationFn = (values) => {
  let errors: FormState<string[]> = { email: [], password: [] };

  if (values.email.length === 0) {
    errors.email.push('Email cannot be empty');
  }

  if (values.password.length === 0) {
    errors.password.push('Password cannot be empty');
  }

  return errors;
};
```

### useField (Hook)

```ts
// Example
const loginForm = useForm();

<LoginForm {...loginForm.htmlProps} />;
```

#### loginForm.hormBag

- dirty
- errors
- isValid
- isValidating
- touched
- values

#### loginForm.htmlProps

- onSubmit

### useForm (Hook)

```ts
// Example
const emailField = useField('email');

<input {...emailField.htmlProps} />;
```

#### emailField.hormBag

- value
- initialValue
- dirty
- touched
- errors
- isValid
- setValue
- setTouched
- setErrors

#### emailField.htmlProps

- name
- value
- onChange
- onFocus
- onBlur

### useCountDown (Hook)

It is normally used to limit users' interactions with a particular function within given period (e.g sending SMS OTP code).

```ts
// Example
const [val, restart] = useCountDown(120);
```

`val` will be 0 initially, once `restart` is called, `val` will be running from the starting value you pass to the hook (120 seconds in the example above) and stops at 0. The `restart` function could be called multiple times, and the `val` will be reset to the starting value and counting down again, regardless of current value.
