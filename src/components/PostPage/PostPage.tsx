import './PostPage.css'

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

type Post = {
    id: number;
    content: string;
    created: number;
};

export default function PostPage() {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const content = useRef<HTMLTextAreaElement>(null);
    
    const url = `http://localhost:7070/posts/${id}`;
    
    const [post, setPost] = useState<Post>();
    const [postEdit, setPostEdit] = useState<boolean>(false);
    
    useEffect(() => {
        (async() => {
            const response = await fetch(url);
            const postData = (await response.json()).post;
            setPost({id: postData.id, content: postData.content, created: postData.created});
        })();
    },[url])
    
    
    const ClickHandlerDel = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        
        (async () => {
            const {ok} = await fetch(url, {method: 'DELETE'});
            if (ok) navigate('/')
        })();
    }

    const ClickHandlerCancel = () => navigate('/')

    const ClickHandlerEdit = () => !postEdit ? setPostEdit(true) : setPostEdit(false);

    const ClickHandlerUpdate = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        
        (async() => {
            const {ok} =await fetch(url, {method: 'PATCH', body: JSON.stringify({content: content.current ? content.current.value : ''})})
            if (ok) navigate('/')
        })();
    }

    if(post)
        switch(postEdit) {

            case false:
                return (
                    <>
                    <div className='post'>
                        <div style={{textAlign: 'left'}}>
                            <div>id: {post.id}</div>
                            <div>content: {post.content}</div>
                            <div>created: {moment(post.created).format('DD.MM.yyyy HH:mm')}</div>
                        </div>
                        <button className='button__post' onClick={ClickHandlerEdit}>Редактировать</button>
                        <button className='button__post' onClick={ClickHandlerDel}>Удалить</button>
                        <button className='button__post' onClick={ClickHandlerCancel}>Отмена</button>
                        
                    </div>
                    </>
                )
                
            case true:
                return (
                    <>
                    <div className='new__post'>
                        <textarea ref={content} className='text__area' defaultValue={post.content}></textarea>
                        <button className='button' onClick={ClickHandlerUpdate}>Обновить</button>
                        <button className='button' onClick={ClickHandlerEdit}>Отмена</button>
                    </div>
                    </>
                )    
    }
}