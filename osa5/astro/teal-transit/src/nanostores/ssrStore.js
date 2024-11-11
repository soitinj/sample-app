
// Create the store
export let ssrStore = { blogs: [], use: false }

// Action creators
export const setBlogs = (blogs) => {
  if (blogs.length > 0) ssrStore = { blogs: blogs, use: true }
}

export const disable = () => {
  ssrStore = {...ssrStore, use: false}
}

export default { setBlogs, disable }