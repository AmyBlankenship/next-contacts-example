import type { NextApiRequest, NextApiResponse } from 'next'
import { type Address } from '../../../lib/addresses'
import * as addresses from '../../../lib/addresses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Address[] | Address | undefined | string>
) {
  const id = req.query.address_id![0];
  switch (req.method) {
    case 'GET':
      const addressList = await addresses.pick(id);
      return res.status(200).json(addressList[0]);
    case 'DELETE':
      const removed = await addresses.remove(id);
      return res.status(removed.length > 0 ? 204 : 404).end()
    default:
      return res.status(405).send('Method Not Allowed')
  }
}