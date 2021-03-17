import * as React from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Task, List } from '../store/types';
import { unsetTaskToDelete, deleteTask, setNotification } from '../store/actions';

interface DeleteTaskModalProps {
    taskToDelete: {
        task: Task;
        list: List;
    }
}

const DeleteTaskModal: FC<DeleteTaskModalProps> = ({ taskToDelete: { task, list } }) => {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(deleteTask(task, list));
        dispatch(setNotification(`Task "${task.name}" deleted!`, 'danger'));
    }

    const closeModalHandler = () => {
        dispatch(unsetTaskToDelete());
    }

    return (
        <div className="modal is-active">
            <div className="modal-background close-modal" onClick={closeModalHandler}></div>
            <div className="modal-card">
                <header className="modal-card-head has-text-centered">
                    <p className="modal-card-title">Are you sure you want to delete this task ?</p>
                </header>
                <footer className="modal-card-foot">
                    <button type="submit" className="button is-danger" onClick={deleteHandler}>Delete</button>
                    <button type="button" className="button close-modal" onClick={closeModalHandler}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}

export default DeleteTaskModal;