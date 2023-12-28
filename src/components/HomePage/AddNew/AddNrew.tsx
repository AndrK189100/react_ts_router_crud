import './AddNew.css'

import { Link } from 'react-router-dom';

export default function AddNew() {

    return (
        <div className='add__new'>
            <Link to='/new'><button className='add__new-button'>Создать пост</button></Link>
        </div>
    )
}