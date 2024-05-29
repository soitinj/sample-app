import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/auth'
import Header from './components/Header'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'

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
      <LoginForm
        usernameHandler={handleInputChange(setUsername)}
        username={username}
        passwordHandler={handleInputChange(setPassword)}
        password={password}
        submitHandler={handleLogin}
      />
    )
  }

  const blogList = () => {
    return (
      <BlogView user={user ? user : { username: undefined, name: undefined }} setNotification={setNotification} setUser={setUser}></BlogView>
    )
  }

  return (
    <div>
      <Header text={'Blogilista'} top={true}></Header>
      <Notification notification={notification} show={showNotif}></Notification>
      {!user && loginForm()}
      {user && blogList()}
    </div>
  )
}

export default App