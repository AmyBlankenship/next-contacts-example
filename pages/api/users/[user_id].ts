import type { NextApiRequest, NextApiResponse } from 'next'
import { type User } from '../../../lib/users'
import * as users from '../../../lib/users'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User | undefined | string>
) {
  const id = req.query.user_id![0];
  switch (req.method) {
    case 'GET':
      const userList = await users.pick(id);
      return res.status(200).json(userList[0]);
    case 'DELETE':
      const removed = await users.remove(id);
      return res.status(removed.length > 0 ? 204 : 404).end()
    default:
      return res.status(405).send('Method Not Allowed')
  }
}