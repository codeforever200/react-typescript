# react-typescript
<b> TODO LIST APP CODE EXPLANATION </b>


<b>The App Functionality - </b>

This app allows users to create a list of topics. Under each of these topics/lists, tasks can be added. When the task is done, the user may either tick it as completed (in the edit option) or may even delete it. The task name can be changed by edit option. The sidebar shows all the lists created. When all tasks in a list are completed, the user may delete the list by clicking on the cross icon beside the list name.


<b>Project Overview - </b>

1.Created project using create-react-app and installed required dependencies.

2.Deleted unnecessary files and code.

3.Created store with redux and made it available in the app.

4.Created types.

5.Added some actions to our store and managed state.

6.Created components and dispatched actions.

<b>The main code - </b>

The src folder has the main typescript codes.
The code is divided into mainly 3 parts - 

*Store(containing actions and reducers)
*App
*Components

<b>STORE - </b>

Store: A store is a state container which holds the application’s state. Redux can have only a single store in an application.
Action: When an event happens inside a React component it is called an action and via a Redux function it is called a dispatch. An action returns an object which always contains  an action type.
Reduce: Redux calls all the reducers which then use the action type to decide
 which reducer method should be run. The reducer’s job is to update the Redux store for this action type, using any extra data that the action may have included.


<b>Type.ts in store -</b>

"Add_task", "Delete_task" etc are the types being used in the app, in actions and reducers.
Each task has a name which is a string, id which is a string and complete which is a boolean.
List also has a name and an id, both of these are strings, and tasks which is an array of tasks.
The lists are stored inside local storage as an object which has keys(id of the list) and values(the actual list). List interface has been created for that.
For each action an interface has been created, each action returns type and payload.
ListState has many properties. It has lists which  returns all lists from local storage, listIdToDelete which gets set when the delete button is clicked on our list. 
listToEdit is set when we click on a list name and we can use it in our edit list modal.
selectedList which will change when we change the select field, taskToDelete which gets set when we click remove task button and taskToEdit which gets set when we click edit task button.
NotificationState has only 2 properties, message and type, and they are both strings.

<b>Actions has the following files:</b>

<b>listActions.ts</b> - First the interfaces are imported, union type for list actions and store types. 
Then action is created in order to be able to dispatch it in the components. Many actions return type and payload, some just type. And all of them will return ListsAction.

<b>notificationActions.ts</b> - There is only one action in this file and this action will be dispatched every time, delete or edit task or list is added. It has 2 parameters, msg which is a message we want to show  and type which is used to show the green or red background color of the notification.

<b>index.ts </b> - In this file everything is exported from listActions and notificationActions 
 so that actions can always be imported from this file in our components.


<b>Reducer has 2 files:</b>

<b>listReducers.ts -</b>  First some interfaces and types are imported. Then  initialState is created which has all properties that have been defined in the ListState interface. The state in the reducer is equal to this initialState object and the action uses ListsAction type and the reducer  always returns ListState. Two helper functions have been created in this file, getListsFromLS which returns lists from local storage or empty objects and saveListsToLS which saves lists to local storage.

There are more cases for each type:

ADD_LIST - It adds a list we passed to addList action as an argument to the lists property and saves it to the local storage.

GET_LISTS - It gets lists from local storage and updates the lists property in list state.

GET_LIST_BY_ID - It gets the list by id that was passed in the action as a parameter.

SET_LISTID_TO_DELETE - It sets the listIdToDelete to the list id which was passed as parameter.

SET_LIST_TO_EDIT - It gets the list from local storage by the id which was  passed as parameter in the  action, and it sets the list to listToEdit property.

DELETE_LIST  - It will delete the list from local storage, update the lists property, set listIdToDelete to empty string, set listById to null and change selectedList to null if the list which is to be deleted is selected in the select field.

UPDATE_LIST -It will update the list and save updated lists to local storage, and will also set listToEdit to null.

SET_SELECTED_LIST - It will update selectedList when select field value is changed.

ADD_TASK - It will add a new task to the selected list.

