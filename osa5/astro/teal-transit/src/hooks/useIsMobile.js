import { useSyncExternalStore } from 'react'

// This triggers when window width is greater than height, i.e. portrait mode
const mediaQuery = typeof window !== 'undefined'
  ? window.matchMedia("(max-aspect-ratio: 1/1)")
  : undefined

const subscribe = (callback) => {
  if (mediaQuery) mediaQuery.onchange = (mq) => callback(mq.matches)
}

const getSnapshot = () => mediaQuery.matches

// Initial value on server and on client during hydration match -> no clash during hydration
const getServerSnapshot = () => false

export const useIsMobile = () => {  
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return isMobile
}