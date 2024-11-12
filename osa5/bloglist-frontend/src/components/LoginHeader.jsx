import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import LogoutButton from './LogoutButton'
import { useSelector } from 'react-redux'

const LoginHeader = () => {

  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user)

  const logoutHandler = () => {
    dispatch(logout())
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