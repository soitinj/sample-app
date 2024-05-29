import LogoutButton from './LogoutButton'

const LoginHeader = ({ user, setUser }) => {

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'left', marginBottom: '10px' }}>
      <div>{user.name} logged in.</div>
      &nbsp;
      <LogoutButton logoutHandler={logoutHandler}></LogoutButton>
    </div>
  )
}

export default LoginHeader