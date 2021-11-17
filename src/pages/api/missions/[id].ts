/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query)
  res.json('xxxx')
}