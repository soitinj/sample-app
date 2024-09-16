import Button from 'react-bootstrap/Button'

const LogoutButton = ({ logoutHandler }) => {
  return (
    <Button onClick={logoutHandler}>
      logout
    </Button>
  )
}

export default LogoutButton