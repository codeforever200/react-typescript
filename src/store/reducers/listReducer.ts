import {
    ListState, ListsAction, Lists, ADD_LIST, GET_LISTS,
    SET_LISTID_TO_DELETE, DELETE_LIST, GET_LIST_BY_ID,
    SET_LIST_TO_EDIT, UPDATE_LIST, SET_SELECTED_LIST,
    ADD_TASK, DELETE_TASK, SET_TASK_TO_DELETE, UNSET_TASK_TO_DELETE,
    SET_TASK_TO_EDIT, UNSET_TASK_TO_EDIT, UPDATE_TASK
} from '../types';

const initialState: ListState = {
    lists: {},
    listIdToDelete: '',
    listToEdit: null,
    listById: null,
    selectedList: null,
    taskToDelete: null,
    taskToEdit: null
}

const getListsFromLS = (): Lists => {
    if (localStorage.getItem('task_list')) {
        return JSON.parse(localStorage.getItem('task_list') || '{}');
    }

    return {};
}

const saveListsToLS = (lists: Lists) => {
    localStorage.setItem('task_list', JSON.stringify(lists));
}

export default (state = initialState, action: ListsAction): ListState => {
    const listsFromLS = getListsFromLS();

    switch (action.type) {
        case ADD_LIST:
            const copiedListsFromLS = { ...listsFromLS };
            copiedListsFromLS[action.payload.id] = action.payload;
            saveListsToLS(copiedListsFromLS);
            return {
                ...state,
                lists: copiedListsFromLS
            };

        case GET_LISTS:
            return {
                ...state,
                lists: listsFromLS
            }

        case GET_LIST_BY_ID:
            const list = listsFromLS[action.payload];
            return {
                ...state,
                listById: list
            }

        case SET_LISTID_TO_DELETE:
            return {
                ...state,
                listIdToDelete: action.payload
            }

        case SET_LIST_TO_EDIT:
            const listToEdit = listsFromLS[action.payload] || null;
            return {
                ...state,
                listToEdit: listToEdit
            }

        case DELETE_LIST:
            const copiedListsFromLS2 = { ...listsFromLS };
            const listId = copiedListsFromLS2[action.payload].id;
            delete copiedListsFromLS2[action.payload];
            saveListsToLS(copiedListsFromLS2);
            return {
                ...state,
                lists: copiedListsFromLS2,
                listIdToDelete: '',
                listById: null,
                selectedList: state.selectedList && listId === state.selectedList.id ? null : state.selectedList
            }

        case UPDATE_LIST:
            const copiedListsFromLS3 = { ...listsFromLS };
            copiedListsFromLS3[action.payload.id].name = action.payload.name;
            saveListsToLS(copiedListsFromLS3);
            return {
                ...state,
                lists: copiedListsFromLS3,
                listToEdit: null
            }

        case SET_SELECTED_LIST:
            const selectedList = getListsFromLS()[action.payload];
            return {
                ...state,
                selectedList: selectedList
            }

        case ADD_TASK:
            const copiedListsFromLS4 = { ...listsFromLS };
            copiedListsFromLS4[action.payload.list.id].tasks.push(action.payload.task);
            saveListsToLS(copiedListsFromLS4);
            return {
                ...state,
                lists: copiedListsFromLS4,
                selectedList: copiedListsFromLS4[action.payload.list.id]
            }

        case SET_TASK_TO_DELETE:
            return {
                ...state,
                taskToDelete: {
                    task: action.payload.task,
                    list: action.payload.list
                }
            }

        case UNSET_TASK_TO_DELETE:
            return {
                ...state,
                taskToDelete: null
            }

        case DELETE_TASK:
            const copiedListsFromLS5 = { ...listsFromLS };
            const copiedTasks = [...copiedListsFromLS5[state.taskToDelete!.list.id].tasks];
            const task = copiedTasks.find(task => task.id === state.taskToDelete!.task.id);
            copiedTasks.splice(copiedTasks.indexOf(task!), 1);
            copiedListsFromLS5[state.taskToDelete!.list.id].tasks = copiedTasks;
            saveListsToLS(copiedListsFromLS5);
            return {
                ...state,
                lists: copiedListsFromLS5,
                selectedList: copiedListsFromLS5[state.taskToDelete!.list.id],
                taskToDelete: null
            }

        case SET_TASK_TO_EDIT:
            return {
                ...state,
                taskToEdit: {
                    task: action.payload.task,
                    list: action.payload.list
                }
            }

        case UNSET_TASK_TO_EDIT:
            return {
                ...state,
                taskToEdit: null
            }

        case UPDATE_TASK:
            const copiedListsFromLS6 = { ...listsFromLS };
            const copiedList = { ...copiedListsFromLS6[action.payload.list.id] };
            const copiedTasks2 = [...copiedList.tasks];
            const task2 = copiedTasks2.find((task) => task.id === action.payload.taskId);
            const copiedTask = { ...task2! };
            copiedTask.name = action.payload.taskName;
            copiedTask.completed = action.payload.taskState;
            const updatedTasks = copiedTasks2.map(task => task.id === copiedTask.id ? copiedTask : task);
            copiedList.tasks = updatedTasks;
            copiedListsFromLS6[copiedList.id] = copiedList;
            saveListsToLS(copiedListsFromLS6);

            return {
                ...state,
                lists: copiedListsFromLS6,
                selectedList: copiedList,
                taskToEdit: null
            }

        default:
            return state;
    }
}