import React, { useState, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import SL_Form from "./SL_Form";
import { useParams } from "react-router-dom";

const Form3 = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { mode } = useParams();

  useEffect(() => {
    setIsLogin(mode === "Login");
  }, [mode]);

  function toggleLogin() {
    setIsLogin((prev) => !prev);
  }

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(200,200,200,0.5), rgba(120,110,220,0.5))",
      }}
      className={!isLogin ? "py-8" : ""}
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
        className={!isLogin ? "my-[10vh]" : ""}
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
          {<SL_Form isLogin={isLogin} toggleLogin={toggleLogin} />}
        </Paper>
      </Container>
    </div>
  );
};

export default Form3;
