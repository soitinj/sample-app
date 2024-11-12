// This component conflicts with SSR, if content is loaded on the server and then passed through to client with
// <script> tags for instance.
// This is due to react-social-media-embed creating IDs for components randomly,
// so prerendered HTML and client hydration clash due to different component ID attributes.
// https://github.com/justinmahar/react-social-media-embed/blob/master/src/components/embeds/InstagramEmbed.tsx
// line 65: const uuidRef = React.useRef(generateUUID()); // this is the problematic line
// If ref is generated in a predicatable fashion, hydration does not crash.
// Workaround for this project: const uuidRef = React.useRef(() => url) // use url as ref
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