import { useDispatch, useSelector } from 'react-redux';
import { selectUserById } from '../users/userSlice';
import { increaseReaction } from './postSlice';


const reactionsIcon = {
    eyes: "👀",
    heart: "❤️",
    hooray: "🎉",
    rocket: "🚀",
    thumbsUp: "👍"
}

function Reactions({ reactions,postId }) {
    const dispatch = useDispatch();
    const IncreaseReactionClick = (postId,reaction) => {
        dispatch(increaseReaction({postId,reaction}))
    }
    const reactionBtn =
        //  = useSelector(state => selectUserById(state, 1))
        Object.keys(reactions).map(reaction =>
            <button 
            type="button" 
            className="muted-button reaction-button" 
            key={reaction}
            onClick={()=>IncreaseReactionClick(postId,reaction)}
            >{reactionsIcon[reaction]} {reactions[reaction]}</button>
        )
    return (
        <div>
            {reactionBtn}
        </div>
    );
}

export default Reactions;