import { useState, useEffect } from 'react'
import { setToken } from './libs/util'
import loginService from './services/auth'
import Header from './components/Header'
import Notification from './components/Notification'
import LoginPage from './components/LoginPage'
import MainContent from './components/MainContent'
import { useDispatch } from 'react-redux'
import { login, logout, userFromCache } from './reducers/userReducer'
import { useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: '', success: true })
  const [showNotif, setShowNotif] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    const cachedUser = window.localStorage.getItem('bloglistUser')
    if (cachedUser) {
      dispatch(userFromCache(cachedUser))
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
      dispatch(login(username, password))
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
        setNotification={setNotification}
      />
    )
  }

  const tabs = () => {
    return <MainContent
      user={user}
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
      <Header text={'Sample App'} top={true}></Header>
      {!user && loginForm()}
      {user && tabs()}
      <Notification notification={notification} show={showNotif}></Notification>
    </div>
  )
}

export default App