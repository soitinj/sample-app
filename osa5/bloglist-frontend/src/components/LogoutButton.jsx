import { Button } from 'react-bootstrap'

const LogoutButton = ({ logoutHandler }) => {
  return (
    <Button onClick={logoutHandler}>
      logout
    </Button>
  )
}

export default LogoutButton