import { useState, useEffect, useCallback } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import LoginHeader from './LoginHeader'
import StatsPage from './StatsPage'
import BlogView from './BlogView'
import AboutPage from './AboutPage'
import blogService from '../services/blogs'
import feedService from '../services/feed'

const MainContent = ({ user, setUser, setNotification }) => {

  const [blogs, setBlogs] = useState([])
  const [igFeed, setIgFeed] = useState({ postIds: [] })

  const updateBlogs = useCallback(async () => {
    try {
      const bs = await blogService.getAll()
      setBlogs(bs)
    } catch (e) {
      setNotification({ message: e.response.data.error || e.response.status, success: false })
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await updateBlogs()
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const ps = await feedService.getAll()
        setIgFeed(ps)
      } catch (e) {
        setNotification({ message: e.response.data.error || e.response.status, success: false })
      }
    }
    fetchFeed()
  }, [])

  return (
    <>
      <LoginHeader user={user} setUser={setUser}></LoginHeader>
      <Tabs
        defaultActiveKey='blogs'
        id='main-tabs'
        className='mb-3'
        onSelect={ async (k) => { if (k === 'stats') await updateBlogs() }}
        unmountOnExit={ true }
      >
        <Tab eventKey='blogs' title='Blogs'>
          <BlogView header='blogs' user={user} blogs={blogs} updateBlogs={updateBlogs} setNotification={setNotification} igFeed={igFeed}></BlogView>
        </Tab>
        <Tab eventKey='my-blogs' title='My Blogs'>
          <BlogView header='my blogs' user={user} blogs={[...blogs].filter(blog => blog.user.username === user.username)} updateBlogs={updateBlogs} setNotification={setNotification}></BlogView>
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