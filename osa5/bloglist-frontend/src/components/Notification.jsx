const Notification = ({ notification, show }) => {
  return (
    <>
    {show && (
      <div className={`notif ${notification.success ? "success" : "error"}`}>
        {notification['message']}
      </div>
    )}
    </>
  )
}

export default Notification