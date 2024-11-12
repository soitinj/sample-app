import App from './App'
import { Provider } from 'react-redux'
import store from './reducers/store'

const WrappedApp = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default WrappedApp