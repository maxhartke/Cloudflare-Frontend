import { handleRequest } from './handler'

declare var posts: any
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
