import React from 'react'
import Form3 from '../Components/Form/Form3'
import MyForm from '../Components/Form/MyForm'

const Login = ({ setSwitch, setLogged }) => {
  return (
    <Form3 setSwitch={setSwitch} setLogged={setLogged} />
    // <MyForm />
  )
}

export default Login