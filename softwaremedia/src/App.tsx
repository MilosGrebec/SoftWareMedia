import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Nav from './components/Nav'
import Profile from './pages/Profile'
import { useAuthContext } from './hooks/useAuthContext'
import PostSomething from './pages/PostSomething'
import People from './pages/People'

function App() {

  const {user}=useAuthContext();
  return (
    <div className="App">
      <Nav/>
      {user?
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/post' element={<PostSomething/>}/>
        <Route path='/people' element={<People/>}/>
        <Route path='/people/:seacrhtext' element={<People/>}/>
      </Routes>:<Profile/>}
    </div>
  )
}

export default App
