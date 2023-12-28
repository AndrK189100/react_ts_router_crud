import './HomePage.css'

import { useEffect, useState } from 'react'
import uuid from 'react-uuid';
import moment from 'moment';
import { Link } from 'react-router-dom';

import AddNew from './AddNew/AddNrew'

type Post = {
    id: number;
    content: string;
    created: number;
};

export default function HomePage() {
    
    const url = 'http://localhost:7070/posts';
    
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(url);
            setPosts([...await response.json()]);
        })();
    },[])

    return (
        <>
            <AddNew />
            {posts.length ?
            <div className='container'>
                {posts.map((post) => <Link className='link' to={`/posts/${post.id}`} key={uuid()}>
                                        <div className='post__preview'>
                                            <div>id: {post.id}</div>
                                            <div>content: {post.content}</div>
                                            <div>created: {moment(post.created).format('DD.MM.yyyy HH:mm')}</div>
                                        </div>
                                    </Link>)}
            </div> : ''}
        </>
    )
}