import React, { useState } from 'react'
import Cards2 from '../Components/Cards/Cards2'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/NavBar/Navbar'
import Sidebar from '../Components/SideBar/Sidebar'

const Home = () => {
  let [active, setActive] = useState(false);

  function setSidebar() {
    setActive(!active);
  }  

  return (
    <>
      {console.log("App")}
      <Navbar dabba_ve={setSidebar}/>
      <Sidebar visible={active} setSidebar={setSidebar}/>
      <Cards2 /> 
      <Footer />
    </>
  )
}

export default Home