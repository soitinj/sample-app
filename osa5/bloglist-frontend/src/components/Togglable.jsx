import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { motion } from 'framer-motion'

// This is not a good component. It creates the button as well.
// This makes it difficult to utilize in different situations.
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className='mb-3'>
      {!visible && (
        <Button variant={props.buttonVariant ? props.buttonVariant : 'primary'} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      )}
      {visible && (
        <motion.div className='border'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
          style={{ boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)", padding: '1rem', borderRadius: '8px' }}
        >
          {props.children}
          <Button variant='warning' onClick={toggleVisibility}>cancel</Button>
        </motion.div>
      )}
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable