import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import Index from './pages/posts/Index'
import New from './pages/posts/New'
import Edit from './pages/posts/Edit'
import Show from './pages/posts/Show'

function App() {
  return (
    <>
      <Routes>
        <Route path='/posts' element={<Index />} />
        <Route path='/posts/new' element={<New />} />
        <Route path='/posts/:id/edit' element={<Edit />} />
        <Route path='/posts/:id' element={<Show />} />
        <Route path='/' element={<Navigate to='/posts' />} />
      </Routes>
    </>
  )
}

export default App