SET_TASK_TO_DELETE - it will set the taskToDelete task property to the task we want to delete and list property to the selected list.

UNSET_TASK_TO_DELETE It will set taskToDelete to null.

DELETE_TASK - It will delete selected task from the selected list and update the lists in local storage.

SET_TASK_TO_EDIT - It will set the taskToEdit task property to the task we want to edit and list property to selected list

UNSET_TASK_TO_EDIT - It will set taskToEdit to null

UPDATE_TASK - It will update selected task in selected list and update the lists in local storage

<b>notificationReducers.ts </b>- It has one case, SET_NOTIFICATION and this one will set/update 
 the message and the type of the notification state.

<b>APP - </b>

<b>App.tsx  -</b> Conventionally, App.js acts as the highest level component in the React application structure.Under the same folder, index.tsx file is present, which holds the application’s configuration and incorporates dependencies such as React-Router and React-Redux. 


<b>COMPONENTS - </b>

<b>Header.ts -</b>
 It has some properties to be able to create interface HeaderProps. It has a title which is a string and a subtitle which is also a string.

<b>Notification.tsx -</b>
 Notification component is a functional component which has a NotificationsProps interface and add msg property and the type of this property is string. RootState gets the type from notification state.Notification will close after 3 seconds and for which setTimeout method has been used.

Notification has a remove button and when this button is clicked setNotification Action is dispatched with an empty string as a parameter and clear the timeout to hide the notification.

<b>CreateNewList.tsx - </b>
This component is used to add a new list and save it to local storage. This one is also a functional component. Since the component has a form, FormEvent interface has been imported from react along with useState to manage state of the input field.

<b>Lists.tsx - </b>
This component lists all of the lists from local storage. useSelector is used to hook and bring the lists from the list state. useEffect hook is used to dispatch getLists action to get all lists from local storage. If there are no lists, No lists text is displayed and any other output is displayed in a bulma panel-block.

<b>EditListModal.tsx -</b>
 This component is used to update/edit the list name.
Since it has a list property  interface has been created for props with list property of type List. With the help of list property  useState hook can be used and the default value is set for the list name and it is used in the input field and when the modal opens list name is added to the input field.When the form is submitted some validation is done and if validation passes updateList and setNotification actions are dispatched.


<b>DeleteListModal.tsx - </b>
DeleteListModal component deletes a list when the delete button is clicked or it  closes the modal when the cancel button or modal background is clicked. If the list has tasks they will be shown as well in this component, just to alert the user that they will be deleted when the list is deleted.When the component is mounted useEffect hook is used to get the list by the id which is passed as a property.

<b>Sidebar.tsx</b> - In this component CreateNewList and Lists components are the output and then it will be imported in the App component.

<b>SelectList.tsx</b> - This component has a select field populated with all the lists you created and when the list is selected setSelectedList.

<b>AddNewTask.tsx</b> - This component outputs a simple form to add a new task to the selected list.
When the form is submitted a new task gets created and addTask and setNotification actions get dispatched.


<b>Tasks.tsx</b> - This component outputs all the tasks from the selected list or No Tasks text if the selected list doesn’t have tasks.Each task in the table has edit and delete buttons.


<b>EditTaskModal.tsx - </b>
Task can be edited when this modal is opened . The task name can be changed and complete  or incomplete the task can be selected. When the form is submitted updateTask action is dispatched with 4 parameters, task id, task name, task state(completed/uncompleted) and the list this task belongs to. setNotification action also gets dispatched.


<b>DeleteTaskModal.tsx - </b>
This component is used to delete the task. When the delete button is clicked deleteTask action is dispatched, this task and list are passed as arguments. The component props(is set to taskToDelete property when the delete button is clicked), and the task is removed from the list and updated list saved to local storage. setNotification action is also dispatched when the delete button is clicked. And to hide the modal we need to dispatch unsetTaskToDelete action which will set taskToDelete to null.


<b>MainContent.tsx - </b>
It outputs the main content next to the sidebar. Task components are imported here.
