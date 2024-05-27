const LoginForm = ({ username, password, usernameHandler, passwordHandler, submitHandler }) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={usernameHandler}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={passwordHandler}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm