import React, { useState, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import SL_Form from "./SL_Form";
import { useParams } from "react-router-dom";

const Form3 = ({ setSwitch, setLogged, setUserId}) => {
  const [isLogin, setIsLogin] = useState(true);
  const { mode } = useParams();

  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);

  function toggleLogin() {
    setIsLogin((prev) => !prev);
  }

  return (
    <div
      className={!isLogin ? "py-8 h-screen overflow-auto" : "h-screen overflow-auto"}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={!isLogin ? "my-[]" : ""}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "1rem",
          }}
        // className={!isLogin ? "my-[10vh]" : ""}
        >
          {<SL_Form isLogin={isLogin} toggleLogin={toggleLogin} setSwitch={setSwitch} setLogged={setLogged} setUserId={setUserId}/>}
        </Paper>
      </Container>
    </div>
  );
};

export default Form3;
