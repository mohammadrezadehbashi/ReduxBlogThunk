import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../users/userSlice';

function PostAuthor({ userId }) {

    const author = useSelector(state => selectUserById(state, userId))
//  console.log('USERBYID', author ? author.lastName : 'UnKnown author',userId);
    // const user =userId.map(id=><span>'By' {author ? author.lastName : 'UnKnown author'}</span>)
    return (
        <span>By {author ? author.lastName : 'UnKnown author'}</span>
    )
}

export default PostAuthor;