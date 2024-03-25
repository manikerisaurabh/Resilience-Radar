import React, { useState, useEffect } from 'react'
import { Container, Paper } from '@mui/material';
import SL_Form from './SL_Form';
import { useParams } from 'react-router-dom';


const Form3 = () => {

  const [isLogin, setIsLogin] = useState(true);
  const { mode } = useParams();

  useEffect(() => {
    setIsLogin((mode === 'Login'));
  }, [mode])

  function toggleLogin() {
    setIsLogin(prev => !prev)
  } 

  return (
    <Container component={"main"} 
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      className={!isLogin ? 'my-[10vh]' : ""}
    >
      <Paper elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem"
        }}
      >
        {
          <SL_Form isLogin={isLogin} toggleLogin={toggleLogin}/>
        }
      </Paper>
    </Container>
  )
}

export default Form3