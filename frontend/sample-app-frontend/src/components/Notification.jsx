import { Toast, ToastContainer } from 'react-bootstrap'

const Notification = ({ notification, show }) => {
  const notif = notification.success ?
    {
      header: 'Success!',
      bg: 'success',
      ...notification
    } :
    {
      header: 'Error occurred.',
      bg: 'danger',
      ...notification
    }

  return (
    <>
      {show && (
        <ToastContainer style={{ zIndex: 1080 }} position='bottom-center'>
          <Toast bg={notif.bg}>
            <Toast.Header closeButton={false}>{notif.header}</Toast.Header>
            <Toast.Body className='text-white'>
              {notif.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}

export default Notification