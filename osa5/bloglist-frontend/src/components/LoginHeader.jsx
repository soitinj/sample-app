import LogoutButton from './LogoutButton'

const LoginHeader = ({ user, setUser }) => {

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div className='m-4' style={{ display: 'flex', alignItems: 'left' }}>
      {user && (
        <div>
          <div>{user.name} logged in.</div>
          <LogoutButton logoutHandler={logoutHandler}></LogoutButton>
        </div>
      )}
      {!user &&
        <div>Not logged in. <a href='/login'>Login here</a></div>
      }
    </div>
  )
}

export default LoginHeader