import * as React from 'react';
import { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addList, setNotification } from '../store/actions';
import { List } from '../store/types';

const CreateNewList: FC = () => {
    const dispatch = useDispatch();
    const [listName, setListName] = useState<string>('');

    const inputChangeHandler = (e: FormEvent<HTMLInputElement>) => {
        setListName(e.currentTarget.value);
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (listName === '') {
            return alert('List name is required!');
        }

        const newList: List = {
            id: `list-${new Date().getTime()}`,
            name: listName,
            tasks: []
        };

        dispatch(addList(newList));
        dispatch(setNotification(`New list("${newList.name}") created`));
        setListName('');
    }

    return (
        <div className="card mb-5">
            <div className="card-header">
                <p className="card-header-title">Create New List</p>
            </div>
            <div className="card-content">
                <form onSubmit={submitHandler}>
                    <div className="field">
                        <label className="label">List Name</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="List Name"
                                name="listname"
                                value={listName}
                                onChange={inputChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateNewList;