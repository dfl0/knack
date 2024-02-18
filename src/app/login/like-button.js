'use client';
import {useState} from 'react';

export default function LikeButton(){
    const [likes, setLikes] = useState(0);

    function clickLike(){
        setLikes(likes+1);
    }
    return <button onClick={clickLike} className="px-1 border-[3px] rounded-md border-gray-500"> (Likes: {likes})</button>
}
