import { useStore } from "@nanostores/react"
import { userStore } from "../nanostores/userStore"

// test component for verifying nanostores work across islands
const UsernameHeader = () => {

  const $user = useStore(userStore)

  return (
    <div>Current user: {$user?.username}</div>
  )
}

export default UsernameHeader