import React from 'react'
import Form3 from '../Components/Form/Form3'
import MyForm from '../Components/Form/MyForm'

const Login = ({ setSwitch, setLogged, setUserId }) => {
  return (
    <Form3 setSwitch={setSwitch} setLogged={setLogged} setUserId={setUserId}/>
    // <MyForm />
  )
}

export default Login