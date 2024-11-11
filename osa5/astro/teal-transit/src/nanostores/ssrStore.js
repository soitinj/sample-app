import atom from 'nanostores'
// Create the store
export const ssrStore = atom({ blogs: [], use: false })

// Action creators
export const setBlogs = (blogs) => {
  if (blogs.length > 0) ssrStore.set({ blogs: blogs, use: true })
}

export const disable = () => {
  ssrStore.set({...ssrStore, use: false})
}

export default { setBlogs, disable }