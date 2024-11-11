import { useState, useEffect } from 'react'
import Header from './components/Header'
import Notification from './components/Notification'
import LoginPage from './components/LoginPage'
import MainContent from './components/MainContent'
import userActions from './nanostores/userStore'
import { getBlogs } from './nanostores/blogStore'

const App = ({ loginPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: '', success: true })
  const [showNotif, setShowNotif] = useState(false)

  useEffect(() => {
    const cachedUser = window.localStorage.getItem('bloglistUser')
    if (cachedUser) {
      userActions.userFromCache(cachedUser)
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
      console.log(username)
      userActions.login(username, password)
      window.location.href = '/'
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
      {loginPage && loginForm()}
      {!loginPage && tabs()}
      <Notification notification={notification} show={showNotif}></Notification>
    </div>
  )
}

export default App