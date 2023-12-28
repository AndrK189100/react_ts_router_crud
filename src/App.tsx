import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import NewPage from './components/NewPage/NewPage';
import PostPage from './components/PostPage/PostPage';

function App() {

  return ( 
  <>
    <BrowserRouter>
    <Routes>
      <Route path='/*' Component={HomePage} />
      <Route path='/new' Component={NewPage} />
      <Route path='/posts/:id' Component={PostPage} />
    </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
