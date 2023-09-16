"use client"

import React, {useState} from "react"
import { useRouter } from "next/navigation"

export default function Form() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter()

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();
    const data = await fetch(`/api/createPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title, content})
    })
    const res =  await data.json()
    router.refresh()
    if (!res.ok) {
      console.log(res)
    }
  }
  return (
    <form className="flex flex-col gap-2 w-1/2 px-12" onSubmit={submitPost}>
      <label htmlFor="title" className="font-bold text-lg">Title:</label>
      <input className="text-black" id="title" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      <label htmlFor="content" className="font-bold text-lg">Content:</label>
      <textarea className="text-black h-12" id="content" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
      <button type="submit" className="border-2 bg-green-800">Create New Post</button>
    </form>
  )
}

