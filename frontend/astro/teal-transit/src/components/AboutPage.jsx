import Header from './Header'
import { ListGroup, Image } from 'react-bootstrap'
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'

const AboutPage = ({ setKey }) => {
  return (
    <>
      <Header text='About'></Header>
      <div className='border rounded border-secondary'>

        <h3>Our Story</h3>
        <p>Sample App was launched in 2024 with one simple goal: to create a space where people can share, discover, and connect through the power of blogging. What began as a small idea has grown into a vibrant community of writers and readers from around the world.</p>

        <Image src='/landscape.jpg' rounded />

        <h3>Our Mission</h3>
        <p>Our mission is to empower voices. We believe everyone has a story to tell, and [Your Website Name] is the place where those stories can be shared and celebrated. Whether you&apos;re an experienced blogger or just getting started, we&apos;re here to amplify your voice.</p>

        <h3>Why Sample App?</h3>
        <ListGroup>
          <ListGroup.Item><strong>Community-Driven:</strong> Join a growing network of bloggers and readers who engage, share, and inspire.</ListGroup.Item>
          <ListGroup.Item><strong>User-Friendly:</strong> Easily share your posts and like the ones that resonate with you.</ListGroup.Item>
          <ListGroup.Item><strong>Discover New Content:</strong> Explore a wide range of topics and find content that speaks to you.</ListGroup.Item>
        </ListGroup>

        <h3>Join the Conversation</h3>
        <p>Ready to share your thoughts?&nbsp;
          {setKey ? (
            <a href="#" onClick={() => {setKey('register')}}>Create an account</a>
          ) : (
            'Create an account'
          )}
          , start blogging, and join the conversation. Whether you&apos;re here to write, read, or both, Sample App is the place for you.</p>

        <h3>Get in Touch</h3>
        <p>Have questions or feedback? We&apos;d love to hear from you.</p>
        <ListGroup>
          <ListGroup.Item><strong>Email: <IoIosMail size={30} /></strong><a href="mailto:your-email@sampleapp.com">your-email@sampleapp.com</a></ListGroup.Item>
          <ListGroup.Item><strong>Social Media Links: </strong>
            <a href="https://facebook.com"><FaFacebook size={30} />Facebook</a> |&nbsp;
            <a href="https://twitter.com"><FaTwitter size={30} />Twitter</a> |&nbsp;
            <a href="https://instagram.com"><FaInstagram size={30} />Instagram</a>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  )
}

export default AboutPage