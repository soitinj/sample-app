import { useState, useEffect, useCallback } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import LoginHeader from './LoginHeader'
import StatsPage from './StatsPage'
import BlogView from './BlogView'
import AboutPage from './AboutPage'
import blogService from '../services/blogs'

const MainContent = ({ user, setUser, setNotification }) => {

  const [blogs, setBlogs] = useState([])

  const updateBlogs = useCallback(async () => {
    try {
      const bs = await blogService.getAll()
      setBlogs(bs)
    } catch (e) {
      setNotification({ message: e.response.data.error || e.response.status, success: false })
    }
  }, [setBlogs, setNotification])

  useEffect(() => {
    const fetchData = async () => {
      await updateBlogs()
    }
    fetchData()
  }, [updateBlogs])

  return (
    <>
      <LoginHeader user={user} setUser={setUser}></LoginHeader>
      <Tabs defaultActiveKey='blogs' id='main-tabs' className='mb-3'>
        <Tab eventKey='blogs' title='Blogs'>
          <BlogView blogs={blogs} updateBlogs={updateBlogs} setNotification={setNotification}></BlogView>
        </Tab>
        <Tab eventKey='about' title='About'>
          <AboutPage setKey={null} ></AboutPage>
        </Tab>
        <Tab eventKey='stats' title='Stats'>
          <StatsPage blogs={blogs} user={user}></StatsPage>
        </Tab>
      </Tabs>
    </>
  )
}

export default MainContent