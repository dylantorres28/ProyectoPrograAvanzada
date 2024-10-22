import React from 'react'
import NavBar from './Components/NavBar.jsx'
import SideBar from './Components/SideBar.jsx'
import Display from './Components/Display.jsx'
import PlayerMusic from './Components/PlayerMusic.jsx'


const App = () => {
  return (
    <div className='h-screen bg-[#1A1A1A]'>
        <NavBar />
      <div className='h-[77%] flex'>
        <SideBar/>
        <Display/>
      </div>
        <PlayerMusic/>
    </div>
  )
}

export default App