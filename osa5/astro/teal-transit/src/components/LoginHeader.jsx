import LogoutButton from './LogoutButton'

const LoginHeader = ({ user, setUser }) => {

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div className='m-4' style={{ display: 'flex', alignItems: 'left' }}>
      <div>{user.name} logged in.</div>
      &nbsp;
      <LogoutButton logoutHandler={logoutHandler}></LogoutButton>
    </div>
  )
}

export default LoginHeader