declare const posts: KVNamespace
export async function handleRequest(request: Request): Promise<Response> {
  if (request.method === 'POST') {
    return addPost(request)
  } else if (request.method === 'GET') {
    return getPosts(request)
  }
  return new Response('Method not supported')
}

// API Endpoint 1: GET /posts
async function getPosts(request: Request): Promise<Response> {
  const postList: any = await posts.get('posts')
  if (postList === null) {
    return new Response('Value not found', { status: 404 })
  }
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  }
  return new Response(postList, { headers })
}

// API Endpoint 2: POST /posts
async function addPost(request: Request): Promise<Response> {
  const body: any = await request.text()
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  }
  try {
    const postList: any = await posts.get('posts')
    const postArray: JSON[] = JSON.parse(postList)
    const post = JSON.parse(body)
    postArray.push(post)
    const id: string = post.title
    // Update posts in kv by getting JSON[] and adding new post
    // then deleting old post value and adding updated kv pair
    await posts.delete('posts')
    await posts.put('posts', JSON.stringify(postArray))
    return new Response('success ', {
      headers,
      status: 200,
    })
  } catch (err: any) {
    return new Response(err, { headers, status: 500 })
  }
}
