import React from "react";

const MyComponent = ({ key }) => {
  console.log("child props", key);
  return <li key={key}>Hello JSX!</li>;
};

const MyDefaultComponent = ({ children }) => (
  <div>
    <h1>Hello JSX!</h1>
    <ul>{children}</ul>
  </div>
);

export { MyComponent };

export default MyDefaultComponent;
