import Button from 'react-bootstrap/Button'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Tabs, Tab } from 'react-bootstrap'
import { useState } from 'react'
import AboutPage from './AboutPage'

const LoginPage = ({ username, password, usernameHandler, passwordHandler, submitHandler, setNotification }) => {

  const [key, setKey] = useState('login')
  return (
    <Tabs activeKey={key} id='login-tabs' onSelect={(k) => setKey(k)} className='mb-3'>
      <Tab eventKey='login' title='Login'>
        <LoginForm
          username={username}
          password={password}
          usernameHandler={usernameHandler}
          passwordHandler={passwordHandler}
          setNotification={setNotification}
          submitHandler={submitHandler}
        />
        <div>
          Need an account?&nbsp;
          <Button onClick={() => setKey('register')}>Create new account</Button>
        </div>
      </Tab>
      <Tab eventKey='register' title='Register'>
        <RegisterForm setNotification={setNotification}></RegisterForm>
      </Tab>
      <Tab eventKey='aboutPage' title='About'>
        <AboutPage setKey={setKey} loggedIn={false}></AboutPage>
      </Tab>
    </Tabs>
  )
}

export default LoginPage