import BlogList from './BlogList'
import Header from './Header'
import LoginHeader from './LoginHeader'
import BlogCreate from './BlogCreate'

const BlogView = ({ blogs, user, setNotification, setUser }) => {

  return (
    <div>
      <Header text={'blogs'}></Header>
      <LoginHeader user={user} setUser={setUser}></LoginHeader>
      <BlogCreate setNotification={setNotification}></BlogCreate>
      <br></br>
      <BlogList blogs={blogs}></BlogList>
    </div>
  )
}

export default BlogView