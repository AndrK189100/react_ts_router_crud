import './NewPage.css'

import { useRef } from 'react';
import { useNavigate } from "react-router-dom";

export default function NewPage() {

    const url = 'http://localhost:7070/posts'
    
    const content = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    
    const ClickHandlerAdd = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        
        (async () => {
            const {ok} = await fetch(url, {
                                            method: 'POST',
                                            body: JSON.stringify({id: 0, content: content.current ? content.current.value : '', created: new Date()})});
            if (ok) navigate('/');
        })();
    }

    const ClickHandlerCancel = () => navigate('/')
    
    return (
        <div className='new__post'>
            <textarea ref={content} className='text__area'>

            </textarea>
            <button className='button' onClick={ClickHandlerAdd}>Создать</button>
            <button className='button' onClick={ClickHandlerCancel}>Отмена</button>
        </div>
    );
}