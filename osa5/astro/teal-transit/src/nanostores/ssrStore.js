import { atom } from 'nanostores'

// Track if initial data was server-side rendered
export const ssrStore = atom({
  blogs: false,
  user: false
})

// Helper to mark data as SSR initialized
export const markSSRInitialized = (dataType) => {
  const current = ssrStore.get()
  ssrStore.set({
    ...current,
    [dataType]: true
  })
}

// Helper to check if specific data was SSR initialized
export const isSSRInitialized = (dataType) => {
  return ssrStore.get()[dataType]
}