import { useSelector } from 'react-redux';
import { selectUserAll } from './userSlice';
import {Link} from 'react-router-dom'
import { useEffect } from 'react';

function UsersList() {
    const users=useSelector(selectUserAll)

    const user=users.map((userItem)=>(
        <li key={userItem.id}><Link  to={`/users/${userItem.id}`}   dideo-checked="true">{userItem.lastName}</Link></li>

    )
        )
    return (
        <section>
            <h2>Users</h2>
            <ul>
                {user}
            </ul>
        </section>
    );
}

export default UsersList;