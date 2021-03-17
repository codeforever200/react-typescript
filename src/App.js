"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
require("./App.css");
var Header_1 = require("./components/Header");
var Sidebar_1 = require("./components/Sidebar");
var Notification_1 = require("./components/Notification");
var DeleteListModal_1 = require("./components/DeleteListModal");
var EditListModal_1 = require("./components/EditListModal");
var MainContent_1 = require("./components/MainContent");
var EditTaskModal_1 = require("./components/EditTaskModal");
var DeleteTaskModal_1 = require("./components/DeleteTaskModal");
var App = function () {
    var notificationMsg = react_redux_1.useSelector(function (state) { return state.notification.message; });
    var listIdToDelete = react_redux_1.useSelector(function (state) { return state.list.listIdToDelete; });
    var listToEdit = react_redux_1.useSelector(function (state) { return state.list.listToEdit; });
    var taskToEdit = react_redux_1.useSelector(function (state) { return state.list.taskToEdit; });
    var taskToDelete = react_redux_1.useSelector(function (state) { return state.list.taskToDelete; });
    return (React.createElement("div", { className: "App" },
        React.createElement(Header_1.default, { title: "Task List App", subtitle: "Create some lists and add some tasks to each list" }),
        React.createElement("div", { className: "container px-5" },
            React.createElement("div", { className: "columns" },
                React.createElement(Sidebar_1.default, null),
                React.createElement(MainContent_1.default, null))),
        React.createElement(Notification_1.default, { msg: notificationMsg }),
        listIdToDelete && React.createElement(DeleteListModal_1.default, { listId: listIdToDelete }),
        listToEdit && React.createElement(EditListModal_1.default, { list: listToEdit }),
        taskToEdit && React.createElement(EditTaskModal_1.default, { taskToEdit: taskToEdit }),
        taskToDelete && React.createElement(DeleteTaskModal_1.default, { taskToDelete: taskToDelete })));
};
exports.default = App;
//# sourceMappingURL=App.js.map