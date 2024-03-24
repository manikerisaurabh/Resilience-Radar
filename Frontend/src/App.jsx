import { useState } from "react";
import Navbar from "./Components/NavBar/Navbar";
import "./App.css";
import Cards2 from "./Components/Cards/Cards2";
import Sidebar from "./Components/SideBar/Sidebar";
import Form from "./Components/Form/Form";
import Footer from "./Components/Footer/Footer";
import WebcamCapture from "./Components/Media/WebcamCapture ";

function App() {
  let [active, setActive] = useState(false)

  function setSidebar() {
    setActive(!active)
  }

  return (
    <>
      {console.log("App")}
      <Navbar dabba_ve={setSidebar}/>
      <Sidebar visible={active}/>
      <Cards2 /> 
      <Form />
      <WebcamCapture />
      <Footer /> 
    </>
  );
}

export default App;