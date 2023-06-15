import type { NextApiRequest, NextApiResponse } from 'next'
import { type User } from '../../../lib/users'
import * as users from '../../../lib/users'
import {revalidatePath} from "next/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User | string>
) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json(await users.list())
    case 'POST':
      const created = await users.create(req.body);
      revalidatePath('users');
      return res.status(201).json(created[0]);
    case 'PUT':
      const updated = await users.update(req.body)
      return res.status(updated.length > 0 ? 200 : 404).json(updated[0])
    default:
      return res.status(405).send('Method Not Allowed')
  }
}
