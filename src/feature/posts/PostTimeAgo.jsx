import moment from 'moment/moment';
import React from 'react';

function PostTimeAgo({ date }) {

    const momentdate=moment(date);
    return (
        <span title={momentdate.toString()}
        // "2021-02-06T21:36:04.822Z"
        >&nbsp; <i>{momentdate.fromNow()}</i></span>
    );
}

export default PostTimeAgo;