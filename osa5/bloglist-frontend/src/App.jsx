import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/auth'
import Header from './components/Header'
import Notification from './components/Notification'
import LoginPage from './components/LoginPage'
import MainContent from './components/MainContent'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', success: true })
  const [showNotif, setShowNotif] = useState(false)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('bloglistUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    notification.message && setShowNotif(true)
    setTimeout(() => {
      setShowNotif(false)
    }, 5000)
  }, [notification])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotification({ message: 'invalid credentials', success: false })
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  const handleInputChange = (setter) => {
    return ({ target }) => {
      setter(target.value)
    }
  }

  const loginForm = () => {
    return (
      <LoginPage
        usernameHandler={handleInputChange(setUsername)}
        username={username}
        passwordHandler={handleInputChange(setPassword)}
        password={password}
        submitHandler={handleLogin}
        setNotifification={setNotification}
      />
    )
  }

  const tabs = () => {
    return <MainContent
      user={user}
      setUser={setUser}
      setNotification={setNotification} />
    /*return (
      <>
        <LoginHeader user={user} setUser={setUser}></LoginHeader>
        <Tabs defaultActiveKey='blogs' id='main-tabs' className='mb-3'>
          <Tab eventKey='blogs' title='Blogs'>
            <BlogView setNotification={setNotification}></BlogView>
          </Tab>
          <Tab eventKey='about' title='About'>
            <AboutPage setKey={null} loggedIn={true}></AboutPage>
          </Tab>
          <Tab eventKey='stats' title='Stats'>
            <StatsPage user={user}></StatsPage>
          </Tab>
        </Tabs>
      </>
    )*/
  }

  return (
    <div>
      <Header text={'Blogilista'} top={true}></Header>
      {!user && loginForm()}
      {user && tabs()}
      <Notification notification={notification} show={showNotif}></Notification>
    </div>
  )
}

export default App