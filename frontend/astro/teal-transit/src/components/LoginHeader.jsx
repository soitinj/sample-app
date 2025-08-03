import LogoutButton from './LogoutButton'
import { useStore } from '@nanostores/react'
import { userStore, logout } from '../nanostores/userStore'


const LoginHeader = () => {

  const user = useStore(userStore)

  const logoutHandler = () => {
    logout()
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