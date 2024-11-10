import { useState, useEffect } from 'react'
import { Tabs, Tab, Button } from 'react-bootstrap'
import LoginHeader from './LoginHeader'
import StatsPage from './StatsPage'
import BlogView from './BlogView'
import AboutPage from './AboutPage'
import feedService from '../services/feed'
import { getBlogs } from '../nanostores/blogStore'

const MainContent = ({ setNotification }) => {

  const [igFeed, setIgFeed] = useState({ postIds: [] })

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    // Including browser-only document-call does not crash prerendering by Astro
    // Code block is executed only after rendering on the client
    document.getElementById('main-tabs').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })    
  })

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
      <LoginHeader></LoginHeader>
      <Button onClick={scrollToEnd}>Scroll to bottom</Button>
      <Tabs
        defaultActiveKey='blogs'
        id='main-tabs'
        className='mb-3'
        unmountOnExit={ true }
      >
        <Tab eventKey='blogs' title='Blogs'>
          <BlogView header='blogs' byUser={false} setNotification={setNotification} igFeed={igFeed}></BlogView>
        </Tab>
        <Tab eventKey='my-blogs' title='My Blogs'>
          <BlogView header='my blogs' byUser={true} setNotification={setNotification}></BlogView>
        </Tab>
        <Tab eventKey='about' title='About'>
          <AboutPage setKey={null} ></AboutPage>
        </Tab>
        <Tab eventKey='stats' title='Stats'>
          <StatsPage></StatsPage>
        </Tab>
      </Tabs>
    </>
  )
}

export default MainContent