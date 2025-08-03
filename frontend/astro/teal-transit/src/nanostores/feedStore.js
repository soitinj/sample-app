import { atom } from 'nanostores'
import feedService from '../services/feed'

// Create the store
export const feedStore = atom((typeof window !== 'undefined' && window.SA_INITIAL_DATA_FEED) ? JSON.parse(window.SA_INITIAL_DATA_FEED) : [])

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
