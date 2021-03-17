"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
require("../node_modules/bulma/css/bulma.min.css");
require("../node_modules/@fortawesome/fontawesome-free/css/all.min.css");
var store_1 = require("./store/store");
var App_1 = require("./App");
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement(react_redux_1.Provider, { store: store_1.default },
        React.createElement(App_1.default, null))), document.getElementById('root'));
//# sourceMappingURL=index.js.map