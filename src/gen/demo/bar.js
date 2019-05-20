"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MyComponent = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MyComponent = function MyComponent(_ref) {
  var key = _ref.key;
  console.log("child props", key);
  return _react["default"].createElement("li", {
    key: key
  }, "Hello JSX!");
};

exports.MyComponent = MyComponent;

var MyDefaultComponent = function MyDefaultComponent(_ref2) {
  var children = _ref2.children;
  return _react["default"].createElement("div", null, _react["default"].createElement("h1", null, "Hello JSX!"), _react["default"].createElement("ul", null, children));
};

var _default = MyDefaultComponent;
exports["default"] = _default;