import * as React from 'react';
import { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { setListToEdit, updateList, setNotification } from '../store/actions';
import { List } from '../store/types';

interface EditListModalProps {
    list: List;
}

const EditListModal: FC<EditListModalProps> = ({ list }) => {
    const dispatch = useDispatch();
    const [listName, setListName] = useState(list.name);

    const hideModalHandler = () => {
        dispatch(setListToEdit(''));
    }

    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        setListName(e.currentTarget.value);
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (listName.trim() === '') {
            return alert('List name is required!');
        }

        if (listName.trim() === list.name) {
            return alert('List name is the same as before!');
        }

        dispatch(updateList(list.id, listName.trim()));
        dispatch(setNotification(`List "${list.name}" updated!`));
    }

    return (
        <div className="modal is-active">
            <div className="modal-background close-modal" onClick={hideModalHandler}></div>
            <form className="modal-card" onSubmit={submitHandler}>
                <header className="modal-card-head">
                    <p className="modal-card-title">Edit List</p>
                    <button type="button" className="delete close-modal" aria-label="close" onClick={hideModalHandler}></button>
                </header>
                <div className="modal-card-body">
                    <div className="field">
                        <label className="label">List Name</label>
                        <div className="control">
                            <input type="text" className="input" name="listname" placeholder="List Name" value={listName} onChange={changeHandler} />
                        </div>
                    </div>
                </div>
                <footer className="modal-card-foot">
                    <button type="submit" className="button is-success">Save changes</button>
                    <button type="button" className="button close-modal" onClick={hideModalHandler}>Cancel</button>
                </footer>
            </form>
        </div>
    );
}

export default EditListModal;