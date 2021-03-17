"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var SelectList_1 = require("./SelectList");
var AddNewTask_1 = require("./AddNewTask");
var Tasks_1 = require("./Tasks");
var MainContent = function () {
    var selectedList = react_redux_1.useSelector(function (state) { return state.list.selectedList; });
    return (React.createElement("div", { className: "column is-9" },
        React.createElement("div", { className: "box" },
            React.createElement(SelectList_1.default, null),
            selectedList &&
                React.createElement(react_1.Fragment, null,
                    React.createElement(AddNewTask_1.default, { list: selectedList }),
                    React.createElement("hr", null),
                    React.createElement(Tasks_1.default, { tasks: selectedList.tasks })))));
};
exports.default = MainContent;
//# sourceMappingURL=MainContent.js.map