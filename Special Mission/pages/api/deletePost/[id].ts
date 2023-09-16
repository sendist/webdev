import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma/client'
import { parse } from 'path'

type postProps = {
  id : number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const post : postProps = req.body
    const  id  = req.query.id
    if(req.method === 'DELETE') {
      try {
        const data = await prisma.post.delete({
          where: {
            id: parseInt(id as string)
          }
        })
        res.status(200).json(data)
      } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to delete post' })
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to handle request' })
  }
}
