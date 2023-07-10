import type { NextApiRequest, NextApiResponse } from 'next';
import { type Address } from '../../../lib/addresses';
import * as addresses from '../../../lib/addresses';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Address[] | Address | string>
) {
  switch (req.method) {
    case 'GET':
      let user_id = req.query.user_id;
      if (Array.isArray(user_id)) user_id = user_id[0];
      const addressList = await addresses.list(user_id ?? '');
      return res.status(200).json(addressList);
    case 'POST':
      return res.status(201).json(await addresses.create(req.body))
    case 'PUT':
      const updated = await addresses.update(req.body)
      return res.status(updated.length > 0 ? 200 : 404).json(updated[0]);
    case 'DELETE':
      const removed = await addresses.remove(req.body)
      return res.status(removed.length > 0 ? 204 : 404).end()
    default:
      return res.status(405).send('Method Not Allowed')
  }
}
