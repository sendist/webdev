import Image from 'next/image';
import FormPost from './Form';
import { prisma } from '../prisma/client'

async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/getPosts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
  if (!res.ok) {
    console.log(res)
  }
  return await res.json()
}

async function getPosts2() {
  const posts = await prisma.post.findMany()
  return posts
}

async function deletePost(postId: number) {
  const res = await fetch(`${process.env.BASE_URL}/api/deletePost/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })
  if (!res.ok) {
    console.log(res)
  }
  return await res.json()
}

export default async function Home() {
  const posts: {id: number, title: string, content: string}[] = await getPosts2()
  // const posts = await getPosts()
  console.log(posts)
  return (
<main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className='grid grid-flow-row gap-2 mb-6'>
      {posts.map((post) => (
        <div className='flex grid-flow-col justify-between gap-2'>
          <div key={post.id} className="flex flex-col items-start justify-center border p-2 w-auto max-w-md break-normal flex-grow">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-lg">{post.content}</p>
          </div>
          <div className="flex border p-4 text-center">
            <button type="button" className="" >Delete</button>
          </div>
        </div>
      ))}
    </div>
    <FormPost />
</main>

  )
}

