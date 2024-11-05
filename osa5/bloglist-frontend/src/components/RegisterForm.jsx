import { useState } from 'react'
import userService from '../services/user'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


const RegisterForm = ({ setNotification }) => {

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerPasswordAgain, setRegisterPasswordAgain] = useState('')

  const registerHandler = async (event) => {
    event.preventDefault()
    if (registerPassword === registerPasswordAgain) {
      try {
        console.log(setNotification)
        await userService.register({ username: registerUsername, name: registerName, password: registerPassword })
        setNotification({ message: 'Registered. You can now log in.' })
      } catch (exception) {
        setNotification({ message: exception.message, success: false })
      }
      setRegisterPassword('')
      setRegisterPasswordAgain('')
      setRegisterName('')
      setRegisterUsername('')
    } else {
      setNotification({ message: 'Passwords did not match', success: false })
      setRegisterPassword('')
      setRegisterPasswordAgain('')
    }
  }

  return (
    <Form onSubmit={registerHandler} autoComplete='off'>
      <Form.Group className='mb-3' controlId='registerForm.username'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='username'
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='registerForm.name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='name'
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='registerForm.password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='password'
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='registerForm.passwordAgain'>
        <Form.Label>Repeat password</Form.Label>
        <Form.Control
          type='password'
          placeholder='password'
          value={registerPasswordAgain}
          onChange={(e) => setRegisterPasswordAgain(e.target.value)}
        />
      </Form.Group>
      <Button type='submit'>register</Button>
    </Form>
  )
}

export default RegisterForm