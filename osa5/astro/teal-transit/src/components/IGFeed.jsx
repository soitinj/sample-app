import { InstagramEmbed } from 'react-social-media-embed'

const IGFeed = ({ postIds }) => {
  return (
    <div>
      {[...postIds].map(postId =>
        <InstagramEmbed width={330} key={postId} url={`https://www.instagram.com/p/${postId}/`} />
      )}
    </div>
  )
}

export default IGFeed