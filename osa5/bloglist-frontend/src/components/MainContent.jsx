import { useState, useEffect } from 'react'
import { Tabs, Tab, Button } from 'react-bootstrap'
import LoginHeader from './LoginHeader'
import StatsPage from './StatsPage'
import BlogView from './BlogView'
import AboutPage from './AboutPage'
import feedService from '../services/feed'
import { getBlogs } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const MainContent = ({ setNotification }) => {

  const [igFeed, setIgFeed] = useState({ postIds: [] })

  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

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

  const scrollToEnd = () => {
    document.body.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    })
  }

  return (
    <>
      <LoginHeader user={user}></LoginHeader>
      <Button onClick={scrollToEnd}>Scroll to bottom</Button>
      <Tabs
        defaultActiveKey='blogs'
        id='main-tabs'
        className='mb-3'
        unmountOnExit={ true }
      >
        <Tab eventKey='blogs' title='Blogs'>
          <BlogView header='blogs' user={user} byUser={false} setNotification={setNotification} igFeed={igFeed}></BlogView>
        </Tab>
        <Tab eventKey='my-blogs' title='My Blogs'>
          <BlogView header='my blogs' user={user} byUser={true} setNotification={setNotification}></BlogView>
        </Tab>
        <Tab eventKey='about' title='About'>
          <AboutPage setKey={null} ></AboutPage>
        </Tab>
        <Tab eventKey='stats' title='Stats'>
          <StatsPage user={user}></StatsPage>
        </Tab>
      </Tabs>
    </>
  )
}

export default MainContent