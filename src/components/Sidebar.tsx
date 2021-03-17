import * as React from 'react';
import { FC } from 'react';

import CreateNewList from './CreateNewList';
import Lists from './Lists';

const Sidebar: FC = () => {
    return (
        <div className="column is-3">
            <CreateNewList />
            <Lists />
        </div>
    );
}

export default Sidebar;