import React from "react";
import { Horm, useForm, useField } from "../src";

export const Demo = () => {
  return (
    <Horm
      initialValues={{ email: "123", password: "pass" }}
      onSubmit={console.log}
      render={() => {
        const form = useForm();
        const emailField = useField("email");
        const passwordField = useField("password");

        return (
          <form {...form.htmlProps}>
            <input type="text" {...emailField.htmlProps} />
            <input type="password" {...passwordField.htmlProps} />
            <button type="submit">submit</button>
          </form>
        );
      }}
    />
  );
};
