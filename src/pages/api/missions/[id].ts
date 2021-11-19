/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req

  switch (method) {
    case 'GET':
      return res.json('getting a unique mission')
    case 'PUT':
      return res.json('updating...')
    case 'DELETE':
      return res.json('deleting...')
    default:
      return res.status(400).json('method is not allowed');
  }
}