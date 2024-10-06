import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount]=useState()
  const {user,isLoaded,isSignedIn}=useUser();
  if(!isSignedIn) 
    {
      return <Navigate to={'/auth/sign-in'}/>
    }

  
  return (
    <>
    <Outlet/>
    </>
  )
}

export default App
