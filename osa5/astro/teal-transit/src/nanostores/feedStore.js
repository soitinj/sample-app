import { atom } from 'nanostores'
import feedService from '../services/feed'

// Create the store
export const feedStore = atom((typeof window !== 'undefined' && window.FEED_INITIAL_DATA) ? JSON.parse(window.FEED_INITIAL_DATA) : [])

// Action creators
export const setFeed = (feed) => {
  feedStore.set(feed)
}

// Async actions
export const fetchFeed = async () => {
  const ps = await feedService.getAll()
  setFeed(ps)
}

export default { fetchFeed }
