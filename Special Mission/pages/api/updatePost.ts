import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'

type postProps = {
  id : number
  title: string
  content: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const post : postProps = req.body
    if(req.method === 'UPDATE') {
      try {
        const data = await prisma.post.update({
          where: {
            id: post.id
          },
          data: {
            title: post.title,
            content: post.content
          }
        })
        res.status(200).json(data)
      } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to update post' })
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to handle request' })
  }
}
